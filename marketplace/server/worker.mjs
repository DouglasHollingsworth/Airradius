import {WebStandardStreamableHTTPServerTransport} from '@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js';
import {SUPPORTED_PROTOCOL_VERSIONS} from '@modelcontextprotocol/sdk/types.js';
import {createToolServer,executePreset,ACTION_ENDPOINTS,SCENARIOS} from './tools.mjs';

const MAX_BODY=32768;
const headers={'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'};
const error=(status,message,extra={})=>Response.json({error:message},{status,headers:{...headers,...extra}});
function allowedOrigin(origin,url){return !origin||[url.origin,'https://chatgpt.com','https://chat.openai.com'].includes(origin);}
function cors(response,origin){if(!origin)return response;const h=new Headers(response.headers);h.set('Access-Control-Allow-Origin',origin);h.set('Vary','Origin');h.set('Access-Control-Expose-Headers','MCP-Protocol-Version');return new Response(response.body,{status:response.status,headers:h});}
export async function handleMcp(request){
 const url=new URL(request.url),origin=request.headers.get('origin');
 if(!allowedOrigin(origin,url))return error(403,'Origin is not allowed');
 const host=request.headers.get('host');if(host&&host.toLowerCase()!==url.host.toLowerCase())return error(403,'Host does not match the request authority');
 if(request.method==='OPTIONS')return cors(new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type, Accept, MCP-Protocol-Version','Access-Control-Max-Age':'600'}}),origin);
 if(request.method!=='POST')return cors(error(405,'This stateless MCP endpoint accepts POST only',{Allow:'POST, OPTIONS'}),origin);
 const version=request.headers.get('mcp-protocol-version');if(version&&!SUPPORTED_PROTOCOL_VERSIONS.includes(version))return cors(error(400,'Unsupported MCP protocol version'),origin);
 if(!/^application\/json(?:\s*;|$)/i.test(request.headers.get('content-type')??''))return cors(error(415,'Content-Type must be application/json'),origin);
 const length=request.headers.get('content-length');if(length&&(!/^\d+$/.test(length)||Number(length)>MAX_BODY))return cors(error(413,'MCP request body exceeds 32 KB'),origin);
 if(request.headers.get('mcp-session-id'))return cors(error(400,'Sessions are not supported by this stateless fictional service'),origin);
 const server=createToolServer(),transport=new WebStandardStreamableHTTPServerTransport({sessionIdGenerator:undefined,enableJsonResponse:true,maxRequestBodySize:MAX_BODY,keepAliveMs:0});
 try{await server.connect(transport);const response=await transport.handleRequest(request);const h=new Headers(response.headers);for(const [k,v]of Object.entries(headers))h.set(k,v);return cors(new Response(response.body,{status:response.status,headers:h}),origin);}
 catch{return cors(error(500,'The fictional MCP request could not complete'),origin);}
 finally{await server.close();}
}
export async function handleAction(request,endpoint){
 const url=new URL(request.url),origin=request.headers.get('origin');
 if(!allowedOrigin(origin,url))return error(403,'Origin is not allowed');
 const host=request.headers.get('host');if(host&&host.toLowerCase()!==url.host.toLowerCase())return error(403,'Host does not match the request authority');
 if(request.method==='OPTIONS')return cors(new Response(null,{status:204,headers:{...headers,'Access-Control-Allow-Methods':'GET, OPTIONS','Access-Control-Allow-Headers':'Accept','Access-Control-Max-Age':'600'}}),origin);
 if(request.method!=='GET')return cors(error(405,'Fictional training actions accept GET only',{Allow:'GET, OPTIONS'}),origin);
 const entries=[...url.searchParams];if(entries.length!==1||entries[0][0]!=='scenario'||!SCENARIOS.includes(entries[0][1]))return cors(error(400,'Exactly one scenario parameter is required: duplicate-and-delay or separated-observations'),origin);
 try{return cors(Response.json(await executePreset(endpoint.role,entries[0][1]),{headers}),origin);}catch{return cors(error(500,'The fictional training action could not complete'),origin);}
}
export default {async fetch(request,env){
 const url=new URL(request.url);if(url.pathname==='/mcp'||url.pathname==='/mcp/')return handleMcp(request);
 const endpoint=ACTION_ENDPOINTS.find(e=>e.path===url.pathname);if(endpoint)return handleAction(request,endpoint);
 if(url.pathname.startsWith('/training-api'))return error(404,'Not found');
 let path;try{path=decodeURIComponent(url.pathname);}catch{return error(400,'Invalid path');}
 if(path==='/.well-known/openai-apps-challenge')return ['GET','HEAD'].includes(request.method)&&env?.OPENAI_APPS_CHALLENGE?new Response(request.method==='HEAD'?null:env.OPENAI_APPS_CHALLENGE,{headers:{...headers,'Content-Type':'text/plain; charset=utf-8'}}):error(404,'Verification challenge is not configured');
 if(/(?:^|\/)\./.test(path)||/^\/(?:AGENTS|README|TAKEOVER)(?:\.|\/|$)/i.test(path))return error(404,'Not found');
 if(/^\/(?:ceo|pilot|growth)(?:\/|\.|$)/i.test(path)||/(?:^|\/)(?:private|api|docs|specs|marketplace|\.codex|downloads)(?:\/|\.|$)/i.test(path))return error(404,'Not found');
 if(!['GET','HEAD'].includes(request.method))return error(405,'Method not allowed');
 if(!env?.ASSETS)return error(503,'Public presentation assets are unavailable');
 const response=await env.ASSETS.fetch(request),h=new Headers(response.headers);
 h.set('X-Content-Type-Options','nosniff');h.set('Referrer-Policy','strict-origin-when-cross-origin');h.set('Permissions-Policy','camera=(), microphone=(), geolocation=()');h.set('Content-Security-Policy',"default-src 'self'; img-src 'self' data: blob:; style-src 'self'; script-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'");
 return new Response(response.body,{status:response.status,headers:h});
}};
