import { useState, useEffect, useCallback, createContext, useContext, useMemo } from "react";

// ── i18n ───────────────────────────────────────────────────────────────────
const T = {
  en: {
    appTitle:"Chore Stars", kidTab:"Kid", adminTab:"Admin",
    starsAvailable:"Stars Available", completed:"completed", pending:"pending",
    tabChores:"🧹 Chores", tabRewards:"🎁 Rewards", tabHistory:"📜 History", tabGraph:"📈 Progress",
    pickChore:"Pick a chore to submit", optionalNote:"Optional note", submitBtn:"Submit 🚀", submitting:"Submitting…",
    dateLabel:"Date", futureDateError:"⚠️ Cannot select a future date.",
    choreSubmitted:"✅ Chore submitted! Waiting for approval.",
    duplicateChore:"⚠️ Already submitted this day — pick a different day.",
    confirmChore:"Confirm Chore", alreadyDone:"Done ✓", notAvailable:"Not available",
    adminAddChoreTitle:"➕ Add Chore Entry (auto-approved)",
    adminChoreSubmitted:(d)=>`✅ Chore added and approved for ${d}!`,
    filterAll:"All", filterChores:"Chores", filterRedemptions:"Redemptions", filterPenalties:"Penalties",
    availableRewards:"Available Rewards", noRewards:"No rewards defined yet.",
    needMore:(n)=>`Need ${n} more ⭐`, redeem:"Redeem",
    redeemReward:"Redeem Reward?", costs:"Costs", youHave:"you have",
    yesRedeem:"Yes, redeem!", cancel:"Cancel",
    redeemSuccess:(n,s)=>`🎁 "${n}" redeemed! −${s} ⭐`, notEnoughStars:"❌ Not enough stars!",
    fullHistory:"Full History", nothingYet:"Nothing yet!",
    adminPanel:"Admin Panel", lock:"Lock 🔒",
    stars:"Stars", pendingLabel:"Pending", choresLabel:"Chores", rewardsLabel:"Rewards",
    approvals:"Approvals", redemptions:"Redemptions",
    choreSubmissions:"📋 Chore Submissions", noSubmissions:"No submissions yet.",
    redemptionHistory:"🎁 Redemption History", noRedemptions:"No redemptions yet.",
    addNewChore:"➕ Add New Chore", choreName:"Chore name", choreEmoji:"Icon",
    choreDesc:"Description (optional)", choreWeekdays:"Available on",
    weekdays:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
    choreList:"📝 Chore List", resetStarBalance:"Reset Star Balance", confirmReset:"Reset all stars to 0?",
    saveChore:"Save", cancelEdit:"Cancel", editChore:"Edit",
    addNewReward:"➕ Add New Reward", rewardName:"Reward name", rewardEmoji:"Icon", rewardDesc:"Description (optional)",
    rewardList:"🎁 Reward List", add:"Add", delete:"Delete",
    adminPin:"Admin PIN", enterPin:"Enter PIN", unlock:"Unlock", wrongPin:"Wrong PIN.", defaultPin:"Default PIN: 1234",
    statusApproved:"approved", statusRejected:"rejected", statusPending:"pending", starsUnit:"stars",
    graphTitle:"⭐ Stars Evolution — Last 30 Days",
    graphEarned:"Earned", graphSpent:"Spent", graphBalance:"Balance", graphPenalties:"Penalties",
    graphNoData:"No activity in the last 30 days yet.",
    tabGoals:"🎯 Goals", goalName:"Goal name", goalType:"Period", goalStars:"Stars target",
    goalBonus:"Bonus ⭐", goalThreshold:"Alert at (%)", goalWeekly:"Weekly", goalMonthly:"Monthly",
    addGoal:"Add Goal", goalList:"Goal List", noGoals:"No goals defined yet.",
    goalProgress:(c,t)=>`${c} / ${t} ⭐`, goalBannerWeekly:"weekly", goalBannerMonthly:"monthly",
    goalBannerMsg:(name,pct,type,rem,bonus)=>`🎯 You're ${pct}% of the way to your ${type} goal "${name}"! Just ${rem} more ⭐ to earn ${bonus} bonus stars!`,
    goalCompleteMsg:(name,bonus)=>`🏆 You completed the goal "${name}" and earned ${bonus} bonus ⭐! Amazing!`,
    goalThresholdHint:"Show banner when this % of the goal is reached",
    tabPenalties:"⚠️ Penalties", penaltyName:"Penalty name", penaltyStars:"Stars to deduct",
    addNewPenalty:"➕ Add New Penalty", penaltyList:"📋 Penalty List", noPenalties:"No penalties defined yet.",
    applyPenalty:"Apply Penalty", penaltyPickReason:"— Pick a penalty —",
    penaltyApplied:(n,s)=>`⚠️ Penalty "${n}" applied. −${s} ⭐`,
    penaltyHistory:"⚠️ Penalty History", noPenaltyHistory:"No penalties applied yet.",
    penaltyNote:"Optional reason",
    confirmPenalty:(n,s)=>`Apply penalty "${n}" and deduct ${s} ⭐?`,
    adminApplyPenaltyTitle:"⚠️ Apply Penalty",
    continueAnyway:"Continue anyway",
    duplicateDay:"This task already exists for this day",
    notValidDay: "Not a valid day for this task",
    monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],
    kidLoginPrompt:"Enter your PIN to continue",
    kidPinWrong:"Wrong PIN, try again",
    kidLogout:"Log out",
    setKidPin:"Kid PIN",
    kidPinLabel:"Set a 4-digit PIN for kid access (current PIN is hidden)",
    kidPinSaved:"PIN saved!",
    saveKidPin:"Save PIN",
    tabSettings:"⚙️ Settings",
    chooseProfile:"Who are you?",
    kidProfile:"Kid",
    adminProfile:"Admin",
    backBtn:"Back",
    changePinTitle:"Change PIN",
    enterNewPin:"Enter new PIN",
    confirmNewPin:"Confirm new PIN",
    pinMismatch:"PINs don't match, try again",
    pinChanged:"PIN changed!",
    lockedOut:(t)=>`Too many failed attempts. Try again in ${t}.`,
    attemptsLeft:(n)=>`${n} attempt${n===1?"":"s"} remaining before lockout.`,
    kidProfileTitle:"My Profile", kidNameLabel:"Your name", kidEmojiLabel:"Profile emoji", kidProfileSaved:"Profile saved!",
  },
  pt: {
    appTitle:"Estrelas das Tarefas", kidTab:"Criança", adminTab:"Admin",
    starsAvailable:"Estrelas Disponíveis", completed:"concluídas", pending:"pendentes",
    tabChores:"🧹 Tarefas", tabRewards:"🎁 Recompensas", tabHistory:"📜 Histórico", tabGraph:"📈 Progresso",
    pickChore:"Escolhe uma tarefa para submeter", optionalNote:"Nota opcional", submitBtn:"Submeter 🚀", submitting:"A submeter…",
    dateLabel:"Data", futureDateError:"⚠️ Não podes selecionar uma data futura.",
    choreSubmitted:"✅ Tarefa submetida! À espera de aprovação.",
    duplicateChore:"⚠️ Já submetida neste dia — escolhe outro dia.",
    confirmChore:"Confirmar Tarefa", alreadyDone:"Feita ✓", notAvailable:"Não disponível",
    adminAddChoreTitle:"➕ Adicionar Entrada de Tarefa (aprovação automática)",
    adminChoreSubmitted:(d)=>`✅ Tarefa adicionada e aprovada para ${d}!`,
    filterAll:"Todos", filterChores:"Tarefas", filterRedemptions:"Resgates", filterPenalties:"Penalizações",
    availableRewards:"Recompensas Disponíveis", noRewards:"Ainda não há recompensas definidas.",
    needMore:(n)=>`Precisas de mais ${n} ⭐`, redeem:"Resgatar",
    redeemReward:"Resgatar Recompensa?", costs:"Custa", youHave:"tens",
    yesRedeem:"Sim, resgatar!", cancel:"Cancelar",
    redeemSuccess:(n,s)=>`🎁 "${n}" resgatada! −${s} ⭐`, notEnoughStars:"❌ Estrelas insuficientes!",
    fullHistory:"Histórico Completo", nothingYet:"Ainda nada!",
    adminPanel:"Painel de Admin", lock:"Bloquear 🔒",
    stars:"Estrelas", pendingLabel:"Pendentes", choresLabel:"Tarefas", rewardsLabel:"Recompensas",
    approvals:"Aprovações", redemptions:"Resgates",
    choreSubmissions:"📋 Submissões de Tarefas", noSubmissions:"Ainda não há submissões.",
    redemptionHistory:"🎁 Histórico de Resgates", noRedemptions:"Ainda não há resgates.",
    addNewChore:"➕ Adicionar Nova Tarefa", choreName:"Nome da tarefa", choreEmoji:"Ícone",
    choreDesc:"Descrição (opcional)", choreWeekdays:"Disponível em",
    weekdays:["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"],
    choreList:"📝 Lista de Tarefas", resetStarBalance:"Repor Estrelas", confirmReset:"Repor todas as estrelas para 0?",
    saveChore:"Guardar", cancelEdit:"Cancelar", editChore:"Editar",
    addNewReward:"➕ Adicionar Nova Recompensa", rewardName:"Nome da recompensa", rewardEmoji:"Ícone", rewardDesc:"Descrição (opcional)",
    rewardList:"🎁 Lista de Recompensas", add:"Adicionar", delete:"Eliminar",
    adminPin:"PIN de Admin", enterPin:"Introduz o PIN", unlock:"Desbloquear", wrongPin:"PIN incorreto.", defaultPin:"PIN padrão: 1234",
    statusApproved:"aprovada", statusRejected:"rejeitada", statusPending:"pendente", starsUnit:"estrelas",
    graphTitle:"⭐ Evolução de Estrelas — Últimos 30 Dias",
    graphEarned:"Ganhas", graphSpent:"Gastas", graphBalance:"Saldo", graphPenalties:"Penalizações",
    graphNoData:"Ainda sem atividade nos últimos 30 dias.",
    tabGoals:"🎯 Objetivos", goalName:"Nome do objetivo", goalType:"Período", goalStars:"Meta de estrelas",
    goalBonus:"Bónus ⭐", goalThreshold:"Alertar a (%)", goalWeekly:"Semanal", goalMonthly:"Mensal",
    addGoal:"Adicionar Objetivo", goalList:"Lista de Objetivos", noGoals:"Ainda não há objetivos definidos.",
    goalProgress:(c,tgt)=>`${c} / ${tgt} ⭐`, goalBannerWeekly:"semanal", goalBannerMonthly:"mensal",
    goalBannerMsg:(name,pct,type,rem,bonus)=>`🎯 Estás a ${pct}% do teu objetivo ${type} "${name}"! Só mais ${rem} ⭐ para ganhares ${bonus} estrelas bónus!`,
    goalCompleteMsg:(name,bonus)=>`🏆 Completaste o objetivo "${name}" e ganhaste ${bonus} ⭐ bónus! Fantástico!`,
    goalThresholdHint:"Mostrar aviso quando esta % da meta for atingida",
    tabPenalties:"⚠️ Penalizações", penaltyName:"Nome da penalização", penaltyStars:"Estrelas a deduzir",
    addNewPenalty:"➕ Adicionar Nova Penalização", penaltyList:"📋 Lista de Penalizações", noPenalties:"Ainda não há penalizações definidas.",
    applyPenalty:"Aplicar Penalização", penaltyPickReason:"— Escolhe uma penalização —",
    penaltyApplied:(n,s)=>`⚠️ Penalização "${n}" aplicada. −${s} ⭐`,
    penaltyHistory:"⚠️ Histórico de Penalizações", noPenaltyHistory:"Sem penalizações aplicadas.",
    penaltyNote:"Motivo opcional",
    confirmPenalty:(n,s)=>`Aplicar penalização "${n}" e deduzir ${s} ⭐?`,
    adminApplyPenaltyTitle:"⚠️ Aplicar Penalização",
    continueAnyway:"Continuar assim mesmo",
    duplicateDay:"Esta tarefa já existe para este dia",
    notValidDay: "Dia inválido para esta tarefa",
    monthNames:["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"],
    kidLoginPrompt:"Introduz o teu PIN para continuar",
    kidPinWrong:"PIN errado, tenta de novo",
    kidLogout:"Sair",
    setKidPin:"PIN da Criança",
    kidPinLabel:"Define um PIN de 4 dígitos para o acesso da criança (o PIN atual está oculto)",
    kidPinSaved:"PIN guardado!",
    saveKidPin:"Guardar PIN",
    tabSettings:"⚙️ Definições",
    chooseProfile:"Quem és tu?",
    kidProfile:"Criança",
    adminProfile:"Admin",
    backBtn:"Voltar",
    changePinTitle:"Alterar PIN",
    enterNewPin:"Introduz o novo PIN",
    confirmNewPin:"Confirma o novo PIN",
    pinMismatch:"Os PINs não coincidem, tenta de novo",
    pinChanged:"PIN alterado!",
    lockedOut:(t)=>`Demasiadas tentativas falhadas. Tenta novamente em ${t}.`,
    attemptsLeft:(n)=>`${n} tentativa${n===1?"":"s"} restante${n===1?"":"s"} antes do bloqueio.`,
    kidProfileTitle:"O Meu Perfil", kidNameLabel:"O teu nome", kidEmojiLabel:"Emoji de perfil", kidProfileSaved:"Perfil guardado!",
  },
};

const LangCtx = createContext("en");
const useLang = () => T[useContext(LangCtx)];

// ── Storage ────────────────────────────────────────────────────────────────
const SK = "chore-stars-v2";
const DEF = {
  chores:[
    {id:1,name:{en:"Make bed",pt:"Fazer a cama"},emoji:"🛏️",desc:{en:"Straighten sheets and arrange pillows",pt:"Esticar os lençóis e arranjar as almofadas"},stars:2,weekdays:[0,1,2,3,4,5,6]},
    {id:2,name:{en:"Do homework",pt:"Fazer os trabalhos de casa"},emoji:"📚",desc:{en:"Complete all school assignments",pt:"Completar todos os trabalhos da escola"},stars:5,weekdays:[1,2,3,4,5]},
    {id:3,name:{en:"Wash dishes",pt:"Lavar a loiça"},emoji:"🍽️",desc:{en:"Wash and dry all dishes after meals",pt:"Lavar e secar a loiça depois das refeições"},stars:3,weekdays:[0,1,2,3,4,5,6]},
    {id:4,name:{en:"Tidy room",pt:"Arrumar o quarto"},emoji:"🧹",desc:{en:"Clean and organise your bedroom",pt:"Limpar e organizar o quarto"},stars:4,weekdays:[0,6]},
  ],
  rewards:[
    {id:1,name:{en:"Extra screen time (30 min)",pt:"Tempo de ecrã extra (30 min)"},emoji:"📱",desc:{en:"30 minutes of extra tablet or TV time",pt:"30 minutos extra de tablet ou TV"},stars:5},
    {id:2,name:{en:"Choose dinner",pt:"Escolher o jantar"},emoji:"🍕",desc:{en:"Pick whatever you want for dinner tonight",pt:"Escolhe o que quiseres para o jantar"},stars:8},
    {id:3,name:{en:"Stay up late",pt:"Ficar acordado mais tarde"},emoji:"🌙",desc:{en:"Stay up 30 minutes past bedtime",pt:"Ficar acordado 30 minutos depois da hora"},stars:10},
    {id:4,name:{en:"Trip to the park",pt:"Ida ao parque"},emoji:"🌳",desc:{en:"A fun trip to your favourite park",pt:"Uma ida divertida ao teu parque favorito"},stars:15},
  ],
  penalties:[
    {id:1,name:{en:"Bad behaviour",pt:"Mau comportamento"},stars:2},
    {id:2,name:{en:"Not listening",pt:"Não ouvir"},stars:3},
    {id:3,name:{en:"Lying",pt:"Mentir"},stars:5},
  ],
  goals:[
    {id:1,name:{en:"Weekly Champion",pt:"Campeão Semanal"},type:"weekly",stars:15,bonus:5,threshold:70,claims:[]},
    {id:2,name:{en:"Monthly Star",pt:"Estrela do Mês"},type:"monthly",stars:50,bonus:20,threshold:60,claims:[]},
  ],
  submissions:[],redemptions:[],penaltyLog:[],totalStars:0,kidPin:"0000",kidName:"",kidEmoji:"👧🏽",
};

function loadData() {
  try {
    const s = localStorage.getItem(SK);
    const saved = s ? JSON.parse(s) : {};
    const m = {...DEF,...saved,goals:saved.goals||DEF.goals,penalties:saved.penalties||DEF.penalties,penaltyLog:saved.penaltyLog||[]};
    m.chores = m.chores.map(c=>({emoji:"🧹",weekdays:[0,1,2,3,4,5,6],desc:"",...c}));
    m.rewards = m.rewards.map(r=>({emoji:"🎁",desc:"",...r}));
    return m;
  } catch { return DEF; }
}
function saveData(d) { localStorage.setItem(SK, JSON.stringify(d)); }

// ── Lockout (brute-force protection) ───────────────────────────────────────
const LOCK_SK   = "chore-stars-lockout";
const LOCK_MAX  = 5;                     // fails before first lockout
const LOCK_MINS = [1, 5, 30, 60];        // escalating lockout durations (minutes)

function loadLockout() { try { return JSON.parse(localStorage.getItem(LOCK_SK)||"{}"); } catch { return {}; } }
function saveLockout(s) { localStorage.setItem(LOCK_SK, JSON.stringify(s)); }

function recordLoginFail() {
  const s = loadLockout();
  const count = (s.count||0) + 1;
  let lockedUntil = s.lockedUntil||null;
  if (count % LOCK_MAX === 0) {
    const tier = Math.min(count/LOCK_MAX - 1, LOCK_MINS.length-1);
    lockedUntil = Date.now() + LOCK_MINS[tier]*60*1000;
  }
  const next = {count, lockedUntil};
  saveLockout(next);
  return next;
}
function recordLoginSuccess() { localStorage.removeItem(LOCK_SK); }
function isLockedOut() { const s=loadLockout(); return s.lockedUntil&&Date.now()<s.lockedUntil; }

// ── API ────────────────────────────────────────────────────────────────────
function makeApi(data, setData) {
  const commit = next => { saveData(next); setData(next); return next; };
  return {
    addChore:    f  => { const c={id:Date.now(),emoji:"🧹",weekdays:[0,1,2,3,4,5,6],desc:"",...f}; commit({...data,chores:[...data.chores,c]}); return Promise.resolve(c); },
    updateChore: (id,f) => { commit({...data,chores:data.chores.map(c=>c.id===id?{...c,...f}:c)}); return Promise.resolve(); },
    deleteChore: id => { commit({...data,chores:data.chores.filter(c=>c.id!==id)}); return Promise.resolve(); },
    addReward:   f  => { const r={id:Date.now(),emoji:"🎁",desc:"",...f}; commit({...data,rewards:[...data.rewards,r]}); return Promise.resolve(r); },
    updateReward:(id,f) => { commit({...data,rewards:data.rewards.map(r=>r.id===id?{...r,...f}:r)}); return Promise.resolve(); },
    deleteReward:id => { commit({...data,rewards:data.rewards.filter(r=>r.id!==id)}); return Promise.resolve(); },
    addPenalty:  f  => { const p={id:Date.now(),...f}; commit({...data,penalties:[...data.penalties,p]}); return Promise.resolve(p); },
    updatePenalty:(id,f) => { commit({...data,penalties:data.penalties.map(p=>p.id===id?{...p,...f}:p)}); return Promise.resolve(); },
    deletePenalty:id => { commit({...data,penalties:data.penalties.filter(p=>p.id!==id)}); return Promise.resolve(); },
    applyPenalty:({penalty_id,penalty_name,stars,note,date}) => {
      const applied_at = date ? new Date(date+"T12:00:00").toISOString() : new Date().toISOString();
      const entry = {id:Date.now(),penalty_id,penalty_name,stars,note:note||null,applied_at};
      commit({...data,penaltyLog:[entry,...data.penaltyLog],totalStars:Math.max(0,data.totalStars-stars)});
      return Promise.resolve(entry);
    },
    reorderChores:(fromIdx,toIdx) => { const arr=[...data.chores];const [item]=arr.splice(fromIdx,1);arr.splice(toIdx,0,item);commit({...data,chores:arr});return Promise.resolve(); },
    reorderRewards:(fromIdx,toIdx) => { const arr=[...data.rewards];const [item]=arr.splice(fromIdx,1);arr.splice(toIdx,0,item);commit({...data,rewards:arr});return Promise.resolve(); },
    addGoal:    f  => { const g={...f,id:Date.now(),claims:[]}; commit({...data,goals:[...data.goals,g]}); return Promise.resolve(g); },
    deleteGoal: id => { commit({...data,goals:data.goals.filter(g=>g.id!==id)}); return Promise.resolve(); },
    claimGoalBonus:(goalId,periodKey) => {
      const goal = data.goals.find(g=>g.id===goalId);
      if(!goal||goal.claims.includes(periodKey)) return Promise.reject(new Error("already claimed"));
      const goals = data.goals.map(g=>g.id===goalId?{...g,claims:[...g.claims,periodKey]}:g);
      commit({...data,goals,totalStars:data.totalStars+goal.bonus});
      return Promise.resolve(goal.bonus);
    },
    submitChore:({chore_id,chore_name,stars,note,date,autoApprove,force}) => {
      const isoDay = date||todayStr();
      if(!force && data.submissions.some(s=>s.chore_id===chore_id&&s.submitted_at.slice(0,10)===isoDay&&s.status!=="rejected"))
        return Promise.reject(new Error("duplicate"));
      const submitted_at = date ? new Date(date+"T12:00:00").toISOString() : new Date().toISOString();
      const status = autoApprove?"approved":"pending";
      const sub = {id:Date.now(),chore_id,chore_name,stars,note:note||null,status,submitted_at};
      commit({...data,submissions:[sub,...data.submissions],totalStars:autoApprove?data.totalStars+stars:data.totalStars});
      return Promise.resolve(sub);
    },
    approveSubmission:(id,status) => {
      let total = data.totalStars;
      const subs = data.submissions.map(s=>{
        if(s.id!==id) return s;
        if(status==="approved"&&s.status!=="approved") total+=s.stars;
        if(status==="rejected"&&s.status==="approved") total-=s.stars;
        return {...s,status};
      });
      commit({...data,submissions:subs,totalStars:total}); return Promise.resolve();
    },
    redeemReward:({reward_id,reward_name,stars}) => {
      if(data.totalStars<stars) return Promise.reject(new Error("not enough"));
      const r={id:Date.now(),reward_id,reward_name,stars,redeemed_at:new Date().toISOString()};
      commit({...data,redemptions:[r,...data.redemptions],totalStars:data.totalStars-stars}); return Promise.resolve(r);
    },
    resetStars:() => { commit({...data,totalStars:0}); return Promise.resolve(); },
    verifyPin:  pin => Promise.resolve(pin==="1234"),
    verifyKidPin: pin => Promise.resolve(pin===(data.kidPin||"0000")),
    setKidPin: pin => { commit({...data,kidPin:pin}); return Promise.resolve(); },
    setKidProfile: ({name,emoji}) => { commit({...data,kidName:name,kidEmoji:emoji}); return Promise.resolve(); },
  };
}

// ── Goal helpers ───────────────────────────────────────────────────────────
function periodKey(type) {
  const n=new Date();
  if(type==="weekly"){const s=new Date(n);s.setDate(n.getDate()-n.getDay());return `w-${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`;}
  return `m-${n.getFullYear()}-${n.getMonth()}`;
}
function periodStart(type) {
  const n=new Date();
  if(type==="weekly"){const d=new Date(n);d.setDate(n.getDate()-n.getDay());d.setHours(0,0,0,0);return d;}
  return new Date(n.getFullYear(),n.getMonth(),1);
}
function earnedInPeriod(subs,type) {
  const s=periodStart(type);
  return subs.filter(s2=>s2.status==="approved"&&new Date(s2.submitted_at)>=s).reduce((a,s2)=>a+s2.stars,0);
}
function evalGoals(goals,subs) {
  return goals.map(g=>{
    const pk=periodKey(g.type), earned=earnedInPeriod(subs,g.type);
    const pct=Math.min(100,Math.round((earned/g.stars)*100));
    const claimed=g.claims.includes(pk), complete=pct>=100;
    return {...g,earned,pct,claimed,complete,alerting:!claimed&&!complete&&pct>=g.threshold,remaining:Math.max(0,g.stars-earned),pk};
  });
}

// ── Pure helpers ───────────────────────────────────────────────────────────
const rn = (name,lang) => { if(!name)return""; if(typeof name==="string")return name; return name[lang]||name.en||Object.values(name)[0]||""; };
const todayStr = () => new Date().toISOString().split("T")[0];
const isoWeekday = iso => new Date(iso+"T12:00:00").getDay();
const fmtDt = iso => { const d=new Date(iso); return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()} ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`; };
const fmtDo = ymd => { const [y,m,d]=ymd.split("-"); return `${d}/${m}/${y}`; };
const fmtGL = d => `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}`;
function parseDMY(str) {
  const m=str.match(/^(\d{2})\/(\d{2})\/(\d{4})$/); if(!m)return null;
  const d=new Date(`${m[3]}-${m[2]}-${m[1]}`); return isNaN(d)?null:`${m[3]}-${m[2]}-${m[1]}`;
}

// ── Shared styles ──────────────────────────────────────────────────────────
const card = {background:"#fff",borderRadius:16,boxShadow:"0 2px 12px rgba(0,0,0,0.08)",padding:"clamp(14px,4vw,24px)",marginBottom:16};
const btn  = (bg="#6366f1",col="#fff") => ({background:bg,color:col,border:"none",borderRadius:10,padding:"8px clamp(10px,3vw,18px)",fontWeight:600,cursor:"pointer",fontSize:"clamp(12px,3vw,14px)",whiteSpace:"nowrap"});
const bdg  = bg => ({background:bg,color:"#fff",borderRadius:20,padding:"2px 10px",fontSize:12,fontWeight:700,whiteSpace:"nowrap"});
const inp  = {border:"1.5px solid #e2e8f0",borderRadius:10,padding:"8px 12px",fontSize:"clamp(13px,3vw,14px)",outline:"none",width:"100%",boxSizing:"border-box"};
const tab  = a => ({padding:"7px clamp(8px,2.5vw,14px)",borderRadius:10,border:"none",cursor:"pointer",fontWeight:600,fontSize:"clamp(11px,2.5vw,13px)",background:a?"#6366f1":"#f1f5f9",color:a?"#fff":"#374151",whiteSpace:"nowrap"});
const sc   = s => s==="approved"?"#10b981":s==="rejected"?"#ef4444":"#f59e0b";
const StarSvg = ({filled,size=20}) => (<svg width={size} height={size} viewBox="0 0 24 24" fill={filled?"#f59e0b":"none"} stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const StarRow = ({count}) => (<span style={{display:"inline-flex",gap:2,alignItems:"center"}}>{Array.from({length:Math.min(count,10)}).map((_,i)=><StarSvg key={i} filled size={16}/>)}{count>10&&<span style={{fontSize:12,color:"#f59e0b",fontWeight:700}}>+{count-10}</span>}</span>);

// ── DateInput ──────────────────────────────────────────────────────────────
function DateInput({value,onChange,max,style}) {
  const [raw,setRaw] = useState(value?fmtDo(value):"");
  useEffect(()=>{setRaw(value?fmtDo(value):"");},[value]);
  const h = e => {
    let v=e.target.value.replace(/[^\d]/g,"");
    if(v.length>2) v=v.slice(0,2)+"/"+v.slice(2);
    if(v.length>5) v=v.slice(0,5)+"/"+v.slice(5);
    if(v.length>10) v=v.slice(0,10);
    setRaw(v);
    if(v.length===10){const iso=parseDMY(v);if(iso&&(!max||iso<=max))onChange(iso);}
  };
  return <input type="text" inputMode="numeric" placeholder="DD/MM/YYYY" value={raw} onChange={h} maxLength={10} style={style}/>;
}

// ── MiniCalendar ───────────────────────────────────────────────────────────
function MiniCalendar({value,onChange,max}) {
  const t = useLang();
  const maxD = max||todayStr();
  const init = value ? new Date(value+"T12:00:00") : new Date();
  const [vy,setVy] = useState(init.getFullYear());
  const [vm,setVm] = useState(init.getMonth());
  useEffect(()=>{if(value){const d=new Date(value+"T12:00:00");setVy(d.getFullYear());setVm(d.getMonth());}},[value]);
  const firstDay = new Date(vy,vm,1).getDay();
  const dim = new Date(vy,vm+1,0).getDate();
  const cells = [...Array(firstDay).fill(null), ...Array.from({length:dim},(_,i)=>i+1)];
  const goM = delta => { let m=vm+delta,y=vy; if(m<0){m=11;y--;} if(m>11){m=0;y++;} setVm(m);setVy(y); };
  const iso = d => `${vy}-${String(vm+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
  const canNext = () => new Date(vy,vm+1,1) <= new Date(maxD+"T12:00:00");
  return (
    <div style={{background:"#fff",borderRadius:14,border:"1.5px solid #e2e8f0",padding:"12px 14px",userSelect:"none"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10}}>
        <button onClick={()=>goM(-1)} style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:"2px 8px",borderRadius:8,color:"#6366f1",lineHeight:1}}>‹</button>
        <span style={{fontWeight:700,fontSize:14,color:"#374151"}}>{t.monthNames[vm]} {vy}</span>
        <button onClick={()=>goM(1)} disabled={!canNext()} style={{background:"none",border:"none",cursor:canNext()?"pointer":"default",fontSize:18,padding:"2px 8px",borderRadius:8,color:canNext()?"#6366f1":"#d1d5db",lineHeight:1}}>›</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2,marginBottom:4}}>
        {t.weekdays.map(d=><div key={d} style={{textAlign:"center",fontSize:11,fontWeight:600,color:"#9ca3af"}}>{d.slice(0,2)}</div>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:2}}>
        {cells.map((d,i)=>{
          const sel=d&&iso(d)===value, dis=d&&iso(d)>maxD, tod=d&&iso(d)===todayStr();
          return (
            <div key={i} onClick={()=>d&&!dis&&onChange(iso(d))} style={{textAlign:"center",padding:"6px 2px",borderRadius:8,fontSize:13,fontWeight:sel||tod?700:400,cursor:d&&!dis?"pointer":"default",background:sel?"#6366f1":tod?"#eef2ff":"transparent",color:sel?"#fff":dis?"#d1d5db":tod?"#6366f1":"#374151",border:tod&&!sel?"1.5px solid #6366f1":"1.5px solid transparent"}}>
              {d||""}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── WeekdayPicker ──────────────────────────────────────────────────────────
function WdPicker({value,onChange,t}) {
  const toggle = d => { const w=value.includes(d)?value.filter(x=>x!==d):[...value,d].sort(); onChange(w); };
  return (
    <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
      {t.weekdays.map((label,day)=>{const a=value.includes(day); return (
        <button key={day} type="button" onClick={()=>toggle(day)} style={{padding:"5px 10px",borderRadius:20,border:`2px solid ${a?"#6366f1":"#e2e8f0"}`,background:a?"#6366f1":"#fff",color:a?"#fff":"#6b7280",fontWeight:600,fontSize:12,cursor:"pointer"}}>{label}</button>
      );})}
    </div>
  );
}

// ── ItemForm (chore or reward) ─────────────────────────────────────────────
function ItemForm({initial,isReward,onSave,onCancel,t}) {
  const lang = useContext(LangCtx);
  const [f,setF] = useState({name:rn(initial.name,lang)||"",emoji:initial.emoji||(isReward?"🎁":"🧹"),desc:rn(initial.desc,lang)||"",stars:initial.stars||1,weekdays:initial.weekdays||[0,1,2,3,4,5,6]});
  const s = (k,v) => setF(p=>({...p,[k]:v}));
  return (
    <div>
      <div style={{display:"flex",gap:8,marginBottom:10}}>
        <input placeholder={isReward?t.rewardEmoji:t.choreEmoji} value={f.emoji} onChange={e=>s("emoji",e.target.value)} style={{...inp,width:56,textAlign:"center",fontSize:22,padding:"6px 4px",flexShrink:0}}/>
        <input placeholder={isReward?t.rewardName:t.choreName} value={f.name} onChange={e=>s("name",e.target.value)} style={{...inp,flex:1}}/>
        <input type="number" min={1} max={isReward?200:50} value={f.stars} onChange={e=>s("stars",parseInt(e.target.value)||1)} style={{...inp,width:60,flexShrink:0}}/>
      </div>
      <input placeholder={isReward?t.rewardDesc:t.choreDesc} value={f.desc} onChange={e=>s("desc",e.target.value)} style={{...inp,marginBottom:10}}/>
      {!isReward&&<div style={{marginBottom:12}}><label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>{t.choreWeekdays}</label><WdPicker value={f.weekdays} onChange={v=>s("weekdays",v)} t={t}/></div>}
      <div style={{display:"flex",gap:8}}>
        <button style={btn(isReward?"#ec4899":"#6366f1")} onClick={()=>{if(!f.name.trim())return;onSave(f);}}>{initial.id?t.saveChore:t.add}</button>
        <button style={btn("#9ca3af")} onClick={onCancel}>{t.cancelEdit}</button>
      </div>
    </div>
  );
}

// ── Graph ──────────────────────────────────────────────────────────────────
function buildGraph(subs,reds,plog) {
  const today=new Date(); today.setHours(23,59,59,999);
  const days=Array.from({length:30},(_,i)=>{const d=new Date(today);d.setDate(d.getDate()-(29-i));return{date:d,label:fmtGL(d),earned:0,spent:0,penalties:0};});
  const start=new Date(days[0].date); start.setHours(0,0,0,0);
  const slot=iso=>{const d=new Date(iso);if(d<start)return -1;const idx=Math.floor((d-start)/86400000);return idx<30?idx:-1;};
  subs.forEach(s=>{if(s.status!=="approved")return;const i=slot(s.submitted_at);if(i>=0)days[i].earned+=s.stars;});
  reds.forEach(r=>{const i=slot(r.redeemed_at);if(i>=0)days[i].spent+=r.stars;});
  (plog||[]).forEach(p=>{const i=slot(p.applied_at);if(i>=0)days[i].penalties+=p.stars;});
  let run=0;
  return days.map(d=>{run+=d.earned-d.spent-d.penalties;return{...d,balance:Math.max(0,run)};});
}

function StarsGraph({data}) {
  const t=useLang();
  const [tip,setTip]=useState(null); const [hov,setHov]=useState(null);
  const gd=useMemo(()=>buildGraph(data.submissions,data.redemptions,data.penaltyLog),[data]);
  const has=gd.some(d=>d.earned>0||d.spent>0||d.penalties>0);
  const W=500,H=200,PL=32,PR=12,PT=14,PB=44,gW=W-PL-PR,gH=H-PT-PB;
  const mv=Math.max(1,...gd.map(d=>Math.max(d.balance,d.earned,d.spent,d.penalties)));
  const sy=v=>PT+gH-(v/mv)*gH; const sx=i=>PL+(i/29)*gW;
  const ld=k=>gd.map((d,i)=>`${i===0?"M":"L"}${sx(i).toFixed(1)},${sy(d[k]).toFixed(1)}`).join(" ");
  const ad=k=>`${ld(k)} L${sx(29).toFixed(1)},${(PT+gH).toFixed(1)} L${sx(0).toFixed(1)},${(PT+gH).toFixed(1)} Z`;
  const ticks=[0,.25,.5,.75,1].map(f=>Math.round(f*mv));
  const xl=gd.filter((_,i)=>i%5===0||i===29);
  const ser=[{key:"balance",color:"#6366f1",label:t.graphBalance,dash:""},{key:"earned",color:"#10b981",label:t.graphEarned,dash:"4,3"},{key:"spent",color:"#f59e0b",label:t.graphSpent,dash:"4,3"},{key:"penalties",color:"#ef4444",label:t.graphPenalties,dash:"2,3"}];
  return (
    <div style={card}>
      <h3 style={{margin:"0 0 16px",color:"#374151"}}>{t.graphTitle}</h3>
      <div style={{display:"flex",gap:16,marginBottom:12,flexWrap:"wrap"}}>
        {ser.map(s=>(<div key={s.key} style={{display:"flex",alignItems:"center",gap:6,fontSize:13}}><svg width={28} height={10}><line x1={0} y1={5} x2={28} y2={5} stroke={s.color} strokeWidth={2.5} strokeDasharray={s.dash} strokeLinecap="round"/></svg><span style={{color:"#374151",fontWeight:600}}>{s.label}</span></div>))}
      </div>
      {!has?<div style={{textAlign:"center",color:"#9ca3af",padding:"40px 0"}}>{t.graphNoData}</div>:(
        <div style={{overflowX:"auto"}}>
          <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{display:"block",userSelect:"none",minWidth:280}} onMouseLeave={()=>{setTip(null);setHov(null);}}>
            <defs>{ser.map(s=>(<linearGradient key={s.key} id={`g-${s.key}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={s.color} stopOpacity=".18"/><stop offset="100%" stopColor={s.color} stopOpacity=".01"/></linearGradient>))}</defs>
            {ticks.map(v=>(<g key={v}><line x1={PL} y1={sy(v)} x2={PL+gW} y2={sy(v)} stroke="#f1f5f9" strokeWidth={1}/><text x={PL-4} y={sy(v)+4} textAnchor="end" fontSize={10} fill="#9ca3af">{v}</text></g>))}
            {ser.map(s=><path key={s.key} d={ad(s.key)} fill={`url(#g-${s.key})`}/>)}
            {ser.map(s=><path key={s.key} d={ld(s.key)} fill="none" stroke={s.color} strokeWidth={2.5} strokeDasharray={s.dash} strokeLinecap="round" strokeLinejoin="round"/>)}
            {gd.map((d,i)=>(<rect key={i} x={sx(i)-gW/60} y={PT} width={gW/29} height={gH} fill="transparent" style={{cursor:"crosshair"}} onMouseEnter={()=>{setHov(i);setTip({x:sx(i),d});}}/>))}
            {hov!==null&&(()=>{const d=gd[hov],x=sx(hov);return(<g><line x1={x} y1={PT} x2={x} y2={PT+gH} stroke="#cbd5e1" strokeWidth={1} strokeDasharray="3,2"/>{ser.map(s=><circle key={s.key} cx={x} cy={sy(d[s.key])} r={4} fill="#fff" stroke={s.color} strokeWidth={2.5}/>)}</g>);})()}
            {xl.map((d,i)=>{const idx=gd.indexOf(d);return <text key={i} x={sx(idx)} y={H-6} textAnchor="middle" fontSize={10} fill="#9ca3af">{d.label}</text>;})}
            {tip&&(()=>{const{x,d}=tip;const bw=120,bh=96,p=8,tx=x+bw+16>W?x-bw-8:x+12;return(<g><rect x={tx} y={PT+4} width={bw} height={bh} rx={8} fill="white" stroke="#e2e8f0" strokeWidth={1} style={{filter:"drop-shadow(0 2px 6px rgba(0,0,0,.1))"}}/><text x={tx+p} y={PT+20} fontSize={11} fontWeight="700" fill="#374151">{d.label}</text>{ser.map((s,si)=>(<g key={s.key}><circle cx={tx+p+5} cy={PT+34+si*15} r={4} fill={s.color}/><text x={tx+p+14} y={PT+38+si*15} fontSize={10} fill="#374151">{s.label}: <tspan fontWeight="700">{d[s.key]}</tspan></text></g>))}</g>);})()}
          </svg>
        </div>
      )}
      {has&&(()=>{const te=gd.reduce((a,d)=>a+d.earned,0),ts=gd.reduce((a,d)=>a+d.spent,0),tp=gd.reduce((a,d)=>a+d.penalties,0);return(<div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap"}}>{[{l:t.graphEarned,v:`+${te} ⭐`,c:"#10b981",bg:"#f0fdf4"},{l:t.graphSpent,v:`−${ts} ⭐`,c:"#f59e0b",bg:"#fffbeb"},{l:t.graphPenalties,v:`−${tp} ⭐`,c:"#ef4444",bg:"#fef2f2"},{l:t.graphBalance,v:`${data.totalStars} ⭐`,c:"#6366f1",bg:"#f5f3ff"}].map(({l,v,c,bg})=>(<div key={l} style={{flex:1,minWidth:70,background:bg,borderRadius:12,padding:10,textAlign:"center"}}><div style={{fontSize:16,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{l}</div></div>))}</div>);})()}
    </div>
  );
}

// ── GoalBanners ────────────────────────────────────────────────────────────
function GoalBanners({goals,submissions,api,refresh}) {
  const t=useLang(); const lang=useContext(LangCtx);
  const [dis,setDis]=useState([]); const [flash,setFlash]=useState(null);
  const ev=useMemo(()=>evalGoals(goals,submissions),[goals,submissions]);
  const vis=ev.filter(g=>(g.alerting||g.complete)&&!dis.includes(g.id+g.pk)&&!g.claimed);
  if(!vis.length&&!flash) return null;
  const claim=async g=>{try{const b=await api.claimGoalBonus(g.id,g.pk);setDis(d=>[...d,g.id+g.pk]);setFlash(t.goalCompleteMsg(rn(g.name,lang),b));setTimeout(()=>setFlash(null),4000);refresh();}catch{}};
  return (
    <div style={{marginBottom:12}}>
      {flash&&<div style={{background:"linear-gradient(135deg,#f59e0b,#d97706)",color:"#fff",borderRadius:14,padding:"14px 18px",marginBottom:10,fontWeight:700,display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:28}}>🏆</span><span>{flash}</span></div>}
      {vis.map(g=>{const tl=g.type==="weekly"?t.goalBannerWeekly:t.goalBannerMonthly;const ic=g.complete;return(
        <div key={g.id} style={{background:ic?"linear-gradient(135deg,#f59e0b,#d97706)":"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:14,padding:"14px 18px",marginBottom:10,color:"#fff"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
            <div style={{flex:1}}>
              <div style={{fontWeight:700,fontSize:"clamp(13px,3vw,15px)",marginBottom:4}}>{ic?`🏆 ${rn(g.name,lang)}`:`🎯 ${rn(g.name,lang)}`}</div>
              <div style={{fontSize:"clamp(12px,2.5vw,13px)",opacity:.9,marginBottom:8}}>{ic?t.goalCompleteMsg(rn(g.name,lang),g.bonus).replace(/^🏆 /,""):t.goalBannerMsg(rn(g.name,lang),g.pct,tl,g.remaining,g.bonus)}</div>
              <div style={{background:"rgba(255,255,255,.25)",borderRadius:99,height:8,overflow:"hidden"}}><div style={{width:`${g.pct}%`,background:"#fff",borderRadius:99,height:"100%",transition:"width .4s"}}/></div>
              <div style={{fontSize:11,marginTop:4,opacity:.85}}>{g.earned} / {g.stars} ⭐ · {g.pct}%</div>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"flex-end",flexShrink:0}}>
              {ic&&<button style={{...btn("#fff","#d97706"),fontSize:12,padding:"6px 14px"}} onClick={()=>claim(g)}>+{g.bonus} ⭐ Claim!</button>}
              <button onClick={()=>setDis(d=>[...d,g.id+g.pk])} style={{background:"rgba(255,255,255,.2)",border:"none",color:"#fff",borderRadius:8,padding:"4px 10px",cursor:"pointer",fontSize:12}}>✕</button>
            </div>
          </div>
        </div>
      );})}
    </div>
  );
}

// ── ChoreModal ─────────────────────────────────────────────────────────────
function ChoreModal({chore,date,api,lang,t,onSuccess,onClose}) {
  const [note,setNote]=useState(""); const [dup,setDup]=useState(false); const [load,setLoad]=useState(false);
  const submit=async()=>{setDup(false);setLoad(true);try{await api.submitChore({chore_id:chore.id,chore_name:rn(chore.name,lang),stars:chore.stars,note,date});onSuccess();}catch(e){if(e.message==="duplicate")setDup(true);}setLoad(false);};
  const desc=rn(chore.desc,lang);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}>
      <div style={{...card,width:"min(340px,100%)",marginBottom:0}}>
        <div style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",borderRadius:12,padding:"16px 20px",marginBottom:16,color:"#fff",textAlign:"center"}}>
          <div style={{fontSize:40,marginBottom:4}}>{chore.emoji||"🧹"}</div>
          <div style={{fontWeight:800,fontSize:18}}>{rn(chore.name,lang)}</div>
          {desc&&<div style={{fontSize:13,opacity:.85,marginTop:4}}>{desc}</div>}
          <div style={{marginTop:8,display:"inline-flex",alignItems:"center",gap:6,background:"rgba(255,255,255,.2)",borderRadius:20,padding:"4px 14px"}}>
            <StarSvg filled size={16}/><span style={{fontWeight:700}}>{chore.stars} {t.starsUnit}</span>
          </div>
        </div>
        <div style={{background:"#f5f3ff",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#4f46e5",fontWeight:600,display:"flex",alignItems:"center",gap:8}}>
          📅 {fmtDo(date)}{date===todayStr()&&" (today)"}
        </div>
        <h3 style={{margin:"0 0 10px",color:"#374151"}}>{t.confirmChore}</h3>
        <input placeholder={t.optionalNote} value={note} onChange={e=>setNote(e.target.value)} style={{...inp,marginBottom:10}}/>
        {dup&&<div style={{color:"#ef4444",fontSize:12,marginBottom:8}}>{t.duplicateChore}</div>}
        <div style={{display:"flex",gap:8}}>
          <button style={{...btn(),flex:1}} onClick={submit} disabled={load}>{load?t.submitting:t.submitBtn}</button>
          <button style={btn("#9ca3af")} onClick={onClose}>{t.cancel}</button>
        </div>
      </div>
    </div>
  );
}

// ── RewardModal ────────────────────────────────────────────────────────────
function RewardModal({reward,totalStars,t,onConfirm,onClose}) {
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
      <div style={{...card,width:"min(300px,90vw)",textAlign:"center",marginBottom:0}}>
        <div style={{fontSize:44,marginBottom:8}}>{reward.emoji||"🎁"}</div>
        <h3 style={{margin:"0 0 8px"}}>{t.redeemReward}</h3>
        <p style={{margin:"0 0 4px",fontWeight:600}}>{reward.name}</p>
        <p style={{margin:"0 0 16px",color:"#f59e0b",fontWeight:700}}>{t.costs} {reward.stars} ⭐ ({t.youHave} {totalStars})</p>
        <div style={{display:"flex",gap:8,justifyContent:"center"}}>
          <button style={btn("#10b981")} onClick={onConfirm}>{t.yesRedeem}</button>
          <button style={btn("#9ca3af")} onClick={onClose}>{t.cancel}</button>
        </div>
      </div>
    </div>
  );
}

// ── KidPanel ───────────────────────────────────────────────────────────────
function KidPanel({data,api,refresh}) {
  const t=useLang(); const lang=useContext(LangCtx);
  const {chores,rewards,submissions,redemptions,penaltyLog=[],totalStars,goals}=data;
  const [tabK,setTabK]=useState("chores");
  const [selDate,setSelDate]=useState(todayStr());
  const [choreTarget,setChoreTarget]=useState(null);
  const [redeemTarget,setRedeemTarget]=useState(null);
  const [flash,setFlash]=useState(null);
  const [ftType,setFtType]=useState("all");
  const [ftStatus,setFtStatus]=useState("all");
  const [showChangePin,setShowChangePin]=useState(false);
  const [showEditProfile,setShowEditProfile]=useState(false);

  const showFlash=(msg,c="#10b981")=>{setFlash({msg,c});setTimeout(()=>setFlash(null),2500);};
  const selWd=isoWeekday(selDate);
  const doneOn=(cid,d)=>submissions.some(s=>s.chore_id===cid&&s.submitted_at.slice(0,10)===d&&s.status!=="rejected");
  const availOn=(chore,d)=>!chore.weekdays||chore.weekdays.includes(isoWeekday(d));
  const choreEmoji=s=>{const c=chores.find(c=>c.id===s.chore_id);return c?c.emoji||"🧹":"🧹";};
  const rewardEmoji=r=>{const rw=rewards.find(rw=>rw.id===r.reward_id);return rw?rw.emoji||"🎁":"🎁";};

  const handleRedeem=async r=>{setRedeemTarget(null);try{await api.redeemReward({reward_id:r.id,reward_name:r.name,stars:r.stars});showFlash(t.redeemSuccess(r.name,r.stars));refresh();}catch{showFlash(t.notEnoughStars,"#ef4444");}};

  const allH=[...submissions.map(s=>({...s,_t:"chore",_d:new Date(s.submitted_at)})),...redemptions.map(r=>({...r,_t:"redemption",_d:new Date(r.redeemed_at)})),...penaltyLog.map(p=>({...p,_t:"penalty",_d:new Date(p.applied_at)}))].sort((a,b)=>b._d-a._d);
  const hist=allH.filter(x=>{if(ftType!=="all"&&x._t!==ftType)return false;if(ftStatus!=="all"){if(x._t!=="chore")return ftStatus==="redeemed";if(x.status!==ftStatus)return false;}return true;});
  const stLabel=s=>t[`status${s[0].toUpperCase()+s.slice(1)}`]||s;

  return (
    <div>
      {choreTarget&&<ChoreModal chore={choreTarget} date={selDate} api={api} lang={lang} t={t} onSuccess={()=>{setChoreTarget(null);showFlash(t.choreSubmitted);refresh();}} onClose={()=>setChoreTarget(null)}/>}
      {redeemTarget&&<RewardModal reward={redeemTarget} totalStars={totalStars} t={t} onConfirm={()=>handleRedeem(redeemTarget)} onClose={()=>setRedeemTarget(null)}/>}
      {showChangePin&&<KidChangePinModal api={api} refresh={refresh} onClose={(msg)=>{setShowChangePin(false);if(msg)showFlash(msg);}}/>}
      {showEditProfile&&<KidProfileModal kidName={data.kidName||""} kidEmoji={data.kidEmoji||"👧🏽"} api={api} refresh={refresh} onClose={(msg)=>{setShowEditProfile(false);if(msg)showFlash(msg);}}/>}

      <GoalBanners goals={goals} submissions={submissions} api={api} refresh={refresh}/>

      <div style={{...card,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",textAlign:"center",position:"relative"}}>
        <div style={{fontSize:40,marginBottom:2,lineHeight:1}}>{data.kidEmoji||"👧🏽"}</div>
        {data.kidName&&<div style={{fontSize:16,fontWeight:700,opacity:.9,marginBottom:4}}>{data.kidName}</div>}
        <div style={{fontSize:52,fontWeight:800}}>{totalStars}</div>
        <div style={{fontSize:18,opacity:.85}}>⭐ {t.starsAvailable}</div>
        <div style={{marginTop:8,fontSize:13,opacity:.7}}>{submissions.filter(s=>s.status==="approved").length} {t.completed} · {submissions.filter(s=>s.status==="pending").length} {t.pending}</div>
        <button onClick={()=>setShowChangePin(true)} style={{position:"absolute",top:10,right:10,background:"rgba(255,255,255,.18)",border:"none",borderRadius:8,padding:"4px 9px",cursor:"pointer",color:"#fff",fontSize:13,fontWeight:600}}>🔑</button>
        <button onClick={()=>setShowEditProfile(true)} style={{position:"absolute",top:10,left:10,background:"rgba(255,255,255,.18)",border:"none",borderRadius:8,padding:"4px 9px",cursor:"pointer",color:"#fff",fontSize:13,fontWeight:600}}>✏️</button>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {[["chores",t.tabChores],["rewards",t.tabRewards],["history",t.tabHistory],["graph",t.tabGraph]].map(([k,l])=><button key={k} style={tab(tabK===k)} onClick={()=>setTabK(k)}>{l}</button>)}
      </div>

      {flash&&<div style={{...card,background:flash.c,color:"#fff",fontWeight:600,textAlign:"center",padding:14}}>{flash.msg}</div>}

      {tabK==="chores"&&(
        <div>
          <p style={{color:"#6b7280",fontSize:14,margin:"0 0 12px"}}>{t.pickChore}</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12,marginBottom:16}}>
            {chores.map(c=>{
              const done=doneOn(c.id,selDate), avail=availOn(c,selDate), dis=done||!avail, desc=rn(c.desc,lang);
              return (
                <div key={c.id} onClick={()=>!dis&&setChoreTarget(c)}
                  style={{background:done?"#f0fdf4":!avail?"#f9fafb":"#fff",border:`2px solid ${done?"#bbf7d0":!avail?"#e5e7eb":"#e0e7ff"}`,borderRadius:16,padding:"16px 12px",textAlign:"center",cursor:dis?"default":"pointer",opacity:!avail?0.55:1,boxShadow:dis?"none":"0 2px 8px rgba(99,102,241,.10)",transition:"transform .15s,box-shadow .15s",position:"relative"}}
                  onMouseEnter={e=>{if(!dis){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(99,102,241,.18)";}}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=dis?"none":"0 2px 8px rgba(99,102,241,.10)";}}>
                  <div style={{fontSize:36,marginBottom:6}}>{c.emoji||"🧹"}</div>
                  <div style={{fontWeight:700,fontSize:14,color:"#111827",marginBottom:4,lineHeight:1.3}}>{rn(c.name,lang)}</div>
                  {desc&&<div style={{fontSize:11,color:"#6b7280",marginBottom:8,lineHeight:1.4}}>{desc}</div>}
                  <div style={{display:"inline-flex",alignItems:"center",gap:4,background:done?"#dcfce7":!avail?"#f3f4f6":"#eef2ff",borderRadius:20,padding:"4px 12px"}}>
                    <StarSvg filled size={14}/><span style={{fontWeight:700,fontSize:13,color:done?"#16a34a":!avail?"#9ca3af":"#6366f1"}}>{c.stars}</span>
                  </div>
                  {done&&<div style={{position:"absolute",top:8,right:8,background:"#10b981",color:"#fff",borderRadius:20,fontSize:10,fontWeight:700,padding:"2px 8px"}}>{t.alreadyDone}</div>}
                  {!avail&&!done&&<div style={{position:"absolute",top:8,right:8,background:"#9ca3af",color:"#fff",borderRadius:20,fontSize:10,fontWeight:700,padding:"2px 8px"}}>{t.notAvailable}</div>}
                </div>
              );
            })}
          </div>
          <div style={{...card,padding:"16px 18px"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12,flexWrap:"wrap",gap:8}}>
              <label style={{fontSize:14,fontWeight:700,color:"#374151"}}>{t.dateLabel}</label>
              <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
                {t.weekdays.map((l,d)=>(<span key={d} style={{padding:"3px 8px",borderRadius:20,fontSize:11,fontWeight:600,background:d===selWd?"#6366f1":"#f1f5f9",color:d===selWd?"#fff":"#9ca3af",border:`1px solid ${d===selWd?"#6366f1":"#e2e8f0"}`}}>{l.slice(0,2)}</span>))}
              </div>
            </div>
            <MiniCalendar value={selDate} onChange={setSelDate} max={todayStr()}/>
          </div>
        </div>
      )}

      {tabK==="rewards"&&(
        <div>
          <h3 style={{margin:"0 0 14px",color:"#374151"}}>{t.availableRewards}</h3>
          {!rewards.length&&<p style={{color:"#9ca3af"}}>{t.noRewards}</p>}
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(150px,1fr))",gap:12}}>
            {rewards.map(r=>{const rName=rn(r.name,lang),rDesc=rn(r.desc,lang),ca=totalStars>=r.stars;return(
              <div key={r.id} onClick={()=>ca&&setRedeemTarget({...r,name:rName})}
                style={{background:ca?"#fff":"#f9fafb",border:`2px solid ${ca?"#e0e7ff":"#e5e7eb"}`,borderRadius:16,padding:"16px 12px",textAlign:"center",cursor:ca?"pointer":"default",opacity:ca?1:.6,boxShadow:ca?"0 2px 8px rgba(99,102,241,.10)":"none",transition:"transform .15s,box-shadow .15s",position:"relative"}}
                onMouseEnter={e=>{if(ca){e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 6px 18px rgba(99,102,241,.18)";}}}
                onMouseLeave={e=>{e.currentTarget.style.transform="";e.currentTarget.style.boxShadow=ca?"0 2px 8px rgba(99,102,241,.10)":"none";}}>
                <div style={{fontSize:36,marginBottom:6}}>{r.emoji||"🎁"}</div>
                <div style={{fontWeight:700,fontSize:14,color:"#111827",marginBottom:4,lineHeight:1.3}}>{rName}</div>
                {rDesc&&<div style={{fontSize:11,color:"#6b7280",marginBottom:8,lineHeight:1.4}}>{rDesc}</div>}
                <div style={{display:"inline-flex",alignItems:"center",gap:4,background:ca?"#eef2ff":"#f3f4f6",borderRadius:20,padding:"4px 12px"}}>
                  <StarSvg filled size={14}/><span style={{fontWeight:700,fontSize:13,color:ca?"#6366f1":"#9ca3af"}}>{r.stars}</span>
                </div>
                {!ca&&<div style={{position:"absolute",top:8,right:8,background:"#9ca3af",color:"#fff",borderRadius:20,fontSize:10,fontWeight:700,padding:"2px 8px"}}>{t.needMore(r.stars-totalStars)}</div>}
              </div>
            );})}
          </div>
        </div>
      )}

      {tabK==="history"&&(
        <div style={card}>
          <h3 style={{margin:"0 0 12px",color:"#374151"}}>{t.fullHistory}</h3>
          <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
            <div style={{display:"flex",gap:4,background:"#f1f5f9",borderRadius:10,padding:4}}>
              {[["all",t.filterAll],["chore",t.filterChores],["redemption",t.filterRedemptions],["penalty",t.filterPenalties]].map(([v,l])=>(<button key={v} onClick={()=>{setFtType(v);setFtStatus("all");}} style={{...tab(ftType===v),padding:"5px 10px",fontSize:12}}>{l}</button>))}
            </div>
            {ftType==="chore"&&(<div style={{display:"flex",gap:4,background:"#f1f5f9",borderRadius:10,padding:4}}>{[["all",t.filterAll],["pending",t.statusPending],["approved",t.statusApproved],["rejected",t.statusRejected]].map(([v,l])=>(<button key={v} onClick={()=>setFtStatus(v)} style={{...tab(ftStatus===v),padding:"5px 10px",fontSize:12,background:ftStatus===v?sc(v==="all"?"approved":v):"#f1f5f9"}}>{l}</button>))}</div>)}
          </div>
          {!hist.length&&<p style={{color:"#9ca3af"}}>{t.nothingYet}</p>}
          {hist.map(x=>{
            const icon=x._t==="chore"?choreEmoji(x):x._t==="redemption"?rewardEmoji(x):"⚠️";
            return (<div key={`${x._t}-${x.id}`} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:6}}><span>{icon}</span><span style={{fontWeight:600,color:"#111827"}}>{x._t==="chore"?x.chore_name:x._t==="redemption"?x.reward_name:x.penalty_name}</span></div>
                <div style={{fontSize:12,color:"#9ca3af"}}>{fmtDt(x._d)}</div>
                {x.note&&<div style={{fontSize:12,color:"#6b7280",fontStyle:"italic"}}>"{x.note}"</div>}
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
                <span style={{fontWeight:700,fontSize:14,color:x._t==="chore"?"#10b981":"#ef4444"}}>{x._t==="chore"?"+":"-"}{x.stars} ⭐</span>
                {x._t==="chore"&&<span style={bdg(sc(x.status))}>{stLabel(x.status)}</span>}
                {x._t==="penalty"&&<span style={bdg("#ef4444")}>⚠️</span>}
              </div>
            </div>);
          })}
        </div>
      )}

      {tabK==="graph"&&<StarsGraph data={data}/>}
    </div>
  );
}

// ── CalendarPopup ──────────────────────────────────────────────────────────
function CalendarPopup({value, onChange, max}) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{position:"relative"}}>
      <div style={{display:"flex",gap:8,alignItems:"center"}}>
        <div style={{flex:1, background:"#f5f3ff", borderRadius:10, padding:"8px 14px", fontSize:14, fontWeight:600, color:"#4f46e5", border:"1.5px solid #c7d2fe", display:"flex", alignItems:"center", gap:8}}>
          <span>📅</span>
          <span>{value ? fmtDo(value) : "DD/MM/YYYY"}</span>
          <span style={{fontSize:12, color:"#818cf8", marginLeft:4}}>({value ? T.en.weekdays[isoWeekday(value)] : "—"})</span>
        </div>
        <button type="button" onClick={()=>setOpen(o=>!o)}
          style={{...btn(open?"#4f46e5":"#6366f1"),padding:"8px 14px",flexShrink:0}}>
          {open ? "✕" : "📅 Pick"}
        </button>
      </div>
      {open&&(
        <div style={{marginTop:6,borderRadius:14,border:"1.5px solid #e0e7ff",overflow:"hidden"}}>
          <MiniCalendar value={value} max={max} onChange={v=>{onChange(v);setOpen(false);}}/>
        </div>
      )}
    </div>
  );
}
function AdminPenalties({data,api,refresh}) {
  const t=useLang(); const lang=useContext(LangCtx);
  const {penalties,penaltyLog=[]}=data;
  const [newP,setNewP]=useState({name:"",stars:2});
  const [editId,setEditId]=useState(null);
  const [editF,setEditF]=useState({name:"",stars:2});
  const [applyF,setApplyF]=useState({penaltyId:"",note:"",date:todayStr()});
  const [applyFlash,setApplyFlash]=useState(null);
  const [applyErr,setApplyErr]=useState(null);

  const handleAdd=async()=>{if(!newP.name.trim())return;await api.addPenalty({name:newP.name,stars:newP.stars});setNewP({name:"",stars:2});refresh();};
  const startEdit=p=>{setEditId(p.id);setEditF({name:rn(p.name,lang),stars:p.stars});};
  const handleSave=async()=>{if(!editF.name.trim())return;await api.updatePenalty(editId,{name:editF.name,stars:editF.stars});setEditId(null);refresh();};

  const handleApply=async()=>{
    setApplyErr(null);
    if(!applyF.penaltyId){setApplyErr("Please select a penalty.");return;}
    const p=penalties.find(p=>p.id===parseInt(applyF.penaltyId));
    if(!p){setApplyErr("Penalty not found.");return;}
    const pname=rn(p.name,lang);
    if(!confirm(t.confirmPenalty(pname,p.stars)))return;
    try{
      await api.applyPenalty({penalty_id:p.id,penalty_name:pname,stars:p.stars,note:applyF.note,date:applyF.date});
      setApplyFlash(t.penaltyApplied(pname,p.stars));
      setApplyF({penaltyId:"",note:"",date:todayStr()});
      setTimeout(()=>setApplyFlash(null),3000); refresh();
    }catch(e){setApplyErr(String(e));}
  };

  return (
    <div>
      <div style={card}>
        <h3 style={{margin:"0 0 14px"}}>{t.addNewPenalty}</h3>
        <div style={{display:"flex",gap:8}}>
          <input placeholder={t.penaltyName} value={newP.name} onChange={e=>setNewP({...newP,name:e.target.value})} style={{...inp,flex:3}}/>
          <input type="number" min={1} max={50} value={newP.stars} onChange={e=>setNewP({...newP,stars:parseInt(e.target.value)||1})} style={{...inp,flex:1}}/>
          <button style={btn("#ef4444")} onClick={handleAdd}>{t.add}</button>
        </div>
      </div>

      <div style={{...card,border:"2px solid #fee2e2",background:"#fff5f5"}}>
        <h3 style={{margin:"0 0 4px",color:"#dc2626"}}>{t.adminApplyPenaltyTitle}</h3>
        <p style={{margin:"0 0 12px",fontSize:13,color:"#6b7280"}}>Stars are immediately deducted from the balance.</p>
        {applyFlash&&<div style={{background:"#10b981",color:"#fff",borderRadius:8,padding:"8px 12px",marginBottom:10,fontWeight:600,fontSize:13}}>{applyFlash}</div>}
        {applyErr&&<div style={{background:"#fee2e2",color:"#dc2626",borderRadius:8,padding:"8px 12px",marginBottom:10,fontSize:13}}>{applyErr}</div>}
        <select value={applyF.penaltyId} onChange={e=>{setApplyErr(null);setApplyF({...applyF,penaltyId:e.target.value});}} style={{...inp,marginBottom:8,background:"#fff"}}>
          <option value="">{t.penaltyPickReason}</option>
          {penalties.map(p=><option key={p.id} value={String(p.id)}>{rn(p.name,lang)} (−{p.stars} ⭐)</option>)}
        </select>
        <div style={{marginBottom:8}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>{t.dateLabel}</label>
          <DateInput value={applyF.date} max={todayStr()} onChange={v=>setApplyF({...applyF,date:v})} style={{...inp,background:"#fff"}}/>
        </div>
        <input placeholder={t.penaltyNote} value={applyF.note} onChange={e=>setApplyF({...applyF,note:e.target.value})} style={{...inp,marginBottom:10,background:"#fff"}}/>
        <button style={btn("#dc2626")} onClick={handleApply}>{t.applyPenalty} ⚠️</button>
      </div>

      <div style={card}>
        <h3 style={{margin:"0 0 14px"}}>{t.penaltyList}</h3>
        {!penalties.length&&<p style={{color:"#9ca3af"}}>{t.noPenalties}</p>}
        {penalties.map(p=>(
          <div key={p.id} style={{padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
            {editId===p.id?(
              <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                <input value={editF.name} onChange={e=>setEditF({...editF,name:e.target.value})} style={{...inp,flex:3,minWidth:120}}/>
                <input type="number" min={1} max={50} value={editF.stars} onChange={e=>setEditF({...editF,stars:parseInt(e.target.value)||1})} style={{...inp,width:60,flexShrink:0}}/>
                <button style={btn("#10b981")} onClick={handleSave}>{t.saveChore}</button>
                <button style={btn("#9ca3af")} onClick={()=>setEditId(null)}>{t.cancelEdit}</button>
              </div>
            ):(
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div><span style={{fontWeight:600}}>{rn(p.name,lang)}</span><span style={{marginLeft:10,fontSize:13,color:"#ef4444",fontWeight:700}}>−{p.stars} ⭐</span></div>
                <div style={{display:"flex",gap:6}}>
                  <button style={btn("#6366f1")} onClick={()=>startEdit(p)}>✏️</button>
                  <button style={btn("#ef4444")} onClick={async()=>{await api.deletePenalty(p.id);refresh();}}>{t.delete}</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={card}>
        <h3 style={{margin:"0 0 14px"}}>{t.penaltyHistory}</h3>
        {!penaltyLog.length&&<p style={{color:"#9ca3af"}}>{t.noPenaltyHistory}</p>}
        {penaltyLog.map(p=>(
          <div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:6}}><span>⚠️</span><span style={{fontWeight:600}}>{p.penalty_name}</span></div>
              <div style={{fontSize:12,color:"#9ca3af"}}>{fmtDt(p.applied_at)}</div>
              {p.note&&<div style={{fontSize:12,color:"#6b7280",fontStyle:"italic"}}>"{p.note}"</div>}
            </div>
            <span style={{color:"#ef4444",fontWeight:700,flexShrink:0}}>−{p.stars} ⭐</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AdminGoals ─────────────────────────────────────────────────────────────
function AdminGoals({data,api,refresh}) {
  const t=useLang(); const lang=useContext(LangCtx);
  const {goals,submissions}=data;
  const [ng,setNg]=useState({name:"",type:"weekly",stars:15,bonus:5,threshold:70});
  const ev=useMemo(()=>evalGoals(goals,submissions),[goals,submissions]);
  const fld=(label,child,hint)=>(<div style={{marginBottom:10}}><label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>{label}</label>{child}{hint&&<div style={{fontSize:11,color:"#9ca3af",marginTop:3}}>{hint}</div>}</div>);
  return (
    <div>
      <div style={card}>
        <h3 style={{margin:"0 0 14px"}}>{t.addGoal}</h3>
        {fld(t.goalName,<input placeholder={t.goalName} value={ng.name} onChange={e=>setNg({...ng,name:e.target.value})} style={inp}/>)}
        {fld(t.goalType,<select value={ng.type} onChange={e=>setNg({...ng,type:e.target.value})} style={{...inp,background:"#f8fafc"}}><option value="weekly">{t.goalWeekly}</option><option value="monthly">{t.goalMonthly}</option></select>)}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8}}>
          {fld(t.goalStars,<input type="number" min={1} value={ng.stars} onChange={e=>setNg({...ng,stars:parseInt(e.target.value)||1})} style={inp}/>)}
          {fld(t.goalBonus,<input type="number" min={0} value={ng.bonus} onChange={e=>setNg({...ng,bonus:parseInt(e.target.value)||0})} style={inp}/>)}
          {fld(t.goalThreshold,<input type="number" min={1} max={99} value={ng.threshold} onChange={e=>setNg({...ng,threshold:parseInt(e.target.value)||70})} style={inp}/>,t.goalThresholdHint)}
        </div>
        <button style={btn()} onClick={async()=>{if(!ng.name.trim())return;await api.addGoal({...ng});setNg({name:"",type:"weekly",stars:15,bonus:5,threshold:70});refresh();}}>{t.addGoal}</button>
      </div>
      <div style={card}>
        <h3 style={{margin:"0 0 14px"}}>{t.goalList}</h3>
        {!ev.length&&<p style={{color:"#9ca3af"}}>{t.noGoals}</p>}
        {ev.map(g=>(
          <div key={g.id} style={{padding:"14px 0",borderBottom:"1px solid #f3f4f6"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,color:"#111827",fontSize:15}}>{rn(g.name,lang)}</div>
                <div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{g.type==="weekly"?t.goalWeekly:t.goalMonthly} · {t.goalStars}: {g.stars} ⭐ · {t.goalBonus}: +{g.bonus} ⭐ · {t.goalThreshold}: {g.threshold}%</div>
                <div style={{marginTop:8,background:"#f1f5f9",borderRadius:99,height:8,overflow:"hidden"}}><div style={{width:`${g.pct}%`,background:g.complete?"#10b981":"#6366f1",borderRadius:99,height:"100%",transition:"width .4s"}}/></div>
                <div style={{fontSize:12,color:"#6b7280",marginTop:4}}>{t.goalProgress(g.earned,g.stars)} · {g.pct}%{g.claimed?" · ✅":""}</div>
              </div>
              <button style={btn("#ef4444")} onClick={async()=>{await api.deleteGoal(g.id);refresh();}}>{t.delete}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── AdminPanel ─────────────────────────────────────────────────────────────
function AdminPanel({data,api,refresh,onLock}) {
  const t=useLang(); const lang=useContext(LangCtx);
  const {chores,rewards,submissions,redemptions,totalStars,goals,penalties=[],penaltyLog=[]}=data;
  const [tabA,setTabA]=useState("approvals");
  const [editChoreId,setEditChoreId]=useState(null);
  const [editRewardId,setEditRewardId]=useState(null);
  const [showNewChore,setShowNewChore]=useState(false);
  const [showNewReward,setShowNewReward]=useState(false);
  const pending=submissions.filter(s=>s.status==="pending");
  const wrap=fn=>async(...a)=>{await fn(...a);refresh();};
  const stLabel=s=>t[`status${s[0].toUpperCase()+s.slice(1)}`]||s;
  const [acFlash,setAcFlash]=useState(null);
  const [ae,setAe]=useState({choreId:"",date:todayStr(),note:""});
  const [aeWarn,setAeWarn]=useState(null); // null | "wrongday" | "duplicate"

  const handleAE=async(force=false)=>{
    if(!ae.choreId) return;
    const c=chores.find(c=>c.id===parseInt(ae.choreId));
    if(!force){
      const isDup=data.submissions.some(s=>s.chore_id===c.id&&s.submitted_at.slice(0,10)===ae.date&&s.status!=="rejected");
      if(isDup){setAeWarn("duplicate");return;}
      if(c.weekdays&&!c.weekdays.includes(isoWeekday(ae.date))){setAeWarn("wrongday");return;}
    }
    setAeWarn(null);
    await api.submitChore({chore_id:c.id,chore_name:rn(c.name,lang),stars:c.stars,note:ae.note,date:ae.date,autoApprove:true,force});
    setAcFlash(t.adminChoreSubmitted(fmtDo(ae.date)));
    setAe(prev=>({choreId:"",date:prev.date,note:""}));
    setTimeout(()=>setAcFlash(null),2500); refresh();
  };

  const stats=[{l:t.stars,v:totalStars,c:"#6366f1"},{l:t.pendingLabel,v:pending.length,c:"#f59e0b"},{l:t.choresLabel,v:chores.length,c:"#10b981"},{l:t.rewardsLabel,v:rewards.length,c:"#ec4899"},{l:"Goals",v:goals.length,c:"#0ea5e9"},{l:"Penalties",v:penalties.length,c:"#ef4444"}];

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
        <h2 style={{margin:0,color:"#374151"}}>{t.adminPanel}</h2>
        <button style={btn("#ef4444")} onClick={onLock}>{t.lock}</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(60px,1fr))",gap:10,marginBottom:16}}>
        {stats.map(({l,v,c})=>(<div key={l} style={{...card,textAlign:"center",padding:12,marginBottom:0}}><div style={{fontSize:22,fontWeight:800,color:c}}>{v}</div><div style={{fontSize:10,color:"#6b7280"}}>{l}</div></div>))}
      </div>
      <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
        {[["approvals",`${t.approvals}${pending.length?` (${pending.length})`:""}`],["redemptions",t.redemptions],["chores",t.choresLabel],["rewards",t.rewardsLabel],["penalties",t.tabPenalties],["goals",t.tabGoals],["graph",t.tabGraph],["settings",t.tabSettings]].map(([k,l])=>(<button key={k} style={tab(tabA===k)} onClick={()=>setTabA(k)}>{l}</button>))}
      </div>

      {tabA==="approvals"&&(
        <div style={card}>
          <h3 style={{margin:"0 0 14px"}}>{t.choreSubmissions}</h3>
          {!submissions.length&&<p style={{color:"#9ca3af"}}>{t.noSubmissions}</p>}
          {submissions.map(s=>(<div key={s.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 0",borderBottom:"1px solid #f3f4f6",gap:8,flexWrap:"wrap"}}><div style={{flex:1}}><div style={{fontWeight:600}}>{s.chore_name}</div><div style={{fontSize:12,color:"#9ca3af"}}>{fmtDt(s.submitted_at)}</div>{s.note&&<div style={{fontSize:12,color:"#6b7280",fontStyle:"italic"}}>"{s.note}"</div>}<div style={{marginTop:4}}><StarRow count={s.stars}/></div></div><div style={{display:"flex",gap:6,alignItems:"center"}}><span style={bdg(sc(s.status))}>{stLabel(s.status)}</span>{s.status==="pending"&&(<><button style={btn("#10b981")} onClick={wrap(()=>api.approveSubmission(s.id,"approved"))}>✓</button><button style={btn("#ef4444")} onClick={wrap(()=>api.approveSubmission(s.id,"rejected"))}>✗</button></>)}</div></div>))}
        </div>
      )}

      {tabA==="redemptions"&&(
        <div style={card}>
          <h3 style={{margin:"0 0 14px"}}>{t.redemptionHistory}</h3>
          {!redemptions.length&&<p style={{color:"#9ca3af"}}>{t.noRedemptions}</p>}
          {redemptions.map(r=>(<div key={r.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 0",borderBottom:"1px solid #f3f4f6"}}><div><div style={{fontWeight:600}}>{r.reward_name}</div><div style={{fontSize:12,color:"#9ca3af"}}>{fmtDt(r.redeemed_at)}</div></div><span style={{color:"#ef4444",fontWeight:700}}>−{r.stars} ⭐</span></div>))}
        </div>
      )}

      {tabA==="chores"&&(
        <div>
          {/* Invalid day / duplicate warning modal */}
          {aeWarn&&(()=>{
            const c=chores.find(c=>c.id===parseInt(ae.choreId));
            const msg=aeWarn==="duplicate"?t.duplicateDay:t.notValidDay;
            return(
              <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}>
                <div style={{...card,width:"min(360px,100%)",marginBottom:0,textAlign:"center"}}>
                  <div style={{fontSize:40,marginBottom:8}}>⚠️</div>
                  <h3 style={{margin:"0 0 10px",color:"#d97706"}}>{msg}</h3>
                  <div style={{background:"#f5f3ff",borderRadius:10,padding:"10px 14px",marginBottom:14,fontSize:13,color:"#4f46e5",fontWeight:600}}>
                    {c?.emoji||"🧹"} {rn(c?.name,lang)} · 📅 {fmtDo(ae.date)} ({t.weekdays[isoWeekday(ae.date)]})
                  </div>
                  <div style={{display:"flex",gap:8,justifyContent:"center"}}>
                    <button style={btn("#f59e0b")} onClick={()=>{setAeWarn(null);handleAE(true);}}>{t.continueAnyway}</button>
                    <button style={btn("#9ca3af")} onClick={()=>setAeWarn(null)}>{t.goBack}</button>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Add chore form */}
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showNewChore?14:0}}>
              <h3 style={{margin:0}}>{t.addNewChore}</h3>
              {!showNewChore&&<button style={btn()} onClick={()=>setShowNewChore(true)}>+ {t.add}</button>}
            </div>
            {showNewChore&&<ItemForm initial={{emoji:"🧹",weekdays:[0,1,2,3,4,5,6],desc:"",stars:1}} isReward={false} t={t} onSave={async f=>{await api.addChore(f);setShowNewChore(false);refresh();}} onCancel={()=>setShowNewChore(false)}/>}
          </div>

          {/* Chore list */}
          <div style={card}>
            <h3 style={{margin:"0 0 14px"}}>{t.choreList}</h3>
            {chores.map((c,idx)=>{const wds=c.weekdays||[0,1,2,3,4,5,6],allD=wds.length===7,desc=rn(c.desc,lang),isEd=editChoreId===c.id;return(
              <div key={c.id} style={{padding:"14px 0",borderBottom:"1px solid #f3f4f6"}}>
                {isEd?(<ItemForm initial={{...c,name:rn(c.name,lang),desc:rn(c.desc,lang)}} isReward={false} t={t} onSave={async f=>{await api.updateChore(c.id,f);setEditChoreId(null);refresh();}} onCancel={()=>setEditChoreId(null)}/>):(
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:10,flex:1,minWidth:0}}>
                      <div style={{display:"flex",flexDirection:"column",gap:2,flexShrink:0,marginTop:4}}>
                        <button style={{background:"none",border:"1.5px solid #e2e8f0",borderRadius:6,padding:"1px 6px",cursor:idx===0?"default":"pointer",color:idx===0?"#d1d5db":"#6366f1",fontWeight:700,fontSize:12,lineHeight:1.4}} disabled={idx===0} onClick={async()=>{await api.reorderChores(idx,idx-1);refresh();}}>↑</button>
                        <button style={{background:"none",border:"1.5px solid #e2e8f0",borderRadius:6,padding:"1px 6px",cursor:idx===chores.length-1?"default":"pointer",color:idx===chores.length-1?"#d1d5db":"#6366f1",fontWeight:700,fontSize:12,lineHeight:1.4}} disabled={idx===chores.length-1} onClick={async()=>{await api.reorderChores(idx,idx+1);refresh();}}>↓</button>
                      </div>
                      <span style={{fontSize:28,flexShrink:0,marginTop:2}}>{c.emoji||"🧹"}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,color:"#111827"}}>{rn(c.name,lang)}</div>
                        {desc&&<div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{desc}</div>}
                        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6,flexWrap:"wrap"}}><StarRow count={c.stars}/><span style={{fontSize:12,color:"#6b7280"}}>{c.stars} {t.starsUnit}</span>{allD?<span style={{fontSize:11,color:"#6366f1",fontWeight:600,background:"#eef2ff",borderRadius:12,padding:"1px 8px"}}>All days</span>:wds.map(d=><span key={d} style={{fontSize:11,color:"#6366f1",fontWeight:600,background:"#eef2ff",borderRadius:12,padding:"1px 7px"}}>{t.weekdays[d]}</span>)}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button style={btn("#6366f1")} onClick={()=>setEditChoreId(c.id)}>✏️</button>
                      <button style={btn("#ef4444")} onClick={wrap(()=>api.deleteChore(c.id))}>{t.delete}</button>
                    </div>
                  </div>
                )}
              </div>
            );})}
          </div>

          {/* Auto-approved entry — moved to bottom */}
          <div style={{...card,border:"2px solid #e0e7ff",background:"#f5f3ff"}}>
            <h3 style={{margin:"0 0 4px",color:"#4f46e5"}}>{t.adminAddChoreTitle}</h3>
            <p style={{margin:"0 0 12px",fontSize:13,color:"#6b7280"}}>Stars are added immediately.</p>
            {acFlash&&<div style={{background:"#10b981",color:"#fff",borderRadius:8,padding:"8px 12px",marginBottom:10,fontWeight:600,fontSize:13}}>{acFlash}</div>}
            <select value={ae.choreId} onChange={e=>setAe({...ae,choreId:e.target.value})} style={{...inp,marginBottom:8,background:"#fff"}}>
              <option value="">{t.pickChore}</option>
              {chores.map(c=><option key={c.id} value={c.id}>{c.emoji||"🧹"} {rn(c.name,lang)} ({c.stars} ⭐)</option>)}
            </select>
            <div style={{marginBottom:8}}>
              <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:4}}>{t.dateLabel}</label>
              <CalendarPopup value={ae.date} max={todayStr()} onChange={v=>setAe({...ae,date:v})}/>
            </div>
            <input placeholder={t.optionalNote} value={ae.note} onChange={e=>setAe({...ae,note:e.target.value})} style={{...inp,marginBottom:10,background:"#fff"}}/>
            <button style={btn("#4f46e5")} onClick={()=>handleAE(false)} disabled={!ae.choreId}>{t.add} ✓</button>
          </div>

          <div style={{textAlign:"right"}}><button style={btn("#ef4444")} onClick={async()=>{if(!confirm(t.confirmReset))return;await api.resetStars();refresh();}}>{t.resetStarBalance}</button></div>
        </div>
      )}

      {tabA==="rewards"&&(
        <div>
          <div style={card}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:showNewReward?14:0}}>
              <h3 style={{margin:0}}>{t.addNewReward}</h3>
              {!showNewReward&&<button style={btn("#ec4899")} onClick={()=>setShowNewReward(true)}>+ {t.add}</button>}
            </div>
            {showNewReward&&<ItemForm initial={{emoji:"🎁",desc:"",stars:5}} isReward={true} t={t} onSave={async f=>{await api.addReward(f);setShowNewReward(false);refresh();}} onCancel={()=>setShowNewReward(false)}/>}
          </div>
          <div style={card}>
            <h3 style={{margin:"0 0 14px"}}>{t.rewardList}</h3>
            {!rewards.length&&<p style={{color:"#9ca3af"}}>{t.noRewards}</p>}
            {rewards.map((r,idx)=>{const desc=rn(r.desc,lang),isEd=editRewardId===r.id;return(
              <div key={r.id} style={{padding:"14px 0",borderBottom:"1px solid #f3f4f6"}}>
                {isEd?(<ItemForm initial={{...r,name:rn(r.name,lang),desc:rn(r.desc,lang)}} isReward={true} t={t} onSave={async f=>{await api.updateReward(r.id,f);setEditRewardId(null);refresh();}} onCancel={()=>setEditRewardId(null)}/>):(
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
                    <div style={{display:"flex",alignItems:"flex-start",gap:10,flex:1,minWidth:0}}>
                      <div style={{display:"flex",flexDirection:"column",gap:2,flexShrink:0,marginTop:4}}>
                        <button style={{background:"none",border:"1.5px solid #e2e8f0",borderRadius:6,padding:"1px 6px",cursor:idx===0?"default":"pointer",color:idx===0?"#d1d5db":"#ec4899",fontWeight:700,fontSize:12,lineHeight:1.4}} disabled={idx===0} onClick={async()=>{await api.reorderRewards(idx,idx-1);refresh();}}>↑</button>
                        <button style={{background:"none",border:"1.5px solid #e2e8f0",borderRadius:6,padding:"1px 6px",cursor:idx===rewards.length-1?"default":"pointer",color:idx===rewards.length-1?"#d1d5db":"#ec4899",fontWeight:700,fontSize:12,lineHeight:1.4}} disabled={idx===rewards.length-1} onClick={async()=>{await api.reorderRewards(idx,idx+1);refresh();}}>↓</button>
                      </div>
                      <span style={{fontSize:28,flexShrink:0,marginTop:2}}>{r.emoji||"🎁"}</span>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,color:"#111827"}}>{rn(r.name,lang)}</div>
                        {desc&&<div style={{fontSize:12,color:"#6b7280",marginTop:2}}>{desc}</div>}
                        <div style={{display:"flex",alignItems:"center",gap:6,marginTop:6}}><StarRow count={r.stars}/><span style={{fontSize:12,color:"#6b7280"}}>{r.stars} {t.starsUnit}</span></div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:6,flexShrink:0}}>
                      <button style={btn("#ec4899")} onClick={()=>setEditRewardId(r.id)}>✏️</button>
                      <button style={btn("#ef4444")} onClick={wrap(()=>api.deleteReward(r.id))}>{t.delete}</button>
                    </div>
                  </div>
                )}
              </div>
            );})}
          </div>
        </div>
      )}

      {tabA==="penalties"&&<AdminPenalties data={data} api={api} refresh={refresh}/>}
      {tabA==="goals"&&<AdminGoals data={data} api={api} refresh={refresh}/>}
      {tabA==="graph"&&<StarsGraph data={data}/>}
      {tabA==="settings"&&<AdminSettings api={api} refresh={refresh}/>}
    </div>
  );
}

// ── PinPad (reusable) ──────────────────────────────────────────────────────
function PinPad({onVerify,errorMsg,accentColor="#6366f1"}) {
  const [pin,setPin]=useState("");
  const [err,setErr]=useState(false);
  const [shake,setShake]=useState(false);
  const append=d=>{
    if(pin.length>=4)return;
    const next=pin+d;
    setErr(false);
    setPin(next);
    if(next.length===4){
      onVerify(next).then(ok=>{
        if(!ok){setErr(true);setShake(true);setTimeout(()=>{setPin("");setShake(false);},600);}
      });
    }
  };
  const del=()=>{setPin(p=>p.slice(0,-1));setErr(false);};
  return (
    <div style={{animation:shake?"shake 0.5s":"none"}}>
      <div style={{display:"flex",justifyContent:"center",gap:18,marginBottom:20}}>
        {[0,1,2,3].map(i=>(<div key={i} style={{width:18,height:18,borderRadius:"50%",background:i<pin.length?accentColor:"#e2e8f0",transition:"background 0.15s"}}/>))}
      </div>
      {err&&<div style={{textAlign:"center",color:"#ef4444",marginBottom:12,fontSize:14,fontWeight:600}}>{errorMsg}</div>}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
        {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d,i)=>(
          d===""?<div key={i}/>:
          <button key={i} onClick={()=>d==="⌫"?del():append(d)}
            style={{background:d==="⌫"?"#fee2e2":"#f1f5f9",color:d==="⌫"?"#ef4444":"#374151",border:"none",borderRadius:12,padding:"18px 0",fontSize:d==="⌫"?20:22,fontWeight:700,cursor:"pointer"}}>
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── KidLoginScreen ─────────────────────────────────────────────────────────
function KidLoginScreen({api,onKidSuccess,onAdminSuccess,lang,setLang,kidName,kidEmoji}) {
  const t=T[lang];
  const [mode,setMode]=useState("choose"); // "choose" | "kid" | "admin"
  const [secsLeft,setSecsLeft]=useState(()=>{const s=loadLockout();return s.lockedUntil?Math.max(0,Math.ceil((s.lockedUntil-Date.now())/1000)):0;});
  const [failCount,setFailCount]=useState(()=>(loadLockout().count||0));
  useEffect(()=>{
    const id=setInterval(()=>{
      const s=loadLockout();
      const left=s.lockedUntil?Math.max(0,Math.ceil((s.lockedUntil-Date.now())/1000)):0;
      setSecsLeft(left); setFailCount(s.count||0);
    },1000);
    return()=>clearInterval(id);
  },[]);
  const isLocked=secsLeft>0;
  const fmtCountdown=s=>s>60?`${Math.ceil(s/60)}m`:` ${s}s`;
  const attemptsLeft=LOCK_MAX-((failCount)%LOCK_MAX||LOCK_MAX);
  const back=()=>setMode("choose");
  const hdrColor = mode==="admin" ? "linear-gradient(135deg,#ef4444,#dc2626)" : "linear-gradient(135deg,#6366f1,#8b5cf6)";
  return (
    <div style={{minHeight:"100vh",background:hdrColor,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Segoe UI',sans-serif",transition:"background 0.3s"}}>
      <div style={{position:"absolute",top:16,right:16}}><LangSwitcher lang={lang} setLang={setLang}/></div>
      <div style={{textAlign:"center",color:"#fff",marginBottom:36}}>
        <div style={{fontSize:64,marginBottom:8}}>⭐</div>
        <h1 style={{margin:"0 0 8px",fontSize:"clamp(22px,5vw,34px)",fontWeight:800}}>{t.appTitle}</h1>
        <p style={{margin:0,fontSize:"clamp(13px,3vw,17px)",opacity:0.85}}>
          {mode==="choose"?t.chooseProfile:t.kidLoginPrompt}
        </p>
      </div>

      {mode==="choose"&&(
        <div style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center"}}>
          <button onClick={()=>setMode("kid")} style={{background:"#fff",border:"none",borderRadius:20,padding:"28px 36px",cursor:"pointer",boxShadow:"0 8px 32px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,minWidth:120,transition:"transform 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <span style={{fontSize:44}}>{kidEmoji||"👧🏽"}</span>
            <span style={{fontWeight:700,fontSize:16,color:"#6366f1"}}>{kidName||t.kidProfile}</span>
          </button>
          <button onClick={()=>setMode("admin")} style={{background:"#fff",border:"none",borderRadius:20,padding:"28px 36px",cursor:"pointer",boxShadow:"0 8px 32px rgba(0,0,0,0.2)",display:"flex",flexDirection:"column",alignItems:"center",gap:10,minWidth:120,transition:"transform 0.15s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>
            <span style={{fontSize:44}}>🛡️</span>
            <span style={{fontWeight:700,fontSize:16,color:"#ef4444"}}>{t.adminProfile}</span>
          </button>
        </div>
      )}

      {(mode==="kid"||mode==="admin")&&(
        <div style={{background:"#fff",borderRadius:24,padding:"28px 24px",width:"min(300px,88vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
          {isLocked?(
            <div style={{textAlign:"center",padding:"12px 0"}}>
              <div style={{fontSize:40,marginBottom:12}}>🔒</div>
              <div style={{color:"#ef4444",fontWeight:700,fontSize:15,marginBottom:8}}>{t.lockedOut(fmtCountdown(secsLeft))}</div>
              <div style={{background:"#fee2e2",borderRadius:10,padding:"10px",fontSize:13,color:"#b91c1c"}}>
                {t.attemptsLeft(0)}
              </div>
            </div>
          ):(
            <>
              {failCount>0&&failCount%LOCK_MAX!==0&&<div style={{textAlign:"center",color:"#f59e0b",fontSize:12,fontWeight:600,marginBottom:8}}>{t.attemptsLeft(attemptsLeft)}</div>}
              <PinPad
                key={`${mode}-${secsLeft===0&&failCount}`}
                accentColor={mode==="admin"?"#ef4444":"#6366f1"}
                errorMsg={t.kidPinWrong}
                onVerify={pin=>{
                  if(mode==="kid") return api.verifyKidPin(pin).then(ok=>{
                    if(ok){recordLoginSuccess();localStorage.setItem("chore-stars-kid-auth","1");onKidSuccess();}
                    else{const s=recordLoginFail();setFailCount(s.count);if(s.lockedUntil)setSecsLeft(Math.ceil((s.lockedUntil-Date.now())/1000));}
                    return ok;
                  });
                  return api.verifyPin(pin).then(ok=>{
                    if(ok){recordLoginSuccess();onAdminSuccess();}
                    else{const s=recordLoginFail();setFailCount(s.count);if(s.lockedUntil)setSecsLeft(Math.ceil((s.lockedUntil-Date.now())/1000));}
                    return ok;
                  });
                }}
              />
            </>
          )}
          <button onClick={back} style={{marginTop:16,width:"100%",background:"none",border:"1.5px solid #e2e8f0",borderRadius:10,padding:"8px",cursor:"pointer",color:"#6b7280",fontSize:13,fontWeight:600}}>← {t.backBtn}</button>
        </div>
      )}

      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-8px)}40%,80%{transform:translateX(8px)}}`}</style>
    </div>
  );
}

// ── KidChangePinModal ──────────────────────────────────────────────────────
function KidChangePinModal({api,refresh,onClose}) {
  const t=useLang();
  const [step,setStep]=useState("new"); // "new" | "confirm"
  const [first,setFirst]=useState("");
  const [err,setErr]=useState(false);
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}>
      <div style={{background:"#fff",borderRadius:24,padding:"28px 24px",width:"min(300px,92vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:36,marginBottom:6}}>🔑</div>
          <h3 style={{margin:"0 0 4px",color:"#374151"}}>{t.changePinTitle}</h3>
          <p style={{margin:0,fontSize:13,color:"#6b7280"}}>{step==="new"?t.enterNewPin:t.confirmNewPin}</p>
        </div>
        {err&&<div style={{textAlign:"center",color:"#ef4444",marginBottom:8,fontSize:13,fontWeight:600}}>{t.pinMismatch}</div>}
        <PinPad
          key={step}
          accentColor="#6366f1"
          errorMsg={t.pinMismatch}
          onVerify={pin=>{
            if(step==="new"){setFirst(pin);setErr(false);setStep("confirm");return Promise.resolve(true);}
            if(pin===first){api.setKidPin(pin).then(()=>{refresh();onClose(t.pinChanged);});return Promise.resolve(true);}
            setErr(true);setTimeout(()=>{setErr(false);setStep("new");setFirst("");},800);return Promise.resolve(false);
          }}
        />
        <button onClick={onClose} style={{marginTop:16,width:"100%",background:"none",border:"1.5px solid #e2e8f0",borderRadius:10,padding:"8px",cursor:"pointer",color:"#6b7280",fontSize:13,fontWeight:600}}>{t.cancel}</button>
      </div>
    </div>
  );
}

// ── KidProfileModal ────────────────────────────────────────────────────────
const PROFILE_EMOJIS = ["👧🏻","👧🏼","👧🏽","👧🏾","👧🏿","👦🏻","👦🏼","👦🏽","👦🏾","👦🏿","🧒🏻","🧒🏼","🧒🏽","🧒🏾","🧒🏿","🌟","🦁","🐱","🐶","🦊","🐸","🐼","🦄","🌈","🍭"];
function KidProfileModal({kidName,kidEmoji,api,refresh,onClose}) {
  const t=useLang();
  const [name,setName]=useState(kidName||"");
  const [emoji,setEmoji]=useState(kidEmoji||"👧🏽");
  const save=async()=>{await api.setKidProfile({name:name.trim(),emoji});refresh();onClose(t.kidProfileSaved);};
  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200,padding:16}}>
      <div style={{background:"#fff",borderRadius:24,padding:"28px 24px",width:"min(340px,92vw)",boxShadow:"0 8px 40px rgba(0,0,0,0.25)"}}>
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:52,marginBottom:6,lineHeight:1}}>{emoji}</div>
          <h3 style={{margin:"0 0 4px",color:"#374151"}}>{t.kidProfileTitle}</h3>
        </div>
        <div style={{marginBottom:14}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:6}}>{t.kidNameLabel}</label>
          <input style={inp} value={name} onChange={e=>setName(e.target.value)} placeholder={t.kidNameLabel} maxLength={20}/>
        </div>
        <div style={{marginBottom:18}}>
          <label style={{fontSize:13,fontWeight:600,color:"#374151",display:"block",marginBottom:8}}>{t.kidEmojiLabel}</label>
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:8}}>
            {PROFILE_EMOJIS.map(e=><button key={e} onClick={()=>setEmoji(e)} style={{fontSize:24,background:emoji===e?"#eef2ff":"#f8fafc",border:`2px solid ${emoji===e?"#6366f1":"transparent"}`,borderRadius:10,padding:"4px 6px",cursor:"pointer",lineHeight:1}}>{e}</button>)}
          </div>
          <input style={inp} value={emoji} onChange={e=>setEmoji(e.target.value)} placeholder="or type any emoji" maxLength={8}/>
        </div>
        <div style={{display:"flex",gap:8}}>
          <button style={{...btn(),flex:1}} onClick={save}>{t.saveChore}</button>
          <button style={{...btn("#9ca3af"),flex:1}} onClick={()=>onClose()}>{t.cancel}</button>
        </div>
      </div>
    </div>
  );
}

// ── AdminSettings ──────────────────────────────────────────────────────────
function AdminSettings({api,refresh}) {
  const t=useLang();
  const [newPin,setNewPin]=useState("");
  const [flash,setFlash]=useState(null);
  const savePin=async()=>{
    if(!/^\d{4}$/.test(newPin))return;
    await api.setKidPin(newPin);
    setNewPin("");
    setFlash(t.kidPinSaved);
    setTimeout(()=>setFlash(null),2000);
    refresh();
  };
  return (
    <div style={card}>
      <h3 style={{margin:"0 0 8px"}}>{t.setKidPin}</h3>
      <p style={{margin:"0 0 14px",fontSize:13,color:"#6b7280"}}>{t.kidPinLabel}</p>
      {flash&&<div style={{background:"#10b981",color:"#fff",borderRadius:8,padding:"8px 12px",marginBottom:12,fontWeight:600,fontSize:13}}>{flash}</div>}
      <div style={{display:"flex",gap:8}}>
        <input type="password" inputMode="numeric" maxLength={4} value={newPin} onChange={e=>setNewPin(e.target.value.replace(/\D/g,""))} placeholder="••••" style={{...inp,letterSpacing:10,fontSize:22,textAlign:"center"}}/>
        <button style={btn()} onClick={savePin} disabled={!/^\d{4}$/.test(newPin)}>{t.saveKidPin}</button>
      </div>
    </div>
  );
}

// ── PinModal ───────────────────────────────────────────────────────────────
function PinModal({api,onSuccess,onCancel}) {
  const t=useLang(); const [pin,setPin]=useState(""); const [err,setErr]=useState(false);
  const check=async()=>{const ok=await api.verifyPin(pin);if(ok)onSuccess();else{setErr(true);setPin("");}};
  return (<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}><div style={{...card,width:"min(300px,90vw)",textAlign:"center",marginBottom:0}}><div style={{fontSize:40,marginBottom:8}}>🔐</div><h3 style={{margin:"0 0 16px"}}>{t.adminPin}</h3><input type="password" inputMode="numeric" maxLength={6} value={pin} onChange={e=>{setPin(e.target.value);setErr(false);}} onKeyDown={e=>e.key==="Enter"&&check()} placeholder={t.enterPin} style={{...inp,textAlign:"center",letterSpacing:8,fontSize:20,marginBottom:12}}/>{err&&<div style={{color:"#ef4444",marginBottom:8}}>{t.wrongPin}</div>}<div style={{display:"flex",gap:8,justifyContent:"center"}}><button style={btn()} onClick={check}>{t.unlock}</button><button style={btn("#9ca3af")} onClick={onCancel}>{t.cancel}</button></div><div style={{marginTop:12,fontSize:12,color:"#9ca3af"}}>{t.defaultPin}</div></div></div>);
}

function LangSwitcher({lang,setLang}) {
  return (<div style={{display:"flex",alignItems:"center",gap:6}}>{[{code:"en",flag:"🇬🇧"},{code:"pt",flag:"🇵🇹"}].map(({code,flag})=>(<button key={code} onClick={()=>setLang(code)} style={{background:lang===code?"rgba(255,255,255,.3)":"rgba(255,255,255,.1)",border:lang===code?"2px solid #fff":"2px solid transparent",borderRadius:8,padding:"4px 8px",cursor:"pointer",fontSize:18}}>{flag}</button>))}</div>);
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const [data,setData]=useState(loadData);
  const [view,setView]=useState("kid");
  const [showPin,setShowPin]=useState(false);
  const [unlocked,setUnlocked]=useState(false);
  const [lang,setLang]=useState(()=>localStorage.getItem("chore-stars-lang")||"en");
  const [kidLoggedIn,setKidLoggedIn]=useState(()=>localStorage.getItem("chore-stars-kid-auth")==="1");
  const [adminDirect,setAdminDirect]=useState(false);
  useEffect(()=>{localStorage.setItem("chore-stars-lang",lang);},[lang]);
  useEffect(()=>{const f=()=>setData(loadData());window.addEventListener("focus",f);return()=>window.removeEventListener("focus",f);},[]);
  const api=makeApi(data,setData);
  const refresh=useCallback(()=>setData(loadData()),[]);
  const t=T[lang];
  if(!kidLoggedIn&&!adminDirect){
    return (
      <LangCtx.Provider value={lang}>
        <KidLoginScreen
          api={api}
          onKidSuccess={()=>setKidLoggedIn(true)}
          onAdminSuccess={()=>{setAdminDirect(true);setUnlocked(true);setView("admin");}}
          lang={lang}
          setLang={setLang}
          kidName={data.kidName||""}
          kidEmoji={data.kidEmoji||"👧🏽"}
        />
      </LangCtx.Provider>
    );
  }
  return (
    <LangCtx.Provider value={lang}>
      <div style={{minHeight:"100vh",background:"#f8fafc",fontFamily:"'Segoe UI',sans-serif"}}>
        {showPin&&<PinModal api={api} onSuccess={()=>{setUnlocked(true);setShowPin(false);setView("admin");}} onCancel={()=>setShowPin(false)}/>}
        <div style={{background:"linear-gradient(135deg,#6366f1,#8b5cf6)",padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12}}>
          <div style={{color:"#fff",fontWeight:800,fontSize:"clamp(16px,4vw,22px)",whiteSpace:"nowrap"}}>⭐ {t.appTitle}</div>
          <div style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",justifyContent:"flex-end"}}>
            <LangSwitcher lang={lang} setLang={setLang}/>
            <div style={{width:1,height:28,background:"rgba(255,255,255,.3)"}}/>
            <button style={{...btn(view==="kid"?"#fff":"rgba(255,255,255,.25)",view==="kid"?"#6366f1":"#fff")}} onClick={()=>setView("kid")}>{data.kidEmoji||"👧🏽"} {data.kidName||t.kidTab}</button>
            <button style={{...btn(view==="admin"?"#fff":"rgba(255,255,255,.25)",view==="admin"?"#6366f1":"#fff")}} onClick={()=>{if(unlocked)setView("admin");else setShowPin(true);}}>🛡️ {t.adminTab}</button>
            <button style={{...btn("rgba(255,255,255,.15)","#fff"),fontSize:11,padding:"6px 10px"}} onClick={()=>{localStorage.removeItem("chore-stars-kid-auth");setKidLoggedIn(false);setAdminDirect(false);setUnlocked(false);setView("kid");}}>🚪 {t.kidLogout}</button>
          </div>
        </div>
        <div style={{maxWidth:"100%",padding:"16px"}}>
          <div style={{maxWidth:640,margin:"0 auto"}}>
            {view==="kid"?<KidPanel data={data} api={api} refresh={refresh}/>:<AdminPanel data={data} api={api} refresh={refresh} onLock={()=>{setUnlocked(false);setAdminDirect(false);setView("kid");}}/>}
          </div>
        </div>
      </div>
    </LangCtx.Provider>
  );
}