// api/ocr.js
import fetch from 'node-fetch';

export default async function handler(req, res){
if(req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
const { base64Image } = req.body;

try{
const response = await fetch('https://api.openai.com/v1/images/edits', { 
    method:'POST', 
    headers:{ 'Authorization':`Bearer ${process.env.OPENAI_API_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ image: base64Image })
});
const data = await response.json();
const text = data?.text || 'لم يتم استخراج نص.';
res.status(200).json({ text });
}catch(err){ res.status(500).json({ error: err.message }); }
}
