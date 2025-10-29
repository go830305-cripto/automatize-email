import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as ReTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const samplePie = [
  { name: "Abertos", value: 45 },
  { name: "Não Abertos", value: 40 },
  { name: "Cliques", value: 15 },
];
const pieColors = ["#004E7C", "#E5E7EB", "#FF914D"];

const sampleBar = [
  { name: "Seg", sent: 30 },
  { name: "Ter", sent: 45 },
  { name: "Qua", sent: 28 },
  { name: "Qui", sent: 60 },
  { name: "Sex", sent: 40 },
  { name: "Sáb", sent: 20 },
  { name: "Dom", sent: 10 },
];

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Olá! Posso ajudar com dúvidas sobre o site Automatize Email." },
  ]);
  const [input, setInput] = useState("");

  async function handleSend() {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const json = await res.json();
      const botMsg = { from: "bot", text: json.answer || "Ainda não tenho essa informação, mas você pode verificar na seção de ajuda." };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      setMessages((m) => [...m, { from: "bot", text: "Erro ao conectar com o serviço de chat." }]);
    }
  }

  return (
    <div style={{position:'fixed', right:24, bottom:24, zIndex:999}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
        {open && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{width:320,maxHeight:380,background:'#fff',borderRadius:10,overflow:'hidden',display:'flex',flexDirection:'column',boxShadow:'0 6px 20px rgba(2,6,23,0.12)'}}>
            <div style={{padding:12,borderBottom:'1px solid #e5e7eb',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <strong>Ajuda — Automatize Email</strong>
              <button onClick={() => setOpen(false)} style={{fontSize:13}}>Fechar</button>
            </div>
            <div style={{padding:12,overflow:'auto',flex:1}}>
              {messages.map((m,i)=>(
                <div key={i} style={{margin:'8px 0',textAlign: m.from==='bot' ? 'left' : 'right'}}>
                  <div style={{display:'inline-block',padding:8,borderRadius:8, background: m.from==='bot' ? '#f3f4f6' : '#e6f0ff'}}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div style={{padding:12,borderTop:'1px solid #e5e7eb'}}>
              <div style={{display:'flex',gap:8}}>
                <input value={input} onChange={(e)=>setInput(e.target.value)} placeholder="Pergunte algo sobre o site..." style={{flex:1,padding:8,borderRadius:8,border:'1px solid #e5e7eb'}} />
                <button onClick={handleSend} style={{padding:'8px 12px',borderRadius:8,background:'#004E7C',color:'#fff'}}>Enviar</button>
              </div>
            </div>
          </motion.div>
        )}
        <button onClick={()=>setOpen(!open)} title="Ajuda" style={{marginTop:8,width:56,height:56,borderRadius:'50%',background:'#004E7C',color:'#fff',border:'none',boxShadow:'0 6px 20px rgba(2,6,23,0.12)'}}>💬</button>
      </div>
    </div>
  )
}

export default function Home() {
  const [theme, setTheme] = useState("light");
  const [csvFileName, setCsvFileName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [schedule, setSchedule] = useState("");
  const [emailTo, setEmailTo] = useState("");

  function handleUpload(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setCsvFileName(f.name);
  }

  async function handleSendDemo() {
    if (!emailTo || !subject || !body) {
      alert("Por favor, preencha todos os campos e o e-mail de destino.");
      return;
    }
    try {
      const res = await fetch("/api/send-brevo", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ to: emailTo, subject, htmlContent: body })
      });
      const json = await res.json();
      if (res.ok) {
        alert("✅ E-mail enviado com sucesso! ID: " + (json.messageId || '—'));
      } else {
        alert("❌ Erro: " + (json.message || JSON.stringify(json)));
      }
    } catch (err) {
      console.error(err);
      alert("❌ Falha ao conectar com o servidor.");
    }
  }

  return (
    <div>
      <header className="card" style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:16,marginBottom:16}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:48,height:48,borderRadius:8,background:'#004E7C',color:'#fff',display:'flex',alignItems:'center',justifyContent:'center'}}>AE</div>
          <div>
            <div style={{fontWeight:700}}>Automatize Email</div>
            <div style={{fontSize:12,color:'#6b7280'}}>Automação de envios para empresas</div>
          </div>
        </div>
        <nav style={{display:'flex',gap:12,alignItems:'center'}}>
          <a>Recursos</a><a>Preços</a><a>Sobre</a>
          <button onClick={()=>setTheme(theme==='dark'?'light':'dark')} style={{padding:'6px 10px',borderRadius:8}}>Tema</button>
          <button className="button-accent">Comece Agora</button>
        </nav>
      </header>

      <main className="container">
        <section style={{display:'grid',gridTemplateColumns:'1fr',gap:16}}>
          <div style={{display:'flex',flexDirection:'column',gap:12}}>
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
              <h1 style={{fontSize:28,margin:0}}>Automatize seus e-mails e ganhe tempo</h1>
              <p style={{color:'#6b7280'}}>Envie campanhas personalizadas, agende envios e acompanhe resultados com um painel simples e poderoso.</p>
              <div style={{display:'flex',gap:8,marginTop:10}}>
                <button className="button">Testar Demo</button>
                <button style={{padding:'10px 14px',borderRadius:8}}>Ver Recursos</button>
              </div>
              <div style={{marginTop:8,fontSize:13,color:'#6b7280'}}>Integração com Brevo · Modo claro/escuro · Chatbot inteligente</div>
            </motion.div>
          </div>

          <div style={{marginTop:10}} className="card">
            <div style={{marginBottom:8,color:'#6b7280',fontSize:13}}>Upload de lista de contatos</div>
            <input type="file" accept=".csv,.xlsx" onChange={handleUpload} style={{marginBottom:8}} />
            {csvFileName && <div style={{marginBottom:8}}>Arquivo: {csvFileName}</div>}
            <input value={emailTo} onChange={(e)=>setEmailTo(e.target.value)} placeholder="E-mail de destino" className="input" style={{marginBottom:8}} />
            <input value={subject} onChange={(e)=>setSubject(e.target.value)} placeholder="Assunto do e-mail" className="input" style={{marginBottom:8}} />
            <textarea value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Conteúdo do e-mail (HTML permitido)" className="input" rows={6} style={{marginBottom:8}} />
            <input type="datetime-local" value={schedule} onChange={(e)=>setSchedule(e.target.value)} className="input" style={{marginBottom:8}} />
            <div style={{display:'flex',gap:8}}>
              <button onClick={handleSendDemo} className="button-accent">Enviar com Brevo</button>
              <button style={{padding:'10px 14px',borderRadius:8}}>Agendar</button>
            </div>
            <div style={{marginTop:8,fontSize:12,color:'#6b7280'}}>* Integração com Brevo configurada via /api/send-brevo</div>
          </div>

          <section style={{marginTop:20,display:'grid',gridTemplateColumns:'2fr 1fr',gap:16}}>
            <div className="card">
              <h3>Dashboard</h3>
              <div style={{height:220,marginTop:12}}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={sampleBar}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ReTooltip />
                    <Bar dataKey="sent" fill="#004E7C" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card">
              <h3>Resumo</h3>
              <div style={{height:220,marginTop:12}}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={samplePie} dataKey="value" innerRadius={40} outerRadius={70}>
                      {samplePie.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                      ))}
                    </Pie>
                    <ReTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section style={{marginTop:20}} className="card">
            <h3>Depoimentos</h3>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:12}}>
              <div style={{padding:12,borderRadius:8,border:'1px solid #e5e7eb'}}>"Economizamos horas por semana" — Empresa X</div>
              <div style={{padding:12,borderRadius:8,border:'1px solid #e5e7eb'}}>"Configuração simples e resultados" — Agência Y</div>
              <div style={{padding:12,borderRadius:8,border:'1px solid #e5e7eb'}}>"Relatórios fáceis de ler" — Time Z</div>
            </div>
          </section>

        </section>

        <div className="footer">© {new Date().getFullYear()} Automatize Email — Todos os direitos reservados</div>
      </main>

      <Chatbot />
    </div>
  );
}
