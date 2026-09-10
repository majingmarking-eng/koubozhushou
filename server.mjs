import { createReadStream, readFileSync } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const root = path.dirname(fileURLToPath(import.meta.url));
const envPath = process.env.ASR_ENV_PATH || '/Users/jingma/Documents/New project/flowenglish/backend/.env';
function loadEnv(){try{for(const line of readFileSync(envPath,'utf8').split(/\r?\n/)){const m=line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*["']?(.*?)["']?\s*$/);if(m&&!process.env[m[1]])process.env[m[1]]=m[2]}}catch(e){console.warn(`无法读取 ASR 配置：${envPath}`)}}
loadEnv();
const port=Number(process.env.PORT||4173), host=process.env.HOST||'0.0.0.0', apiUrl='https://openspeech.bytedance.com/api/v3/auc/bigmodel/recognize/flash';
function json(res,status,data){res.writeHead(status,{'Content-Type':'application/json; charset=utf-8','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'POST,OPTIONS','Access-Control-Allow-Headers':'Content-Type'});res.end(JSON.stringify(data))}
function body(req){return new Promise((resolve,reject)=>{const chunks=[];let size=0;req.on('data',c=>{size+=c.length;if(size>40*1024*1024){reject(new Error('录音文件不能超过 40MB'));req.destroy()}else chunks.push(c)});req.on('end',()=>resolve(Buffer.concat(chunks)));req.on('error',reject)})}
async function asr(req,res){try{const audio=await body(req);if(!process.env.VOLCENGINE_API_KEY)return json(res,500,{error:'ASR 配置缺少 VOLCENGINE_API_KEY'});const r=await fetch(apiUrl,{method:'POST',headers:{'Content-Type':'application/json','X-Api-Key':process.env.VOLCENGINE_API_KEY,'X-Api-Resource-Id':process.env.VOLCENGINE_RESOURCE_ID||'volc.bigasr.auc_turbo','X-Api-Request-Id':randomUUID(),'X-Api-Sequence':'-1'},body:JSON.stringify({user:{uid:'genzhuoshuo-local'},audio:{data:audio.toString('base64')},request:{model_name:'bigmodel',enable_punc:true,enable_itn:true,enable_word_timestamp:true}})});const data=await r.json().catch(()=>({}));if(!r.ok)return json(res,502,{error:data.message||`ASR 请求失败（${r.status}）`});json(res,200,data)}catch(e){json(res,502,{error:e.message})}}
async function staticFile(req,res){const p=path.resolve(root,new URL(req.url,'http://localhost').pathname.slice(1)||'index.html');if(!p.startsWith(root))return json(res,404,{error:'Not found'});try{const i=await stat(p);if(!i.isFile())throw 0;const type=p.endsWith('.html')?'text/html; charset=utf-8':p.endsWith('.css')?'text/css; charset=utf-8':'text/javascript; charset=utf-8';res.writeHead(200,{'Content-Type':type});createReadStream(p).pipe(res)}catch{json(res,404,{error:'Not found'})}}
createServer(async(req,res)=>{if(req.method==='OPTIONS')return json(res,204,{});if(req.method==='POST'&&new URL(req.url,'http://localhost').pathname==='/api/asr')return asr(req,res);if(req.method==='GET')return staticFile(req,res);json(res,405,{error:'Method not allowed'})}).listen(port,host,()=>console.log(`跟着说运行于 http://${host}:${port}，ASR 配置来自 ${envPath}`));
