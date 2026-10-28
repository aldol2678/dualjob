
'use strict';
(()=>{
// UI pilot 01. Embedded assets keep this file offline and saves free of image data.
const UI_SYMBOLS = {"health": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#f57591\" d=\"M16 27C12 24 4 18 4 11a7 7 0 0 1 12-4 7 7 0 0 1 12 4c0 7-8 13-12 16Z\"/><path d=\"M8 11q1-4 5-2\" fill=\"none\" stroke=\"#ffe5d2\" stroke-width=\"2.5\"/></g></svg>", "attack": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#e4f5ee\" d=\"m12 21 1-8L25 4l3 3-9 12-7 2Z\"/><path d=\"m15 18 9-10\" stroke=\"#65cbbf\" stroke-width=\"2\"/><path d=\"m8 17 7 7M6 26l6-6\" fill=\"none\" stroke=\"#f4c56f\" stroke-width=\"4\"/><path d=\"m5 25 2 2\" stroke=\"#f4c56f\" stroke-width=\"4\"/></g></svg>", "block": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#6ed1c7\" d=\"M16 3 27 7v8c0 7-7 12-11 14C12 27 5 22 5 15V7Z\"/><path fill=\"#b5ede0\" stroke=\"none\" d=\"M16 7v17c-5-3-8-7-8-10V9Z\"/><path fill=\"#f5ce82\" d=\"m16 10 4 5-4 6-4-6Z\"/></g></svg>", "energy": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#ffd274\" d=\"m18 3-13 16h9l-1 10L28 12h-10l3-9Z\"/><path d=\"m17 8-6 8h6\" fill=\"none\" stroke=\"#fff0c5\" stroke-width=\"2\"/></g></svg>", "curse": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#c398ee\" d=\"M10 16h12v10H10Z\"/><path fill=\"#f2d89e\" d=\"M16 3c4 5 6 7 4 10-2 3-7 2-8 0-2-3 1-6 4-10Z\"/><path d=\"M7 27h18M13 18v4\" fill=\"none\" stroke=\"#edd9ff\" stroke-width=\"2.5\"/></g></svg>"};
const UI_PORTRAITS = {"enemy_clerk":"assets/asset-4c415c538bda9da1.webp","enemy_minion":"assets/asset-7b996364e449a385.webp","hero_chef_warlock":"assets/asset-17f12608f034ae40.webp","hero_accountant_warlock":"assets/asset-70682a3db947e514.webp","hero_accountant_alchemist":"assets/asset-b410910e08a0b50f.webp","hero_chef_alchemist":"assets/asset-950bc127d00e4e6e.webp","enemy_healer":"assets/asset-76a9a79213815573.webp","enemy_ghost":"assets/asset-2724e38724810a26.webp","enemy_golem":"assets/asset-eb2560a375e2f206.webp","enemy_wraith":"assets/asset-69d8f6064058e690.webp","enemy_boss":"assets/asset-7fd1c796f7e3937d.webp"};
Object.assign(UI_SYMBOLS,{"debt": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#f6dfac\" d=\"M6 3h16v25l-4-2-4 2-4-2-4 2Z\"/><path d=\"M10 8h8M10 12h6M10 16h4\" stroke=\"#96704f\"/><circle cx=\"23\" cy=\"22\" r=\"6\" fill=\"#f3b957\"/><path d=\"M23 19v6M21 20h3M22 24h3\" stroke=\"#76502d\"/></g></svg>", "ingredient": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#78cb83\" d=\"m19 12-2-8 4 2 2-4 2 5 4-1-4 8Z\"/><path fill=\"#f7a24e\" d=\"M19 10c-5 2-13 12-14 17 5-1 15-8 18-13Z\"/><path d=\"m16 14 3 2M11 19l3 2\" stroke=\"#b76a3c\"/><path d=\"m20 8 2 4\" stroke=\"#438760\"/></g></svg>", "reagent": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#d9edec\" d=\"M12 5h8v8l8 13c1 2-1 3-3 3H7c-2 0-4-1-3-3l8-13Z\"/><path fill=\"#70d8d2\" d=\"M9 20h14l4 7H5Z\"/><rect x=\"11\" y=\"2\" width=\"10\" height=\"5\" rx=\"2\" fill=\"#cf9f6d\"/><path d=\"m13 15-3 5\" stroke=\"#fff5db\" stroke-width=\"2.4\"/><circle cx=\"18\" cy=\"23\" r=\"1.4\" fill=\"#e2ffed\" stroke=\"none\"/></g></svg>", "fatigue": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#a7b3e5\" d=\"M19 4C10 3 4 9 5 18c1 8 11 13 18 7-10 0-15-12-4-21Z\"/><path d=\"M21 8h7l-7 7h7\" fill=\"none\" stroke=\"#cfb2ef\" stroke-width=\"2.5\"/></g></svg>", "overtime": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M22 12h3c6 0 6 9 0 9h-3\" fill=\"none\" stroke=\"#eed9b0\" stroke-width=\"3\"/><path fill=\"#f5dfb7\" d=\"M4 11h19v10c0 5-19 5-19 0Z\"/><path d=\"M7 28h18\" stroke=\"#baa083\" stroke-width=\"2.5\"/><path d=\"M8 7V3M14 7V2\" stroke=\"#bcb1d3\"/><circle cx=\"23\" cy=\"23\" r=\"7\" fill=\"#e6ac68\"/><path d=\"M23 19v4l3 2\" fill=\"none\"/></g></svg>", "draw": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"8\" width=\"16\" height=\"21\" rx=\"3\" fill=\"#9580b8\"/><rect x=\"8\" y=\"4\" width=\"16\" height=\"21\" rx=\"3\" fill=\"#eddcb7\"/><path fill=\"#bc91de\" d=\"m16 8 5 7-5 7-5-7Z\"/><path d=\"M27 15V3m-4 4 4-4 3 4\" stroke=\"#91dfd4\" stroke-width=\"2.6\" fill=\"none\"/></g></svg>", "heal": "<svg class=\"ui-symbol\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"><g stroke=\"#271638\" stroke-width=\"1.8\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path fill=\"#79d6a5\" d=\"M16 28 5 17C-3 8 9 1 16 9 23 1 35 8 27 17Z\"/><path d=\"M16 12v10M11 17h10\" stroke=\"#effde7\" stroke-width=\"3.3\"/></g></svg>"});
function statIcon(kind,fallback=''){
 const key={hpLoss:'health',scaleCurse:'curse',scaleDebt:'debt',scaleIng:'ingredient',scaleRea:'reagent',fatigueGauge:'fatigue'}[kind]||kind;
 return UI_SYMBOLS[key]||esc(fallback);
}
const PORTRAIT_VIEWS={"enemy_clerk":"29 38 205 174","enemy_minion":"63 40 133 184","hero_chef_warlock":"36 19 181 220","hero_accountant_warlock":"29.5 23 194 217.5","hero_accountant_alchemist":"32.5 11.5 188 237.5","hero_chef_alchemist":"53.5 8.5 155 241.5","enemy_healer":"27 25.5 210.5 212.5","enemy_ghost":"30.5 10 200.5 236","enemy_golem":"9.5 23.5 239 217.5","enemy_wraith":"38.5 3.5 185.5 248.5","enemy_boss":"21.5 4.5 216.5 247"};
function portraitMarkup(id){return UI_PORTRAITS[id]?`<svg class="game-portrait" data-asset="${id}" viewBox="${PORTRAIT_VIEWS[id]}" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg"><image href="${UI_PORTRAITS[id]}" x="0" y="0" width="256" height="256"/></svg>`:''}
function enemyPortrait(e){return portraitMarkup('enemy_'+e.id)||esc(e.icon)}

const KEY='dualJobRun_v06', METAKEY='dualJobMeta_v06', PREV_METAKEYS=[['dualJobMeta_v05C22','v0.5-C2.2'],['dualJobMeta_v05C21','v0.5-C2.1'],['dualJobMeta_v05C2','v0.5-C2'],['dualJobMeta_v05C1','v0.5-C1']];
const IMPORT_SOURCES=[{key:'dualJobRun_v05C22',label:'v0.5-C2.2'},{key:'dualJobRun_v05C21',label:'v0.5-C2.1'},{key:'dualJobRun_v05C2',label:'v0.5-C2'},{key:'dualJobRun_v05C1',label:'v0.5-C1'},{key:'dualJobRun_v01',label:'v0.4.1'}]; // 이전 버전 읽기 전용
const jobs={
 accountant:{name:'회계사',icon:'🧮',desc:'장부·미수금·방어',kind:'현실',tag:'금융'},
 chef:{name:'요리사',icon:'👩‍🍳',desc:'재료·회복·화력',kind:'현실',tag:'조리'},
 warlock:{name:'흑마법사',icon:'🧙',desc:'저주·흡혈·금단 계약',kind:'판타지',tag:'암흑'},
 alchemist:{name:'연금술사',icon:'⚗️',desc:'시약·변환·연금 폭발',kind:'판타지',tag:'연금'}
};
const pairs={
 'accountant-warlock':{name:'영혼세무사',icon:'📜',passive:'겸직 자동 발동: 미수금 +2 · 저주 +1 · 방어 +5',flavor:'생전 세금은 사후에도 징수된다.',sig:'hellTax'},
 'accountant-alchemist':{name:'황금회계사',icon:'💰',passive:'겸직 자동 발동: 미수금 +2 · 시약 +2 · 방어 +5',flavor:'세상의 모든 비용은 황금으로 전환된다.',sig:'goldAudit'},
 'chef-warlock':{name:'지옥주방장',icon:'🍖',passive:'겸직 자동 발동: 재료 +1 · 저주 +2 · 체력 2 회복',flavor:'오늘의 특선은 저주받은 스테이크.',sig:'infernalMenu'},
 'chef-alchemist':{name:'마도셰프',icon:'🍲',passive:'겸직 자동 발동: 재료 +1 · 시약 +1 · 카드 1장',flavor:'재료와 시약의 경계가 사라진다.',sig:'grandFeast'}
};
const cards={
 ledger:{name:'전표 정리',family:'real',job:'accountant',icon:'🧾',cost:1,desc:'방어 6. 미수금 +2.',effect:'ledger'},
 audit:{name:'추심 통지',family:'real',job:'accountant',icon:'📨',cost:1,desc:'피해 6. 미수금 +1.',effect:'audit'},
 balance:{name:'대차대조',family:'real',job:'accountant',icon:'📊',cost:1,desc:'방어 4. 카드 1장 뽑기.',effect:'balance'},
 receipt:{name:'영수증 더미',family:'real',job:'accountant',icon:'🧻',cost:0,desc:'미수금 +1. 카드 1장 뽑기.',effect:'receipt'},
 collect:{name:'미수금 회수',family:'real',job:'accountant',icon:'💸',cost:1,desc:'피해 5 + 미수금×3. 미수금 소모.',effect:'collect'},
 chop:{name:'재료 손질',family:'real',job:'chef',icon:'🔪',cost:1,desc:'피해 6. 재료 +1.',effect:'chop'},
 broth:{name:'육수 끓이기',family:'real',job:'chef',icon:'🍵',cost:1,desc:'방어 6. 재료 +1.',effect:'broth'},
 taste:{name:'간 보기',family:'real',job:'chef',icon:'🥄',cost:0,desc:'재료 +1. 카드 1장 뽑기.',effect:'taste'},
 lunch:{name:'특제 도시락',family:'real',job:'chef',icon:'🍱',cost:1,desc:'방어 4. 재료 최대 2개를 소모해 체력 4+소모량×2 회복.',effect:'lunch'},
 flambe:{name:'화염 불쇼',family:'real',job:'chef',icon:'🔥',cost:2,desc:'피해 12 + 소모 재료×3. 재료 최대 2개 소모.',effect:'flambe'},
 curse:{name:'저주 계약',family:'fantasy',job:'warlock',icon:'🕯️',cost:1,desc:'피해 5. 저주 +2.',effect:'curse'},
 drain:{name:'검은 손길',family:'fantasy',job:'warlock',icon:'🖐️',cost:1,desc:'피해 7. 체력 2 회복.',effect:'drain'},
 soul:{name:'영혼 거래',family:'fantasy',job:'warlock',icon:'🩸',cost:0,desc:'체력 3 소모. 에너지 +1. 카드 1장 뽑기.',effect:'soul'},
 veil:{name:'심연 장막',family:'fantasy',job:'warlock',icon:'🌑',cost:1,desc:'방어 6. 저주 +1.',effect:'veil'},
 night:{name:'밤의 파동',family:'fantasy',job:'warlock',icon:'🦇',cost:2,desc:'피해 10 + 저주×3. 저주 유지.',effect:'night'},
 extract:{name:'시약 채집',family:'fantasy',job:'alchemist',icon:'🧪',cost:0,desc:'시약 +1. 카드 1장 뽑기.',effect:'extract'},
 blast:{name:'연금 폭발',family:'fantasy',job:'alchemist',icon:'💥',cost:1,desc:'피해 9 + 소모 시약×4. 시약 최대 2개 소모.',effect:'blast'},
 transmute:{name:'변환식',family:'fantasy',job:'alchemist',icon:'🔷',cost:1,desc:'방어 6. 시약 +1.',effect:'transmute'},
 catalyst:{name:'촉매 주입',family:'fantasy',job:'alchemist',icon:'⚛️',cost:1,desc:'시약 +2. 카드 1장 뽑기.',effect:'catalyst'},
 elixir:{name:'증류 응급약',family:'fantasy',job:'alchemist',icon:'🧴',cost:1,desc:'체력 5+소모 시약×2 회복. 시약 최대 2개 소모.',effect:'elixir'},
 hellTax:{name:'지옥의 세무조사',family:'fusion',job:'fusion',icon:'⚖️',cost:2,desc:'피해 8+미수금×4, 저주 +2. 미수금 전부 소모.',effect:'hellTax'},
 goldAudit:{name:'현자의 손익계산',family:'fusion',job:'fusion',icon:'🪙',cost:2,desc:'피해 8+소모 시약×5. 미수금 +2, 방어 4. 시약 최대 2개 소모.',effect:'goldAudit'},
 infernalMenu:{name:'금단의 풀코스',family:'fusion',job:'fusion',icon:'🍖',cost:2,desc:'피해 10+소모 재료×4. 저주 +2, 체력 3 회복. 재료 최대 3개 소모.',effect:'infernalMenu'},
 grandFeast:{name:'연금 연회',family:'fusion',job:'fusion',icon:'🥘',cost:2,desc:'피해 9+소모 자원×3. 체력 5 회복. 재료·시약 각 최대 2 소모.',effect:'grandFeast'},
 strike:{name:'정시 퇴근 시도',family:'neutral',job:'neutral',icon:'📁',cost:1,desc:'피해 8.',effect:'strike'},
 guard:{name:'업무 분장',family:'neutral',job:'neutral',icon:'🛡️',cost:1,desc:'방어 9.',effect:'guard'},
 hustle:{name:'칼퇴 프로젝트',family:'neutral',job:'neutral',icon:'⚡',cost:1,desc:'카드 2장 뽑기. 에너지 +1.',effect:'hustle'},

 closeBooks:{name:'결산 마감',family:'real',job:'accountant',icon:'📑',cost:1,desc:'미수금 +3. 카드 1장 뽑기.',effect:'closeBooks'},
 surpriseAudit:{name:'불시 감사',family:'real',job:'accountant',icon:'🔍',cost:2,desc:'모든 적에게 피해 4와 미수금 +2.',effect:'surpriseAudit'},
 riskHedge:{name:'위험 헤지',family:'real',job:'accountant',icon:'🏦',cost:1,desc:'방어 8. 선택한 적의 미수금이 4 이상이면 방어 +4.',effect:'riskHedge'},
 pantry:{name:'비밀 식자재',family:'real',job:'chef',icon:'🥕',cost:1,desc:'재료 +2. 카드 1장 뽑기.',effect:'pantry'},
 hotMeal:{name:'뜨끈한 식사',family:'real',job:'chef',icon:'🍛',cost:1,desc:'재료 최대 2 소비, 체력 6+소모×3 회복.',effect:'hotMeal'},
 spiceStorm:{name:'향신료 폭풍',family:'real',job:'chef',icon:'🌶️',cost:2,desc:'모든 적에게 피해 7+소모 재료×2. 재료 최대 2 소비.',effect:'spiceStorm'},
 darkBargain:{name:'망자의 계약',family:'fantasy',job:'warlock',icon:'📕',cost:0,desc:'체력 3 지불. 카드 2장 뽑기.',effect:'darkBargain'},
 contagion:{name:'저주 전염',family:'fantasy',job:'warlock',icon:'🕸️',cost:1,desc:'대상에게 저주 +2, 다른 모든 적에게 저주 +1.',effect:'contagion'},
 eclipse:{name:'검은 일식',family:'fantasy',job:'warlock',icon:'🌘',cost:2,desc:'모든 적에게 피해 5+각 대상의 저주×2.',effect:'eclipse'},
 distill:{name:'연금 증류',family:'fantasy',job:'alchemist',icon:'⚗️',cost:1,desc:'시약 +2. 방어 4.',effect:'distill'},
 flashFlask:{name:'속성 플라스크',family:'fantasy',job:'alchemist',icon:'🧫',cost:1,desc:'피해 6. 시약 2 이상 보유 시 추가 피해 5 (소비하지 않음).',effect:'flashFlask'},
 chainReaction:{name:'연쇄 폭발',family:'fantasy',job:'alchemist',icon:'☄️',cost:2,desc:'시약 최대 2 소비. 모든 적에게 피해 9+소모×3.',effect:'chainReaction'},
 fatigue:{name:'피로 카드',family:'neutral',job:'neutral',icon:'🥱',cost:99,desc:'사용 불가. 손패 한 칸을 차지하는 방해 카드.',effect:'fatigue'}
};
const SELF_CARDS=new Set(['balance','broth','taste','lunch','soul','extract','transmute','catalyst','elixir','guard','hustle','riskHedge','pantry','hotMeal','darkBargain','distill']);
const targetMode=id=>SELF_CARDS.has(id)?'self':'enemy';
const initialDeck={
 accountant:['ledger','ledger','audit','balance','receipt','collect'],
 chef:['chop','chop','broth','taste','lunch'],
 warlock:['curse','curse','drain','veil','soul'],
 alchemist:['extract','blast','transmute','transmute','catalyst']
};
// Presentation-only floor data: saved stage numbers and route choices stay compatible.
const rooms=[
 {label:'출입 심사대',desc:'출입증은 발급됐다. 퇴실증은 아직 개발 중이다.'},
 {label:'서류 보관실',desc:'문서는 보관되지만 담당자는 잊힌다.'},
 {label:'복사실',desc:'종이가 걸렸다. 누군가의 퇴근도 함께 걸렸다.'},
 {label:'사내 복지층',desc:'휴식도 구매도 자유다. 마감 시간만 그대로다.'},
 {label:'계약 심사부',desc:'작은 글씨일수록 큰 대가가 적혀 있다.',speaker:'인사부장 · 사내 방송',line:'두 직업을 겸한다니, 업무도 두 배면 되겠군요.'},
 {label:'결산실',desc:'장부를 닫아야 하루가 끝난다. 장부가 계속 늘어난다.'},
 {label:'야근 전용층',desc:'창밖은 밤이다. 사내 시계만 오후 여섯 시 전이다.'},
 {label:'인사 대기실',desc:'호출 벨이 울린다. 사표를 다시 확인한다.',speaker:'인사부장 · 면담 통지',line:'퇴사 사유는 직접 듣겠습니다. 살아서 올라오세요.'},
 {label:'인사부장실',desc:'마지막 결재자는 사표 대신 무기를 들었다.',speaker:'인사부장 마왕',line:'이 문을 나가고 싶다면, 먼저 저를 설득하시죠.'}
].map((r,i)=>({...r,type:i===8?'boss':'map'}));
const FLOOR_DECISIONS={
 5:{title:'📑 결산 처리',desc:'지난 미수금을 지금 정산하거나 다음 전투 보상으로 이월할 수 있어.',options:[['지금 정산','즉시 +12G'],['다음 실적에 이월','다음 전투 승리 시 +28G · 지속 피로 +1']]},
 6:{title:'🌙 야근 결재',desc:'성과급을 위해 추가 근무할까, 회복 시간을 확보할까?',options:[['야근 수당 신청','즉시 +26G · 지속 피로 +2'],['퇴근권 사용','체력 8 회복']]}
};
function floorDecisionPending(level=state.stage){return !!FLOOR_DECISIONS[level]&&!Object.hasOwn(state.floorDecisions||{},level)}
function takeFloorDecision(level,choice){
 if(!state||state.phase!=='map'||state.stage!==level||!FLOOR_DECISIONS[level]||!Number.isInteger(choice)||choice<0||choice>1||!floorDecisionPending(level))return false;
 state.floorDecisions=state.floorDecisions||{};state.floorDecisions[level]=choice;
 if(level===5){if(choice===0)state.gold+=12;else{state.deferredBonus=28;state.workFatigue=Math.min(6,(state.workFatigue||0)+1)}}
 if(level===6){if(choice===0){state.gold+=26;state.workFatigue=Math.min(6,(state.workFatigue||0)+2)}else state.hp=Math.min(state.maxHp,state.hp+8)}
 log(level===5?(choice===0?'📑 미수금 정산 +12G':'📑 이월 승인 · 다음 승리 +28G'):(choice===0?'🌙 야근 수당 +26G · 피로 +2':'🏠 퇴근권 사용 · 체력 회복'));
 save();render();return true;
}
const ENCOUNTERS={
 intake:{ids:['clerk','minion'],name:'누락 서류 접수',hint:'서류 정령부터 줄일지, 슬라임을 몰아칠지 선택해.'},
 archive:{ids:['clerk','healer'],name:'보호 중인 서류',hint:'주술사가 동료를 보호해. 보호자를 먼저 노려 봐.'},
 overtime:{ids:['ghost','clerk','minion'],name:'야근 인수인계',hint:'망령의 야근 예고를 확인하고 피로 카드에 대비해.'},
 watch:{ids:['ghost','healer'],name:'야근 당직조',hint:'보호자를 먼저 잡을까, 야근 예고부터 끊을까?'},
 contract:{ids:['wraith','ghost','minion'],name:'끝나지 않는 계약',hint:'계약서 악령의 공격과 망령의 야근 예고를 함께 살펴봐.'},
 review:{ids:['wraith','healer','minion'],name:'계약 보호반',hint:'주술사의 보호를 끊어 악령에게 피해를 집중해.'},
 copier:{ids:['golem','healer','minion'],name:'복사실 안전 점검',hint:'골렘이 충전하는 동안 보호자를 처리하거나 방어를 준비해.'},
 nightShift:{ids:['golem','ghost'],name:'심야 복사 작업',hint:'강타와 야근 예고가 겹쳐. 다음 턴 방어와 집중 공격을 준비해.'},
 interview:{ids:['boss','healer','minion'],name:'퇴사 면담',hint:'마왕을 보호하는 주술사와 보조 정령부터 살펴봐.'}
};
function encounterPool(stage,type){
 if(type==='boss')return ['interview'];
 if(type==='elite')return stage>=4?['copier','nightShift']:['copier'];
 if(stage===0)return ['intake']; // First battle stays fixed for the tutorial.
 if(stage===1)return ['intake','archive'];
 if(stage<4)return ['overtime','watch'];
 return stage===6?['contract','watch']:['contract','review'];
}
function routeHint(type,stage){
 if(!['battle','elite','boss'].includes(type))return routeNotes[type];
 const choices=encounterPool(stage,type);
 return choices.length===1?ENCOUNTERS[choices[0]].name+' · '+routeNotes[type]:choices.map(id=>ENCOUNTERS[id].name).join(' / ')+' 중 조우';
}
const enemies={
 minion:{name:'보조 서류 정령',icon:'📎',maxHp:20,attack:5,flavor:'보조 업무를 수행한다.'},
 healer:{name:'고블린 주술사',icon:'🧙',maxHp:23,attack:6,flavor:'동료를 보호한다.'},
 clerk:{name:'서류 슬라임',icon:'🫠',maxHp:32,attack:8,flavor:'고객님의 서류가 누락되었습니다.'},
 ghost:{name:'야근 망령',icon:'👻',maxHp:35,attack:9,flavor:'퇴근은 존재하지 않아...'},
 golem:{name:'복사기 골렘',icon:'🗿',maxHp:63,attack:12,flavor:'종이가 걸렸습니다. 다시 시도하세요.'},
 wraith:{name:'계약서 악령',icon:'🦹',maxHp:48,attack:11,flavor:'작은 글씨도 끝까지 읽으셔야죠.'},
 boss:{name:'인사부장 마왕',icon:'👹',maxHp:100,attack:14,flavor:'면담 좀 합시다. 야근 수당은 없습니다.'}
};
const relics={
 overtimeClock:{name:'야근 시계',icon:'⌚',rarity:'일반',desc:'매 턴 처음 사용하는 현실 카드 비용 -1 (최소 0).',price:45},
 manaAmp:{name:'마력 증폭기',icon:'🔮',rarity:'일반',desc:'매 턴 첫 판타지 공격 카드의 피해 +3.',price:46},
 ledgerBeyond:{name:'저승의 장부',icon:'📗',rarity:'희귀',desc:'매 턴 처음 미수금 회수 시 소모한 미수금의 절반(내림)을 재부여.',price:72},
 infinitePot:{name:'무한 냄비',icon:'🍯',rarity:'희귀',desc:'전투당 처음 소비한 재료를 최대 2개 환급.',price:70},
 dualContract:{name:'이중계약서',icon:'📜',rarity:'전설',desc:'겸직이 자동 발동하면 에너지 +1, 카드 1장 추가 드로우 (턴당 1회).',price:95},
 lunchVoucher:{name:'출근 도시락',icon:'🍱',rarity:'일반',desc:'매 전투 시작 시 방어 6 획득.',price:45},
 copperBuckle:{name:'튼튼한 사원증',icon:'🪪',rarity:'일반',desc:'획득 시 최대 체력과 현재 체력 +8.',price:48},
 paydayCoupon:{name:'성과급 봉투',icon:'💌',rarity:'일반',desc:'전투 승리 시 급여 +10G.',price:50},
 glassRetort:{name:'균열난 증류기',icon:'🧪',rarity:'희귀',desc:'매 턴 처음 시약을 소비하는 공격 카드의 피해 +4.',price:69},
 protectiveApron:{name:'방호 앞치마',icon:'🦺',rarity:'일반',desc:'매 턴 처음 자신을 대상으로 한 카드 사용 시 체력 2 회복.',price:51},
 ravenFeather:{name:'까마귀 깃촉',icon:'🪶',rarity:'희귀',desc:'전투당 처음 저주 걸린 적을 처치하면 체력 4 회복.',price:74},
 severancePackage:{name:'최후의 퇴직금',icon:'👑',rarity:'전설',desc:'도전당 처음 치명타를 받으면 HP 20으로 부활하고 방어 12 획득.',price:98}
};
const relicKeys=Object.keys(relics);

// v0.6.21: one career course per NEW run. Legacy runs keep revision 20 rules.
const TRAINING={
 enforcement:{pair:'accountant-warlock',name:'강제집행',desc:'턴당 첫 미수금 소비 공격: 소비량×2, 최대 +4 피해. 처치하면 다른 적에게 미수금 최대 2 이전.',cards:['collect','hellTax']},
 posthumous:{pair:'accountant-warlock',name:'사후징수',desc:'턴 종료: 미수금 3 이상·저주가 있는 적의 미수금 1 → 저주 +1·방어 +4. 턴당 1회.',cards:['ledger','curse','night']},
 cashflow:{pair:'accountant-alchemist',name:'현금흐름',desc:'턴당 첫 시약 소비 카드: 시약 1 환급·적 하나에게 미수금 +1.',cards:['blast','goldAudit','elixir']},
 investment:{pair:'accountant-alchemist',name:'장기투자',desc:'턴 종료에 시약 3 이상: 시약 1 → 방어 +5·적 하나에게 미수금 +2. 턴당 1회.',cards:['catalyst','distill','riskHedge']},
 fermentation:{pair:'chef-warlock',name:'저주 숙성',desc:'턴당 첫 재료 소비 카드: 모든 생존 적에게 저주 +1. 한 명만 남았다면 저주 +2.',cards:['lunch','hotMeal','eclipse']},
 furnace:{pair:'chef-warlock',name:'지옥 화덕',desc:'턴당 첫 재료 소비 공격: 주 대상에게 소비량×2, 최대 +6 피해. 그 카드의 회복량 −2 (최소 0).',cards:['flambe','infernalMenu','spiceStorm']},
 course:{pair:'chef-alchemist',name:'코스 요리',desc:'현실↔판타지 연속 사용: 방어 +4·이번 턴 다음 융합 공격 +4. 턴당 1회. 공용·융합은 연결을 끊어요.',cards:['taste','extract','grandFeast']},
 molecular:{pair:'chef-alchemist',name:'분자요리',desc:'턴당 첫 자원 소비 카드: 재료만 소비 → 시약 +1, 시약만 소비 → 재료 +1, 둘 다 소비 → 방어 +4.',cards:['lunch','blast','grandFeast']}
};
const freshTrainingTurn=()=>({used:false,lastFamily:null,fusionReady:false});
function trainingFor(s){return s?.contentRevision===21&&Object.hasOwn(TRAINING,s.trainingId)&&TRAINING[s.trainingId].pair===s.real+'-'+s.fantasy?TRAINING[s.trainingId]:null}
function trainingOptions(s=state){return Object.keys(TRAINING).filter(id=>TRAINING[id].pair===s.real+'-'+s.fantasy)}
function validTrainingSave(x){
 if(x.contentRevision!==undefined&&![20,21].includes(x.contentRevision))return false;
 if(x.contentRevision!==21)return x.phase!=='training';
 const t=x.trainingTurn;
 if(!t||typeof t!=='object'||Array.isArray(t)||typeof t.used!=='boolean'||typeof t.fusionReady!=='boolean'||![null,'real','fantasy'].includes(t.lastFamily))return false;
 if(x.trainingId!==null&&!trainingFor(x))return false;
 if(x.phase==='training'&&(x.stage!==3||x.trainingId!==null))return false;
 if(x.stage>=3&&x.trainingId===null&&x.phase!=='training')return false;
 return true;
}
function chooseTraining(id){
 if(state?.phase!=='training'||state.stage!==3||state.contentRevision!==21||state.trainingId!==null||!trainingOptions().includes(id))return false;
 state.trainingId=id;state.trainingTurn=freshTrainingTurn();state.phase='map';trainingChoice=null;
 log('🎓 전문교육 완료 · '+TRAINING[id].name);save();render();return true;
}
function trainingTarget(s,preferred=-1){
 if(s.enemies?.[preferred]?.hp>0)return preferred;
 let best=-1;for(let i=0;i<(s.enemies||[]).length;i++)if(s.enemies[i].hp>0&&(best<0||s.enemies[i].hp>s.enemies[best].hp))best=i;
 return best;
}
// Spending is captured BEFORE any relic refund; a course can never trigger itself.
let trainingCard=null;
function spendResource(key,n){const spent=Math.min(n,state[key]);state[key]-=spent;if(trainingCard)trainingCard.spent[key]+=spent;return spent}
function spendDebt(e){const n=e.debt||0;e.debt=0;if(trainingCard)trainingCard.spent.debt+=n;return n}
function trainingDamageBonus(e){
 const c=trainingCard,t=state.trainingTurn;if(!c||!trainingFor(state)||state.enemies[c.target]!==e||c.bonusApplied)return 0;
 let bonus=0;
 if(state.trainingId==='enforcement'&&!t.used&&c.spent.debt>0){bonus=Math.min(4,c.spent.debt*2);c.enforcement=true;t.used=true}
 if(state.trainingId==='furnace'&&!t.used&&c.spent.ingredient>0){bonus=Math.min(6,c.spent.ingredient*2);c.furnace=true;t.used=true}
 if(state.trainingId==='course'&&t.fusionReady&&cards[c.id].family==='fusion'){bonus=4;t.fusionReady=false}
 if(bonus){c.bonusApplied=true;log('🎓 '+trainingFor(state).name+' · 추가 피해 '+bonus)}
 return bonus;
}
function addTrainingDebt(i,n){if(i<0)return;const old=state.targetIndex;state.targetIndex=i;ensureTarget();debt(n);state.targetIndex=old;ensureTarget()}
function afterTrainingCard(c){
 if(!trainingFor(state))return;
 const t=state.trainingTurn,id=state.trainingId,spent=c.spent;
 if(c.enforcement&&state.enemies[c.target]?.hp<=0)addTrainingDebt(trainingTarget(state),Math.min(2,spent.debt));
 if(!t.used&&id==='cashflow'&&spent.reagent>0){t.used=true;reagent(1);addTrainingDebt(trainingTarget(state,c.target),1);log('🎓 현금흐름 · 시약 환급')}
 if(!t.used&&id==='fermentation'&&spent.ingredient>0){t.used=true;const n=livingEnemies().length===1?2:1;forEachEnemy(()=>curse(n));log('🎓 저주 숙성 · 저주 확산')}
 if(!t.used&&id==='molecular'&&(spent.ingredient>0||spent.reagent>0)){
  t.used=true;if(spent.ingredient>0&&spent.reagent>0)gainBlock(4);else if(spent.ingredient>0)reagent(1);else ingredient(1);log('🎓 분자요리 · 자원 교환');
 }
 if(id==='course'){
  const f=cards[c.id].family;
  if(!t.used&&['real','fantasy'].includes(f)&&t.lastFamily&&t.lastFamily!==f){t.used=true;t.fusionReady=true;gainBlock(4);log('🎓 코스 완성 · 이번 턴 다음 융합 공격 +4')}
  t.lastFamily=['real','fantasy'].includes(f)?f:null;
 }
}
// Pure choice + state-only application is shared by turn forecast and execution.
function applyTrainingEnd(s){
 if(!trainingFor(s)||s.trainingTurn.used)return null;
 let i=-1,block=0;
 if(s.trainingId==='posthumous'){
  for(let j=0;j<(s.enemies||[]).length;j++){const e=s.enemies[j];if(e.hp>0&&e.debt>=3&&e.curse>0&&(i<0||e.debt>s.enemies[i].debt))i=j}
  if(i<0)return null;s.enemies[i].debt--;s.enemies[i].curse=Math.min(30,s.enemies[i].curse+1);block=4;
 }else if(s.trainingId==='investment'){
  i=trainingTarget(s);if(s.reagent<3||i<0)return null;s.reagent--;s.enemies[i].debt=Math.min(40,(s.enemies[i].debt||0)+2);block=5;
 }else return null;
 s.block+=block;s.trainingTurn.used=true;return {i,block};
}
const WELFARE={
 'accountant-warlock':['overtimeClock','manaAmp'],'accountant-alchemist':['overtimeClock','lunchVoucher'],
 'chef-warlock':['protectiveApron','manaAmp'],'chef-alchemist':['overtimeClock','protectiveApron']
};
function prepareWelfareShop(){
 if(state.contentRevision!==21||state.stage!==3)return;
 let pool=WELFARE[keyPair()].filter(id=>!hasRelic(id));
 if(!pool.length)pool=relicKeys.filter(id=>relics[id].rarity==='일반'&&!hasRelic(id));
 if(!pool.length)return;
 const id=shuffle(pool)[0],other=state.shop.relics.slice(1).filter(k=>k!==id);
 if(!other.length)other.push(...state.shop.relics.filter(k=>k!==id));
 state.shop.relics=[id,...other].slice(0,2);
 state.shop.welfare={id,index:0,price:relics[id].price-10};
}
function validWelfare(s){
 const w=s.shop?.welfare;
 return !!(s.contentRevision===21&&s.stage===3&&w&&w.index===0&&Array.isArray(s.shop.relics)&&s.shop.relics[0]===w.id&&Object.hasOwn(relics,w.id)&&relics[w.id].rarity==='일반'&&w.price===relics[w.id].price-10);
}
function shopRelicPrice(i){return validWelfare(state)&&i===0?state.shop.welfare.price:relics[state.shop?.relics[i]]?.price}
let trainingChoice=null;
function renderTraining(){
 const selected=trainingChoice?.run===state&&trainingOptions().includes(trainingChoice.id)?trainingChoice.id:null;
 return `<main class="flow-screen training-flow">${flowHeader()}<section class="journey-panel"><div class="flow-kicker">3구역 완료 · 사내 전문교육</div><h1>이번 출근의 전문 분야는?</h1><p class="flow-lead">${pair().name}의 특성을 하나 고르세요. 무료이며 이번 도전이 끝날 때까지 자동으로 적용돼요.</p><div class="training-options">${trainingOptions().map(id=>{const t=TRAINING[id];return `<button type="button" class="training-option" data-act="selectTraining" data-id="${id}" aria-pressed="${selected===id}"><strong>${t.name}${selected===id?' ✓':''}</strong><span>${t.desc}</span><small>대표 카드 · ${t.cards.map(k=>cards[k].name).join(' · ')}</small></button>`}).join('')}</div><p class="flow-muted">확정 전에는 바꿀 수 있어요. 교육은 보상이나 상점·휴식 기회를 소비하지 않아요.</p></section><footer class="journey-dock training-dock"><div class="dock-copy"><b>${selected?TRAINING[selected].name:'전문화를 선택하세요'}</b><small>이번 도전 동안 유지</small></div><button class="btn primary" data-act="confirmTraining" ${selected?'':'disabled'}>교육 확정 →</button></footer></main>`;
}
function trainingInfoMarkup(){const t=trainingFor(state),limit=['posthumous','investment'].includes(state?.trainingId)?'턴을 끝낼 때 조건을 보고 한 번 발동해요.':'어떤 카드로 발동했든 전문화는 한 턴에 한 번 발동해요.';return t?`<h2>🎓 ${t.name}</h2><p>${t.desc}</p><p>대표 카드 · ${t.cards.map(id=>cards[id].name).join(' · ')}</p><p>이번 도전 동안 유지돼요. ${limit}</p>`:''}
function trainingStatus(){const t=state.trainingTurn;if(state.trainingId==='course'&&t.fusionReady)return '융합 +4 준비';return t.used?'이번 턴 사용함':'조건 충족 시 발동'}
function battleLocationMarkup(){const location=esc(rooms[state.stage].label)+' · '+state.turn+'턴',t=trainingFor(state);return t?`<button class="mb-location training-location" data-act="trainingInfo" aria-label="${t.name}. ${trainingStatus()}. 전문화 설명 보기"><span>${location}</span><small>${t.name} · ${trainingStatus()}</small></button>`:`<span class="mb-location"><span>${location}</span></span>`}

const mapRows=[
 ['battle','event','shop'],['battle','event','shop'],['elite','battle','rest'],
 ['rest','shop','event'],['elite','battle','event'],['shop','rest','battle'],
 ['elite','event','battle'],['rest','elite','shop'],['boss']];
const nodeInfo={battle:{label:'일반 전투',icon:'⚔️',hint:'카드 보상과 급여'},elite:{label:'정예 전투',icon:'💀',hint:'유물 1개 선택'},shop:{label:'상점',icon:'🛒',hint:'카드·유물·덱 정리'},rest:{label:'휴식',icon:'🏕️',hint:'회복 또는 카드 강화'},event:{label:'랜덤 사건',icon:'🎭',hint:'선택에 따른 위험과 보상'},boss:{label:'최종 보스',icon:'👹',hint:'마왕 퇴사 면담'}};
const allCardKeys=()=>Object.keys(cards).filter(k=>cards[k].job===state.real||cards[k].job===state.fantasy||k===pair().sig||['strike','guard','hustle'].includes(k));
const hasRelic=id=>!!state?.relics?.includes(id);
const relicOptions=n=>shuffle(relicKeys.filter(k=>!state.relics.includes(k))).slice(0,n);
function gainRelic(id){if(!relics[id]||hasRelic(id))return false;state.relics.push(id);if(id==='copperBuckle'){state.maxHp+=8;state.hp+=8}log('💎 유물 획득: '+relics[id].name);return true}
const upgraded=id=>!!state?.upgrades?.[id];
const costBase=id=>id===pair().sig&&state.sigUpgrade?1:cards[id].cost;
function availableUpgrades(){return [...new Set(state.deck)].filter(k=>k!=='fatigue'&&!state.upgrades[k]&&upgradeDiff(k).length>0);}
function awardCard(id){if(cards[id]&&id!=='fatigue'){state.deck.push(id);log('🎴 '+cards[id].name+' 획득')}}
// One atomic storage entry owns run + meta + preferences. Legacy keys remain untouched.
const SAVE_SLOT='dualJobSave_v1', SAVE_RECOVERY_SLOT='dualJobSave_v1_recovery', SAVE_LIMIT=512*1024;
let saveCache=null,saveLoaded=false,saveBlocked=false,saveIssue='',saveMessage='',restoreCandidate=null,restoreSerial=0;
function saveFault(message){saveIssue=message;updateSaveNotice();Promise.resolve().then(updateSaveNotice)}
function updateSaveNotice(){const el=document.getElementById('save-alert');if(el){el.hidden=!saveIssue;el.textContent=saveIssue?'저장 문제 · 백업 및 복원':''}}
function readOldJSON(key,def){try{const raw=localStorage.getItem(key);return raw===null?def:JSON.parse(raw)}catch{saveBlocked=true;saveFault('저장된 기록을 읽지 못했어요. 기존 기록 보호를 위해 자동 저장을 멈췄어요.');return def}}
function validSavePacket(packet){
 return !!(packet&&packet.schema===1&&Object.hasOwn(packet,'run')&&packet.meta&&typeof packet.meta==='object'&&!Array.isArray(packet.meta)&&
  packet.settings&&typeof packet.settings==='object'&&!Array.isArray(packet.settings));
}
function loadSaveCache(){
 if(saveLoaded)return;saveLoaded=true;
 const packet=readOldJSON(SAVE_SLOT,null);
 if(validSavePacket(packet))saveCache=packet;
 else{
  if(packet!==null){saveBlocked=true;saveFault('기본 저장본이 손상됐어요. 원본을 덮어쓰지 않고 복구 저장본을 확인하고 있어요.')}
  // Use recovery only when the primary is missing or invalid; run:null means intentional completion.
  const recovered=readOldJSON(SAVE_RECOVERY_SLOT,null);
  if(validSavePacket(recovered)){
   saveCache=recovered;saveBlocked=false;
   saveFault('기본 저장본을 읽을 수 없어 복구 저장본에서 이어하기를 준비했어요. 저장 및 백업에서 JSON을 내려받아 주세요.');
  }
 }
 if(!saveCache)saveCache={schema:1,run:readOldJSON(KEY,null),meta:readOldJSON(METAKEY,null),settings:{readableBattle:readOldJSON('dualJobReadableBattle',0)===1}};
}
function persistSavePacket(packet,allowReplace=false){
 if(saveBlocked&&!allowReplace)return false;
 try{
  const text=JSON.stringify(packet);if(text.length>SAVE_LIMIT)throw Error('size');
  localStorage.setItem(SAVE_SLOT,text);
  if(localStorage.getItem(SAVE_SLOT)!==text)throw Error('verify');
  saveCache=JSON.parse(text);saveLoaded=true;saveBlocked=false;saveIssue='';updateSaveNotice();
  // The auxiliary same-origin copy can recover a missing/corrupted primary.
  try{localStorage.setItem(SAVE_RECOVERY_SLOT,text);
   if(localStorage.getItem(SAVE_RECOVERY_SLOT)!==text)throw Error('recovery-verify');
  }catch{saveFault('진행 기록은 저장됐지만 추가 복구 저장본을 만들지 못했어요. JSON 백업을 권장해요.')}
  return true;
 }catch{saveFault('이 브라우저에 기록을 저장하지 못했어요. 창을 닫기 전에 현재 기록을 백업해 주세요.');return false}
}
const safeGet=(key,def)=>{
 if(key===KEY||key===METAKEY){loadSaveCache();return saveCache[key===KEY?'run':'meta']??def}
 return readOldJSON(key,def);
};
const safeSet=(key,obj)=>{
 loadSaveCache();if(key===KEY||key===METAKEY)return persistSavePacket({...saveCache,[key===KEY?'run':'meta']:obj});
 try{localStorage.setItem(key,JSON.stringify(obj));return true}catch{saveFault('설정을 저장하지 못했어요.');return false}
};
const safeRemove=key=>{loadSaveCache();if(key===KEY)return persistSavePacket({...saveCache,run:null});try{localStorage.removeItem(key);return true}catch{saveFault('기록 변경을 저장하지 못했어요.');return false}};

const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
// ── v0.6.1 저장: 독립 키 사용. 이전 버전 키는 '읽기'만 하고 절대 쓰거나 지우지 않는다.
const defaultMeta=()=>({attempts:0,wins:0,combos:[],best:0,tutorialDone:false,seenPairs:[],imported:null});
function cleanMeta(m){if(!m||typeof m!=='object')return null;const n=x=>Number.isFinite(+x)&&+x>=0?Math.floor(+x):0;
 return {attempts:n(m.attempts),wins:n(m.wins),best:Math.min(9,n(m.best)),combos:Array.isArray(m.combos)?[...new Set(m.combos.filter(k=>pairs[k]))]:[],tutorialDone:!!m.tutorialDone,seenPairs:Array.isArray(m.seenPairs)?m.seenPairs.filter(k=>pairs[k]):[],imported:typeof m.imported==='string'?m.imported:null}}
let meta=cleanMeta(safeGet(METAKEY,null));
if(!meta){ // 첫 실행: 가장 최근 이전 버전(C2.1 → C2 → C1)의 누적 기록을 검증한 뒤 C2.2 키로 '복사'만 한다.
  let previous=null,label='';for(const [k,l] of PREV_METAKEYS){const m=cleanMeta(safeGet(k,null));if(m){previous=m;label=l;break}}meta=defaultMeta();
  if(previous){meta.attempts=previous.attempts;meta.wins=previous.wins;meta.best=previous.best;meta.combos=previous.combos;meta.tutorialDone=previous.tutorialDone;meta.seenPairs=previous.seenPairs;meta.imported=label+' 누적 기록'}
 safeSet(METAKEY,meta);
}
const saveMeta=()=>safeSet(METAKEY,meta);
let selectedCard=null, selectionProjection=null, suppressClickUntil=0;
let state=null,modal='',pendingAction=null,pickReal='chef',pickFantasy='warlock';
const CARD_OK=id=>typeof id==='string'&&!!cards[id];
const RUN_PHASES=['map','shop','rest','relicReward','battle','event','reward','training'];
// 저장 데이터를 검증하고 '깊은 복사본'을 C2 형식(version 4)으로 정리한다. 실패하면 null.
function sanitizeRun(raw){
 let x;try{x=JSON.parse(JSON.stringify(raw))}catch{return null}
 if(!x||typeof x!=='object'||![1,2,3,4].includes(x.version)||!RUN_PHASES.includes(x.phase)||!pairs[x.real+'-'+x.fantasy])return null;
 if(!validTrainingSave(x))return null;
 x.contentRevision=x.contentRevision??20;
 if(x.contentRevision===20){x.trainingId=null;x.trainingTurn=freshTrainingTurn();if(x.shop)delete x.shop.welfare}
 else if(x.shop?.welfare&&!validWelfare(x))return null;
 if(!Array.isArray(x.deck)||!x.deck.length||!x.deck.every(CARD_OK))return null;
 const num=(v,d)=>Number.isFinite(+v)?+v:d;
 x.maxHp=Math.max(1,num(x.maxHp,72));x.hp=Math.max(1,Math.min(x.maxHp,num(x.hp,x.maxHp)));x.gold=Math.max(0,num(x.gold,0));
 for(const k of ['hand','drawPile','discard'])x[k]=Array.isArray(x[k])?x[k].filter(CARD_OK):[];
 x.relics=Array.isArray(x.relics)?[...new Set(x.relics.filter(k=>relics[k]))]:[];x.upgrades=x.upgrades&&typeof x.upgrades==='object'?x.upgrades:{};
 x.path=Array.isArray(x.path)?x.path:[];x.shop=x.shop&&typeof x.shop==='object'?x.shop:null;x.eventHistory=Array.isArray(x.eventHistory)?x.eventHistory:[];
 x.nodeType=x.nodeType||({battle:'battle',event:'event',reward:'battle'}[x.phase]||'battle');
 x.stage=Math.min(8,Math.max(0,Math.floor(num(x.stage,0))));x.relicTurn=x.relicTurn||{};x.relicUsed=x.relicUsed||{};
 x.logs=Array.isArray(x.logs)?x.logs.slice(0,20).map(String):[];x.message=String(x.message||'');
 x.rewardOptions=Array.isArray(x.rewardOptions)?x.rewardOptions:[];
 if(x.phase==='event')x.eventId=Number.isInteger(x.eventId)?x.eventId:0;
 x.workFatigue=Math.max(0,Math.min(6,num(x.workFatigue,0)));
  x.floorDecisions=x.floorDecisions&&typeof x.floorDecisions==='object'&&!Array.isArray(x.floorDecisions)?Object.fromEntries([5,6].filter(i=>[0,1].includes(x.floorDecisions[i])).map(i=>[i,x.floorDecisions[i]])):{};
  x.deferredBonus=x.deferredBonus===28?28:0;x.floorCopy=cards[x.floorCopy]?x.floorCopy:null;
 x.ingredient=Math.max(0,num(x.ingredient,0));x.reagent=Math.max(0,num(x.reagent,0));
 x.synergies=num(x.synergies,0);x.defeated=num(x.defeated,0);x.overtimes=num(x.overtimes,0);
 // C1 '전술 선택' 상태 → C2 자동 규칙으로 변환
 const used=x.turnBonusUsed;
 x.dualTurnUsed=typeof x.dualTurnUsed==='boolean'?x.dualTurnUsed:(used==='dual'||used==='overtime'||!!x.synergy);
 x.overtimeUsed=x.version>=4?!!x.overtimeUsed:used==='overtime';
 delete x.specialReady;delete x.lastFamily;delete x.turnBonusUsed;delete x.specializations;delete x.enemy;
 if(x.phase==='battle'){
  if(!Array.isArray(x.enemies))x.enemies=raw.enemy?[JSON.parse(JSON.stringify(raw.enemy))]:[];
  x.enemies=x.enemies.filter(e=>e&&typeof e==='object'&&Number.isFinite(+e.hp)&&Number.isFinite(+e.maxHp));
  if(!x.enemies.some(e=>e.hp>0))return null;
  x.targetIndex=Number.isInteger(x.targetIndex)?x.targetIndex:0;x.energy=Math.max(0,num(x.energy,3));x.block=Math.max(0,num(x.block,0));x.turn=Math.max(1,num(x.turn,1));
   const b=x.enemies.find(e=>e.id==='boss'&&e.hp>0);
   x.bossPhase=b?(x.bossPhase===2||b.hp<=b.maxHp/2?2:1):0;
 }
 x.tutorial=x.version>=4&&x.tutorial&&Number.isInteger(x.tutorial.step)?x.tutorial:null;
 x.version=4;return x;
}
let savedRun=sanitizeRun(safeGet(KEY,null));
if(saveCache?.run&&!savedRun){
 // The outer packet can be valid while its embedded run is not. Only then inspect
 // the secondary copy; never revive it when the primary explicitly ended a run.
 const recovery=readOldJSON(SAVE_RECOVERY_SLOT,null);
 const rescued=validSavePacket(recovery)?sanitizeRun(recovery.run):null;
 if(rescued){
  savedRun=rescued;saveCache={...saveCache,run:rescued};
  saveFault('진행 기록을 복구 저장본에서 되살렸어요. 이어하기 전에 JSON 백업을 권장해요.');
 }else {
  saveBlocked=true;
  saveFault('진행 기록이 손상돼 자동 복원을 중단했어요. 기존 기록을 보호하기 위해 저장을 멈췄어요.');
 }
}
if(savedRun){pickReal=savedRun.real;pickFantasy=savedRun.fantasy}
// C2 진행 저장이 없을 때만 이전 버전 진행을 '복사해 이어하기' 후보로 제시한다.
function importCandidate(){if(savedRun||state)return null;for(const s of IMPORT_SOURCES){const run=sanitizeRun(safeGet(s.key,null));if(run)return {...s,run}}return null}
const keyPair=()=>state.real+'-'+state.fantasy;
const pair=()=>pairs[keyPair()];
const save=()=>{if(state&&state.phase!=='victory'&&state.phase!=='defeat')safeSet(KEY,state);else safeRemove(KEY)};
const rng=n=>Math.floor(Math.random()*n);
const shuffle=xs=>{const a=[...xs];for(let i=a.length-1;i>0;i--){let j=rng(i+1);[a[i],a[j]]=[a[j],a[i]]}return a};
const log=(t)=>{state.logs.unshift(t);state.logs=state.logs.slice(0,20);state.message=t};
const getCost=id=>{const base=costBase(id);if(base===99)return 99;let v=base-(upgraded(id)&&base>=2?1:0);if(state?.phase==='battle'&&cards[id]?.family==='real'&&hasRelic('overtimeClock')&&!state.relicTurn?.overtimeClock)v--;return Math.max(0,v)};
// ── v0.6.1: 효과 기록기. 실제 행동과 미리보기 모두 같은 기본 함수를 거치므로, 카드 앞면 수치와 전투 피드백이 실제 결과와 일치한다.
let activeCard=null, activeBonus=0, fxRec=null;
const rec=o=>{if(fxRec)fxRec.push(o)};
const preventLethal=()=>{if(state.hp>0)return false;if(hasRelic('severancePackage')&&!state.relicUsed.severancePackage){state.relicUsed.severancePackage=true;state.hp=Math.min(state.maxHp,20);state.block+=12;log('👑 최후의 퇴직금 발동! HP 20 · 방어 12');return true}return false};
function enterBossPhase(e){
 if(state.nodeType!=='boss'||e.id!=='boss'||e.hp<=0||e.hp>e.maxHp/2||state.bossPhase===2)return;
 state.bossPhase=2;log('🚨 인사부장 2페이즈 · 겸직 적발 심사 개시! 현실·판타지 카드로 소명하자.');
}
const damage=x=>{if(!state.enemy)return;const e=state.enemy;const old=e.block||0;const amount=Math.max(0,Math.round(x+activeBonus+trainingDamageBonus(e)+(activeCard&&upgraded(activeCard)?3:0)));const wasCursed=(e.curse||0)>0;const blocked=Math.min(amount,old);e.block=old-blocked;e.hp=Math.max(0,e.hp-(amount-blocked));state.lastHitIndex=state.targetIndex;state.lastHitDamage=amount-blocked;rec({k:'dmg',i:state.targetIndex,raw:amount,dealt:amount-blocked,blocked,kill:e.hp<=0});if(e.hp<=0&&wasCursed&&hasRelic('ravenFeather')&&!state.relicUsed.ravenFeather){state.relicUsed.ravenFeather=true;heal(4)}log('⚔️ '+e.name+'에게 '+(amount-blocked)+' 피해'+(blocked?' (방어 '+blocked+' 흡수)':''));enterBossPhase(e);};
const gainBlock=n=>{const v=n+(activeCard&&upgraded(activeCard)?3:0);state.block+=v;rec({k:'block',n:v});log('🛡️ 방어 '+v+' 획득');};
const heal=(n,cardEffect=false)=>{if(activeCard&&upgraded(activeCard))n+=2;if(cardEffect&&trainingCard?.furnace)n=Math.max(0,n-2);const gained=Math.max(0,Math.min(n,state.maxHp-state.hp));state.hp+=gained;rec({k:'heal',n,gained});log('💚 체력 '+gained+' 회복');};
const ingredient=n=>{state.ingredient=Math.min(12,state.ingredient+n);rec({k:'ingredient',n});log('🥕 재료 +'+n);};
const reagent=n=>{state.reagent=Math.min(12,state.reagent+n);rec({k:'reagent',n});log('🧪 시약 +'+n);};
const debt=n=>{state.enemy.debt=Math.min(40,(state.enemy.debt||0)+n);rec({k:'debt',i:state.targetIndex,n});log('📋 적 미수금 +'+n);};
const curse=n=>{state.enemy.curse=Math.min(30,(state.enemy.curse||0)+n);rec({k:'curse',i:state.targetIndex,n});log('🕯️ 적 저주 +'+n);};
function draw(n){let got=0;for(let i=0;i<n;i++){if(state.hand.length>=10){log('손패는 최대 10장입니다.');break}if(!state.drawPile.length){if(!state.discard.length)break;state.drawPile=shuffle(state.discard);state.discard=[];}state.hand.push(state.drawPile.pop());got++}if(got)rec({k:'draw',n:got})}
function addTempFatigue(n){for(let i=0;i<n;i++)state.discard.push('fatigue');log('🥱 버린 더미에 임시 피로 카드 +'+n+' (이번 전투만)')}
function addFatigue(n){for(let i=0;i<n;i++){state.deck.push('fatigue');state.discard.push('fatigue')}log('🥱 덱에 피로 카드 '+n+'장 추가');}
function forEachEnemy(fn){const old=state.targetIndex;for(let i=0;i<state.enemies.length;i++){if(state.enemies[i].hp>0){state.targetIndex=i;ensureTarget();fn(state.enemy,i)}}state.targetIndex=old;ensureTarget()}
function applyCard(id){const e=state.enemy;let num;
switch(id){
case 'ledger':gainBlock(6);debt(2);break;
case 'audit':damage(6);if(e.hp>0)debt(1);break;
case 'balance':gainBlock(4);draw(1);break;
case 'receipt':debt(1);draw(1);break;
case 'collect':num=spendDebt(e);damage(5+3*num);break;
case 'chop':damage(6);ingredient(1);break;
case 'broth':gainBlock(6);ingredient(1);break;
case 'taste':ingredient(1);draw(1);break;
case 'lunch':num=spendResource('ingredient',2);gainBlock(4);heal(4+2*num,true);break;
case 'flambe':num=spendResource('ingredient',2);damage(12+3*num);break;
case 'curse':damage(5);if(e.hp>0)curse(2);break;
case 'drain':damage(7);heal(2,true);break;
case 'soul':state.hp=Math.max(0,state.hp-3);state.energy++;draw(1);log('🩸 생명력 3을 바쳐 에너지 +1');break;
case 'veil':gainBlock(6);curse(1);break;
case 'night':damage(10+3*(e.curse||0));break;
case 'extract':reagent(1);draw(1);break;
case 'blast':num=spendResource('reagent',2);damage(9+4*num);break; // C2.2: 7→9 (연금술사 계열 전투 템포)
case 'transmute':gainBlock(6);reagent(1);break;
case 'catalyst':reagent(2);draw(1);break;
case 'elixir':num=spendResource('reagent',2);heal(5+2*num,true);break;
case 'hellTax':num=spendDebt(e);damage(8+num*4+(state.sigUpgrade?4:0));if(e.hp>0)curse(2);break;
case 'goldAudit':num=spendResource('reagent',2);damage(8+num*5+(state.sigUpgrade?4:0));if(e.hp>0)debt(2);gainBlock(4);break;
case 'infernalMenu':num=spendResource('ingredient',3);damage(10+num*4+(state.sigUpgrade?4:0));if(e.hp>0)curse(2);heal(3,true);break;
case 'grandFeast':num=spendResource('ingredient',2)+spendResource('reagent',2);damage(9+num*3+(state.sigUpgrade?4:0));heal(5,true);break;
 case 'closeBooks':debt(3);draw(1);break;
 case 'surpriseAudit':forEachEnemy(()=>{damage(4);if(state.enemy.hp>0)debt(2)});break;
 case 'riskHedge':gainBlock(8);if((e.debt||0)>=4)gainBlock(4);break;
 case 'pantry':ingredient(2);draw(1);break;
 case 'hotMeal':num=spendResource('ingredient',2);heal(6+num*3,true);break;
 case 'spiceStorm':num=spendResource('ingredient',2);forEachEnemy(()=>damage(7+num*2));break;
 case 'darkBargain':state.hp=Math.max(0,state.hp-3);draw(2);log('🩸 체력 3 지불, 카드 2장');break;
 case 'contagion':curse(2);forEachEnemy((a)=>{if(a!==e)curse(1)});break;
 case 'eclipse':forEachEnemy(a=>damage(5+(a.curse||0)*2));break;
 case 'distill':reagent(2);gainBlock(4);break;
 case 'flashFlask':damage(6+(state.reagent>=2?5:0));break;
 case 'chainReaction':num=spendResource('reagent',2);forEachEnemy(()=>damage(9+num*3));break;
 case 'strike':damage(8);break;
case 'guard':gainBlock(9);break;
case 'hustle':draw(2);state.energy++;log('⚡ 에너지 +1');break;
}}
// ── v0.6.1 전투 규칙 ──────────────────────────────────────────────
// 전투 중 수동 겸직 선택은 제거. 겸직은 조건 충족 시 자동 발동(턴당 1회).
// 초과근무는 전투당 1회 쓰는 독립 특수 행동(에너지 +1, 피로도 +2)이며 겸직 효과를 증폭하지 않는다.
const OVERTIME_MAX_FATIGUE=4; // 사용 직전 피로도가 이 값 이하일 때만 사용 가능(= 5 이상이면 불가)
const DUAL_EFFECTS={
 'accountant-warlock':[['debt',2],['curse',1],['block',5]],
 'accountant-alchemist':[['debt',2],['reagent',2],['block',5]], // C2.2: 미수금 +1→+2 (두 회계사 계열 공통)
 'chef-warlock':[['ingredient',1],['curse',2],['heal',2]],
 'chef-alchemist':[['ingredient',1],['reagent',1],['draw',1]]
};
const EFFECT_LABEL={debt:'📋 미수금',curse:'🕯️ 저주',block:'🛡️ 방어',draw:'🎴 카드',ingredient:'🥕 재료',reagent:'🧪 시약',heal:'💚 체력'};
const dualEffectList=(k=keyPair())=>DUAL_EFFECTS[k]||[];
const dualSummary=(k)=>dualEffectList(k).map(([e,n])=>EFFECT_LABEL[e]+' +'+n).join(' · ');
function tryAutoDual(){
 if(!state||state.phase!=='battle'||state.dualTurnUsed||!state.usedReal||!state.usedFantasy||!livingEnemies().length)return null;
 state.dualTurnUsed=true;state.synergy=true;ensureTarget();const gained=[];
 for(const [k,n] of dualEffectList()){
  if(k==='block'){gainBlock(n);gained.push(EFFECT_LABEL.block+' +'+n);continue}
   if(k==='heal'){const h=state.hp;heal(n);gained.push(EFFECT_LABEL.heal+' +'+(state.hp-h));continue}
  if(k==='draw'){const h=state.hand.length;draw(n);gained.push(EFFECT_LABEL.draw+' +'+(state.hand.length-h));continue}
  const holder=k==='debt'||k==='curse'?state.enemy:state,prior=holder[k]||0;
  if(k==='debt')debt(n);else if(k==='curse')curse(n);else if(k==='ingredient')ingredient(n);else if(k==='reagent')reagent(n);
  gained.push(EFFECT_LABEL[k]+' +'+((holder[k]||0)-prior));
 }
 if(hasRelic('dualContract')&&!state.relicTurn.dualContract){state.relicTurn.dualContract=true;state.energy++;const h=state.hand.length;draw(1);gained.push('📜 ⚡+1'+(state.hand.length>h?' · 🎴+1':''))}
 state.synergies=(state.synergies||0)+1;
 state.lastDual={turn:state.turn,text:gained.join(' · ')};
 log('✨ '+pair().name+' 겸직 자동 발동 · '+state.lastDual.text);
 return gained;
}
function overtimeStatus(){
 if(!state||state.phase!=='battle'||!livingEnemies().length)return {ok:false,reason:'전투 중에만'};
 if(state.overtimeUsed)return {ok:false,reason:'이번 전투 사용함'};
 if(state.workFatigue>OVERTIME_MAX_FATIGUE)return {ok:false,reason:'과로 · 피로도 '+state.workFatigue};
 return {ok:true,reason:''};
}
function useOvertime(){
 if(!overtimeStatus().ok)return false;
 state.overtimeUsed=true;state.overtimes=(state.overtimes||0)+1;state.energy+=1;state.workFatigue=Math.min(6,state.workFatigue+2);
 log('☕ 초과근무 · ⚡ 에너지 +1 · 💤 피로도 +2 → '+state.workFatigue+'/6');
 tutorialEvent('overtime');save();render();return true;
}

// ── 직업 안내(난이도는 '규칙 복잡도' 잠정치. 플레이테스트 후 이 표만 고치면 화면 전체에 반영된다) ──
const JOB_ORDER=['chef-warlock','accountant-warlock','accountant-alchemist','chef-alchemist'];
const JOB_GUIDE={
 'chef-warlock':{level:1,label:'입문',recommended:true,core:'재료 확보 · 공격 · 회복',style:'재료를 모아 때리고, 저주로 깎고, 먹으면서 버틴다.',resources:['ingredient','curse'],
  strategy:['재료 손질·육수 끓이기로 🥕 재료를 쌓아.','저주 계약으로 🕯️ 저주를 걸면 턴마다 자동 피해.','재료 2~3개가 모이면 화염 불쇼·금단의 풀코스로 마무리, 위험하면 도시락으로 회복.'],
  combo:['chop','curse','infernalMenu'],comboNote:'재료 손질(현실) + 저주 계약(판타지) → 겸직 발동 → 금단의 풀코스로 재료를 몰아 쓰기',
  resourceBrief:'🥕 <b>재료</b>는 내 쪽에 쌓여. 화염 불쇼·도시락 같은 카드가 소모해서 더 세게 때리거나 회복해. 🕯️ <b>저주</b>는 적에게 쌓이고, 턴이 끝날 때마다 중첩×2 피해를 줘.'},
 'accountant-warlock':{level:2,label:'보통',core:'미수금 누적과 회수',style:'적 한 명에게 미수금을 쌓았다가 한 번에 회수한다.',resources:['debt','curse'],
  strategy:['전표 정리·추심 통지로 한 적에게 📋 미수금을 쌓아.','시작 덱의 💸 미수금 회수를 확보해. 미수금은 적마다 따로 쌓여.','미수금 3 이상이면 미수금 회수·지옥의 세무조사로 한 번에 터뜨려.'],
  combo:['ledger','curse','hellTax'],comboNote:'전표 정리(현실) + 저주 계약(판타지) → 겸직으로 미수금 +2 → 지옥의 세무조사(미수금×4)',
  resourceBrief:'📋 <b>미수금</b>은 적에게 쌓이는 표식이야. 회수 카드를 쓰면 미수금×3~4 추가 피해를 주고 사라져. 적마다 따로 쌓이니 <b>공격 대상 선택</b>이 중요해.'},
 'accountant-alchemist':{level:3,label:'상급',core:'미수금·시약 관리',style:'적의 미수금과 내 시약, 두 장부를 동시에 굴린다.',resources:['debt','reagent'],
  strategy:['시약 채집·촉매 주입으로 🧪 시약을 확보해.','전표 정리로 방어하면서 📋 미수금을 쌓아. 처음부터 💸 미수금 회수를 갖고 있어.','시약 2개와 미수금이 모이면 현자의 손익계산·미수금 회수로 연속 마무리.'],
  combo:['ledger','extract','goldAudit'],comboNote:'전표 정리(현실) + 시약 채집(판타지) → 겸직으로 시약 +2 → 현자의 손익계산(시약×5)',
  resourceBrief:'📋 <b>미수금</b>은 적에게, 🧪 <b>시약</b>은 나에게 쌓여. 시약은 카드마다 최대 2개씩 소모해 피해를 키우고, 미수금은 회수 카드로 터뜨려. <b>어떤 자원을 언제 쓸지</b>가 핵심이야.'},
 'chef-alchemist':{level:4,label:'전문가',core:'재료·시약 조합',style:'재료와 시약을 함께 모아 한 장에 몰아 쓴다.',resources:['ingredient','reagent'],
  strategy:['간 보기·시약 채집 같은 0코스트 드로우로 손패를 돌리며 두 자원을 확보해.','카드마다 소모하는 자원이 달라. 상세 보기에서 꼭 확인해.','재료 2 + 시약 2가 모이면 연금 연회로 최대 효율.'],
  combo:['taste','extract','grandFeast'],comboNote:'간 보기(현실) + 시약 채집(판타지) → 겸직으로 재료·시약·카드 +1 → 연금 연회(자원 최대 4개 소모)',
  resourceBrief:'🥕 <b>재료</b>와 🧪 <b>시약</b> 모두 나에게 쌓이고, 카드마다 소모하는 자원이 달라. 둘 다 2개씩 모았을 때 연금 연회가 가장 강해.'}
};
const stars=n=>`<span class="stars" role="img" aria-label="난이도 ${n}/4"><span class="s-on">${'★'.repeat(n)}</span><span class="s-off">${'★'.repeat(4-n)}</span></span>`;
function seePair(k){if(!meta.seenPairs.includes(k)){meta.seenPairs.push(k);saveMeta()}}

// ── 첫 전투 튜토리얼: 실제 조작으로 진행, 각 단계는 '다음'으로 넘길 수도 있다 ──
const TUTORIAL=[
 {title:'1/6 · 카드 사용',wait:'play',focus:'.hand',text:()=>'카드를 <b>탭</b>하면 아래에 효과가 보여. <b>적 또는 내 캐릭터를 탭</b>해서 사용해. 좌우로 넘기면 손패 탐색, 위로 끌어 대상에 놓으면 바로 사용이야.'},
 {title:'2/6 · 에너지와 턴 종료',wait:'endTurn',focus:'.energy-orb,.end-turn-btn',text:()=>'카드 왼쪽 위 숫자가 <b>⚡ 비용</b>이야. 에너지가 모자라면 카드가 잠겨. 쓸 만큼 썼으면 <b>「턴 종료」</b>. 에너지는 매 턴 3으로 돌아와.'},
 {title:'3/6 · 공격·방어·적 예고',wait:'next',focus:'.enemy-intent,.forecast',text:()=>'적 위의 <b>예고</b>를 봐. ⚔ 공격은 🛡 <b>방어</b>로 막을 수 있고, 오른쪽에 <b>예상 피해</b>가 보여. 방어는 다음 내 턴에 사라져.'},
 {title:'4/6 · 직업 핵심 자원',wait:'next',focus:'.job-resources .res-pill',text:()=>JOB_GUIDE[keyPair()].resourceBrief},
 {title:'5/6 · 겸직 자동 발동',wait:'dual',focus:'.dual-meter',text:()=>state.dualTurnUsed?'이번 턴엔 이미 <b>겸직</b>이 발동했어! 청록 「현실」 + 보라 「판타지」 카드를 같은 턴에 쓰면 매 턴 1번 자동으로 터져.':'청록 <b>「현실」</b> 카드와 보라 <b>「판타지」</b> 카드를 같은 턴에 쓰면 겸직 효과(<b>'+dualSummary()+'</b>)가 <b>자동</b> 발동해. 턴당 1번. ✦겸직 표시 카드를 노려 봐.'},
 {title:'6/6 · 초과근무와 피로도',wait:'overtime',focus:'.overtime-btn,.fatigue-meter',text:()=>'☕ <b>초과근무</b>: 전투당 1번, 즉시 ⚡ +1. 대가로 💤 <b>피로도 +2</b>가 다음 전투까지 남아. 피로도 3↑면 시작 손패에 피로 카드가 섞이고, 5↑면 초과근무 불가. 승리하면 −1, 휴식에서 −3.'}
];
function tutorialEvent(evt){
 const t=state?.tutorial;if(!t||t.step>=TUTORIAL.length)return;
 const s=TUTORIAL[t.step];if(s.wait!==evt&&evt!=='next')return;
 if(t.step===3)seePair(keyPair());
 t.step++;if(t.step>=TUTORIAL.length)finishTutorial(false);
}
function finishTutorial(skipped){if(state)state.tutorial=null;meta.tutorialDone=true;saveMeta();if(state)log(skipped?'🎓 튜토리얼을 건너뛰었어. ❔ 규칙에서 다시 볼 수 있어.':'🎓 튜토리얼 완료! 이제 마음대로 출근하자.')}
function livingEnemies(){return (state.enemies||[]).filter(e=>e.hp>0)}
function ensureTarget(){const list=state.enemies||[];if(!list.length)return null;let i=Number.isInteger(state.targetIndex)?state.targetIndex:0;if(!list[i]||list[i].hp<=0)i=list.findIndex(e=>e.hp>0);state.targetIndex=Math.max(0,i);state.enemy=list[state.targetIndex]||list[0];return state.enemy}
function selectTarget(i){if(!state||state.phase!=='battle'||!state.enemies?.[i]||state.enemies[i].hp<=0)return;state.targetIndex=i;ensureTarget();save();render()}
// One intent interpretation is shared by execution, forecast and UI.
function enemyAction(e,s=state){
 const it=e.intent||{type:'attack',amount:e.baseAttack||0};
 const n=(v,d=0)=>Number.isFinite(+v)?Math.max(0,Math.floor(+v)):d;
 const type=['attack','curse','guard','charge','prepare','slam'].includes(it.type)?it.type:'attack';
 const baseDamage=['attack','curse','slam'].includes(type)?n(it.amount,n(e.baseAttack)):0;
  const verdict=e.id==='boss'&&s.bossPhase===2&&it.pattern==='hr-verdict';
  const damage=verdict?Math.max(0,baseDamage+(s.usedReal&&s.usedFantasy?-6:6)):baseDamage;
 let target=-1;
 if(type==='guard'&&e.id==='healer'){
  target=Number.isInteger(it.targetIndex)?it.targetIndex:(s.enemies||[]).findIndex(a=>a!==e&&a.hp>0);
  const ally=s.enemies?.[target];
  if(!ally||ally===e||ally.hp<=0)target=-1;
 }
 return {type,damage,fatigue:type==='curse'?n(it.fatigue,1):0,
  block:type==='guard'?n(it.block,e.id==='healer'?9:12):0,
  target,allyBlock:target>=0?n(it.allyBlock,5):0,
  nextAmount:n(it.nextAmount),nextFatigue:n(it.nextFatigue),pattern:it.pattern||''};
}
function chooseIntent(){
 const t=state.turn,attackAt=(e,turn)=>e.baseAttack+Math.min(4,Math.floor(turn/3));
 for(const e of livingEnemies()){
  const old=e.intent,amount=attackAt(e,t);
  if(e.id==='boss'&&state.bossPhase===2){
    if(old?.pattern==='hr-review')e.intent={type:'attack',amount:old.nextAmount,pattern:'hr-verdict'};
    else e.intent={type:'prepare',amount:0,nextAmount:Math.max(16,amount+5),pattern:'hr-review'};
   }else if(e.id==='golem'){
   if(old?.type==='charge'&&old.pattern==='copier')e.intent={type:'slam',amount:old.nextAmount,pattern:'copier'};
   else if(old?.type==='slam'&&old.pattern==='copier')e.intent={type:'attack',amount:Math.max(1,Math.floor(amount*.65)),pattern:'copier-recovery'};
   else e.intent={type:'charge',amount:0,nextAmount:Math.ceil(attackAt(e,t+1)*1.6),pattern:'copier'};
  }else if(e.id==='ghost'){
   if(old?.type==='prepare'&&old.pattern==='overtime')e.intent={type:'curse',amount:old.nextAmount,fatigue:old.nextFatigue,pattern:'overtime'};
   else if(old?.type==='curse'&&old.pattern==='overtime')e.intent={type:'attack',amount,pattern:'overtime-recovery'};
   else e.intent={type:'prepare',amount:0,nextAmount:Math.max(3,Math.floor(attackAt(e,t+1)*.7)),nextFatigue:1,pattern:'overtime'};
  }else if(e.id==='healer'){
   if(t%2===1){
    let targetIndex=-1;
    state.enemies.forEach((a,i)=>{if(a!==e&&a.hp>0&&(targetIndex<0||a.baseAttack>state.enemies[targetIndex].baseAttack))targetIndex=i});
    e.intent={type:'guard',amount:0,block:4,allyBlock:8,targetIndex,pattern:'protector'};
   }else e.intent={type:'attack',amount,pattern:'protector'};
  }else{
   const type=(t+state.enemies.indexOf(e))%4===0?'guard':(t+state.enemies.indexOf(e))%5===0?'curse':'attack';
   e.intent={type,amount:type==='curse'?Math.max(3,Math.floor(amount*.7)):amount};
  }
 }
 ensureTarget();
}
function intentInfo(e){
 if(!e||!e.intent)return {cls:'unknown',icon:'❔',text:'파악 중'};
 const a=enemyAction(e),short={golem:'골렘',boss:'마왕',ghost:'망령',clerk:'슬라임',minion:'정령',wraith:'악령',healer:'주술사'};
 if(e.id==='boss'&&e.intent.pattern==='hr-review')return {cls:'prepare',icon:'📋',text:'이번: 인사 감사 예고',sub:'다음: 적발 기본 '+a.nextAmount+' · 겸직 사용 시 −6 / 미사용 +6'};
  if(e.id==='boss'&&e.intent.pattern==='hr-verdict')return {cls:'attack',icon:'🚨',text:'겸직 적발 '+a.damage,sub:'현실·판타지 카드 둘 다 사용 시 피해 −6 · 다음 턴 에너지 +1'};
  if(a.type==='charge')return {cls:'charge',icon:'⚡',text:'이번: 충전',sub:'다음: 강타 '+a.nextAmount};
 if(a.type==='prepare')return {cls:'prepare',icon:'☾',text:'이번: 야근 예고',sub:'다음: 공격 '+a.nextAmount+' · 피로 '+a.nextFatigue};
 if(a.type==='guard')return {cls:'guard',icon:'🛡️',text:'자신 방어 +'+a.block,sub:a.target>=0?(short[state.enemies[a.target].id]||'아군')+' 방어 +'+a.allyBlock:''};
 if(a.type==='curse')return {cls:'curse',icon:'📜',text:'공격 '+a.damage,sub:'피로 카드 +'+a.fatigue};
 if(a.type==='slam')return {cls:'slam',icon:'⚔️',text:'강타 '+a.damage};
 return {cls:'attack',icon:'⚔️',text:(a.pattern==='copier-recovery'?'재정비 공격 ':'공격 ')+a.damage};
}
function intentDetailsMarkup(){
 const descriptions={
  golem:'충전 → 예고한 강타 → 약한 재정비 공격을 반복해. 충전 중에는 공격하지 않아.',
  ghost:'야근 예고 → 피로 공격 → 일반 공격을 반복해. 예고 중에는 공격하거나 피로 카드를 넣지 않아.',
  healer:'홀수 턴에는 자신과 예고한 아군을 보호하고, 짝수 턴에는 공격해. 보호 대상이 처치되면 다른 적을 대신 보호하지 않아.',
   boss:'체력이 절반 이하가 되면 인사 감사 예고 → 겸직 적발이 반복돼. 현실·판타지 카드를 모두 쓰면 미사용 때보다 피해를 12 줄이고 다음 턴 에너지 +1.'
 };
 return '<div class="intent-details">'+livingEnemies().map(e=>{
  const a=enemyAction(e),doomed=e.hp<=(e.curse||0)*2;let now='';
  if(a.type==='guard')now='자신의 방어 +'+a.block+(a.target>=0?' · '+state.enemies[a.target].name+' 방어 +'+a.allyBlock:e.intent.pattern==='protector'?' · 보호할 아군 없음':'');
  else if(a.type==='charge')now='이번 턴 공격 없음. 다음 턴 강타 '+a.nextAmount+'를 준비해.';
  else if(a.type==='prepare')now=e.id==='boss'&&e.intent.pattern==='hr-review'?'이번 턴 공격 없음. 다음 턴 겸직 적발 기본 피해 '+a.nextAmount+' 예정.':'이번 턴 공격 없음. 다음 턴 공격 '+a.nextAmount+'와 임시 피로 카드 '+a.nextFatigue+'장을 예고해.';
  else now='공격 '+a.damage+(a.fatigue?' · 버림 더미에 임시 피로 카드 +'+a.fatigue:'')+'.';
  const patternNote=descriptions[e.id]?(e.intent.pattern?descriptions[e.id]:'이전 저장의 이번 행동은 유지돼. 다음 행동부터 새로운 고유 패턴을 사용해.'):'';
  return `<article><b>${esc(e.name)}</b><p>${esc(now)}</p>${doomed?'<strong>현재 저주로 행동 전에 처치될 예정</strong>':''}${patternNote?`<small>${esc(patternNote)}</small>`:''}</article>`;
 }).join('')+'<p class="inspect-hint">공격 수치는 내 방어를 적용하기 전이야. 임시 피로 카드는 이번 전투에만 남으며 피로도 게이지와는 별개야. 행동 전에 적을 처치하면 그 행동은 취소돼.</p></div>';
}
function turnForecast(s){
 s=JSON.parse(JSON.stringify(s));const training=applyTrainingEnd(s);
 let incoming=0,fatigue=0;
 for(const e of s.enemies||[]){
  if(e.hp<=0||e.hp<=(e.curse||0)*2)continue;
  const a=enemyAction(e,s);incoming+=a.damage;fatigue+=a.fatigue;
 }
 return {incoming,net:Math.max(0,incoming-(s.block||0)),fatigue,trainingBlock:training?.block||0};
}
function endTurn(){
 if(state.phase!=='battle')return;
 state.discard.push(...state.hand);state.hand=[];fxRec=[];
 const training=applyTrainingEnd(state);if(training){rec({k:'block',n:training.block});log('🎓 '+trainingFor(state).name+' · 턴 종료 효과');captureCombatBeat('training',training.i,'🎓 '+trainingFor(state).name)}
 let taken=0,absorbedAll=0,ticks=0,fatigueAdded=0,hrReward=false;
 for(const e of livingEnemies())e.block=0;
 captureCombatBeat('start',null,'적의 턴');
 for(const e of livingEnemies()){
  const ei=state.enemies.indexOf(e);
  if(e.curse>0){const d=e.curse*2;e.hp=Math.max(0,e.hp-d);e.curse--;ticks+=d;rec({k:'tick',i:ei,n:d,kill:e.hp<=0});log('🕯️ '+e.name+' 저주 피해 '+d);captureCombatBeat('tick',ei,e.name+' · 저주 피해 '+d)}
  enterBossPhase(e);if(e.hp<=0)continue;
  const a=enemyAction(e);
  if(e.id==='boss'&&e.intent?.pattern==='hr-verdict'&&state.usedReal&&state.usedFantasy)hrReward=true;
   if(a.type==='guard'){
   e.block+=a.block;rec({k:'eguard',i:ei,n:a.block});log('🛡️ '+e.name+' 방어 +'+a.block);
   if(a.target>=0){const ally=state.enemies[a.target];ally.block+=a.allyBlock;rec({k:'eguard',i:a.target,n:a.allyBlock});log('✨ '+e.name+' → '+ally.name+' 보호 +'+a.allyBlock)}
  }else if(a.type==='charge'||a.type==='prepare'){
   const label=a.type==='charge'?'충전 · 다음 강타 '+a.nextAmount:'야근 예고 · 다음 공격 '+a.nextAmount+' / 피로 카드 '+a.nextFatigue;
   rec({k:'prepare',i:ei,label});log(e.name+' '+label);
  }else{
   const absorbed=Math.min(state.block,a.damage),dealt=Math.max(0,a.damage-absorbed);
   state.block-=absorbed;state.hp=Math.max(0,state.hp-dealt);taken+=dealt;absorbedAll+=absorbed;
   rec({k:'hit',i:ei,dealt,absorbed});
   if(a.fatigue){addTempFatigue(a.fatigue);fatigueAdded+=a.fatigue}
   log('💥 '+e.name+(a.type==='slam'?' 강타 ':' 공격 ')+dealt+' 피해'+(absorbed?' (방어 '+absorbed+' 흡수)':'')+(a.fatigue?' · 임시 피로 카드 +'+a.fatigue:''));
  }
  captureCombatBeat('enemy',ei,e.name+' · '+(a.type==='guard'?'방어 +'+a.block:a.type==='charge'?'충전':a.type==='prepare'?'야근 예고':(a.type==='slam'?'강타 ':'공격 ')+a.damage)+(a.fatigue?' · 피로 카드 +'+a.fatigue:''));
  if(state.hp<=0){if(!preventLethal()){finishRun(false);return}captureCombatBeat('revive',null,'퇴직금 패키지 · 체력 회복')}
 }
 const summary='🌙 적 턴 결과 · 받은 피해 '+taken+(absorbedAll?' · 방어로 '+absorbedAll+' 막음':'')+(ticks?' · 저주 피해 '+ticks:'')+(fatigueAdded?' · 임시 피로 카드 +'+fatigueAdded:'');
 if(!livingEnemies().length){log(summary);victory();return}
 state.turn++;state.block=0;state.energy=hrReward?4:3;state.usedReal=false;state.usedFantasy=false;state.synergy=false;state.dualTurnUsed=false;state.relicTurn={};state.trainingTurn=freshTrainingTurn();
 ensureTarget();draw(5);dealFrom=0;chooseIntent();log(summary);if(hrReward)log('📋 겸직 소명 성공 · 다음 턴 에너지 +1');tutorialEvent('endTurn');save();render();
}

function spawnEnemy(){
 const nt=state.nodeType,encounter=ENCOUNTERS[shuffle(encounterPool(state.stage,nt))[0]],ids=encounter.ids;
 state.enemies=ids.map(id=>{const e=enemies[id],scale=nt==='boss'?0:Math.floor(state.stage/2)*3;return {id,name:e.name,icon:e.icon,hp:e.maxHp+scale,maxHp:e.maxHp+scale,baseAttack:e.attack+Math.floor(state.stage/3),block:0,debt:0,curse:0}});
 state.targetIndex=0;ensureTarget();state.block=hasRelic('lunchVoucher')?6:0;state.energy=3;
 state.drawPile=shuffle([...state.deck]);state.discard=[];state.hand=[];state.turn=1;state.usedReal=false;state.usedFantasy=false;state.synergy=false;state.dualTurnUsed=false;state.lastDual=null;
 state.lastHitIndex=null;state.lastHitDamage=0;state.overtimeUsed=false;state.ingredient=0;state.reagent=0;state.logs=[];
 state.trainingTurn=freshTrainingTurn();state.relicTurn={};state.relicUsed={severancePackage:!!state.relicUsed?.severancePackage};state.bossPhase=nt==='boss'?1:0;state.floorCopy=null;state.phase='battle';
 dealFrom=0;if(state.workFatigue>=3){draw(4);state.hand.push('fatigue');log('💤 피로도 '+state.workFatigue+': 시작 손패 1장이 임시 피로 카드')}else draw(5);
 if(state.stage===2){state.floorCopy=pair().sig;state.hand.push(pair().sig);log('🖨️ 복사실 특전 · '+cards[pair().sig].name+' 임시 사본 1장 (이번 전투 한정)')}
  chooseIntent();log('🚪 '+rooms[state.stage].label+' · '+encounter.name);log(encounter.hint);
}
function newRun(){
 meta.attempts=(meta.attempts||0)+1;const key=pickReal+'-'+pickFantasy;if(!meta.combos.includes(key))meta.combos.push(key);saveMeta();
 trainingChoice=null;
 state={version:4,contentRevision:21,trainingId:null,trainingTurn:freshTrainingTurn(),workFatigue:0,dualTurnUsed:false,lastDual:null,overtimes:0,tutorial:meta.tutorialDone?null:{step:0},phase:'map',stage:0,real:pickReal,fantasy:pickFantasy,maxHp:72,hp:72,block:0,energy:3,gold:30,
 ingredient:0,reagent:0,deck:[...initialDeck[pickReal],...initialDeck[pickFantasy],pairs[key].sig],drawPile:[],discard:[],hand:[],enemy:null,
 turn:1,usedReal:false,usedFantasy:false,synergy:false,synergies:0,overtimeUsed:false,sigUpgrade:false,defeated:0,logs:[],message:'',rewardOptions:[],rewardFor:0,
 relics:[],upgrades:{},path:[],nodeType:null,relicTurn:{},relicUsed:{},shop:null,eventId:null,eventHistory:[],floorDecisions:{},deferredBonus:0,floorCopy:null,bossPhase:0};
 savedRun=null;save();render();
}
function finishRun(win){state.phase=win?'victory':'defeat';if(win)meta.wins=(meta.wins||0)+1;meta.best=Math.max(meta.best||0,state.stage+(win?1:0));safeSet(METAKEY,meta);save();render();}
function victory(){
 const nt=state.nodeType||'battle';state.defeated++;let earned=nt==='boss'?40:nt==='elite'?24:12;
 if(hasRelic('paydayCoupon'))earned+=10;if(state.deferredBonus){earned+=state.deferredBonus;state.deferredBonus=0;log('📑 이월 미수금 지급 · 추가 28G')}state.gold+=earned;log('🏅 전투 승리! 급여 '+earned+'G');
 if(state.workFatigue>0){state.workFatigue--;log('🌿 전투 승리 · 피로도 -1')}
 if(nt==='boss'){finishRun(true);return}
 if(nt==='elite'){
   state.phase='relicReward';state.rewardOptions=relicOptions(3);state.rewardFor=state.stage;
 }else{
   state.phase='reward';state.rewardFor=state.stage;state.rewardOptions=shuffle(allCardKeys()).slice(0,3);
 }
 save();render();
}
// 카드 1장의 실제 효과 처리(검증·승패 판정·저장·렌더 제외). playCard와 미리보기가 공유한다.
function resolveCard(index,target){
 const id=state.hand[index],c=cards[id];
 if(targetMode(id)==='enemy'&&Number.isInteger(target)&&state.enemies?.[target]?.hp>0)state.targetIndex=target;
 ensureTarget();state.lastHitIndex=null;state.lastHitDamage=0;const beforeIng=state.ingredient,beforeDebt=state.enemy?.debt||0;
 const boostMana=hasRelic('manaAmp')&&c.family==='fantasy'&&!state.relicTurn.manaAmp&&['curse','drain','night','blast','flashFlask','chainReaction','eclipse'].includes(id);
 const boostGlass=hasRelic('glassRetort')&&!state.relicTurn.glassRetort&&state.reagent>0&&['blast','goldAudit','grandFeast','chainReaction'].includes(id);
 activeCard=id;activeBonus=(boostMana?3:0)+(boostGlass?4:0);
 state.energy-=getCost(id);if(hasRelic('overtimeClock')&&c.family==='real'&&!state.relicTurn.overtimeClock)state.relicTurn.overtimeClock=true;
 if(boostMana)state.relicTurn.manaAmp=true;if(boostGlass)state.relicTurn.glassRetort=true;
 state.hand.splice(index,1);state.discard.push(id);
 if(c.family==='real')state.usedReal=true;if(c.family==='fantasy')state.usedFantasy=true;
 state.cardsPlayed=(state.cardsPlayed||0)+1;log('🃏 '+c.name+' 사용');
 const trainingContext={id,target:targetMode(id)==='enemy'?state.targetIndex:-1,spent:{debt:0,ingredient:0,reagent:0},bonusApplied:false};
 trainingCard=trainingContext;
 try{applyCard(id)}finally{activeCard=null;activeBonus=0;trainingCard=null}
 if(upgraded(id)&&utilityDrawCards.has(id)){draw(1);log('✦ 강화 보너스: 카드 1장')}
 if(id==='collect'&&hasRelic('ledgerBeyond')&&!state.relicTurn.ledgerBeyond&&state.enemy?.hp>0){const reborn=Math.floor(beforeDebt/2);state.enemy.debt+=reborn;state.relicTurn.ledgerBeyond=true;rec({k:'debt',i:state.targetIndex,n:reborn});log('📗 저승의 장부: 미수금 '+reborn+' 반환')}
 if(hasRelic('infinitePot')&&state.ingredient<beforeIng&&!state.relicUsed.infinitePot){const n=Math.min(2,beforeIng-state.ingredient);state.ingredient+=n;state.relicUsed.infinitePot=true;log('🍯 재료 '+n+' 환급')}
 if(hasRelic('protectiveApron')&&targetMode(id)==='self'&&!state.relicTurn.protectiveApron){state.relicTurn.protectiveApron=true;heal(2);log('🦺 방호 앞치마 발동')}
 afterTrainingCard(trainingContext);
}
function playCard(index,target){
 if(state.phase!=='battle'||!Number.isInteger(index)||index<0||index>=state.hand.length)return;
 const id=state.hand[index],c=cards[id];if(!c||id==='fatigue'||state.energy<getCost(id))return;
 const handBefore=state.hand.length;fxRec=[];
 resolveCard(index,target);
 const drawn=fxRec.filter(r=>r.k==='draw').reduce((a,r)=>a+r.n,0);dealFrom=Math.max(0,state.hand.length-drawn);
 captureCombatBeat('card',targetMode(id)==='enemy'?state.targetIndex:null,c.name+' 사용');
 if(state.hp<=0){if(!preventLethal()){finishRun(false);return}captureCombatBeat('revive',null,'퇴직금 패키지 · 체력 회복')}
 tutorialEvent('play');
 if(!livingEnemies().length){victory();return}ensureTarget();
 if(tryAutoDual()){tutorialEvent('dual');captureCombatBeat('dual',null,'✦ 겸직 발동 · 현실 + 판타지')}
 const drawn2=fxRec.filter(r=>r.k==='draw').reduce((a,r)=>a+r.n,0);dealFrom=Math.max(0,state.hand.length-drawn2);
 save();render();
}
// ── 미리보기: 상태를 복제해 실제 효과 함수를 실행하고 기록만 읽는다(원본 상태·저장·화면은 그대로).
// base=true: 자원·유물·대상 상태를 비운 '카드 자체 수치'. forceUp: 강화 여부를 가정.
function previewCard(id,{target,base=false,forceUp=null}={}){
 if(!state||!cards[id]||id==='fatigue')return null;
 const real=state,keep=[activeCard,activeBonus,fxRec];let c;
 try{c=JSON.parse(JSON.stringify(real))}catch{return null}
 if(base||c.phase!=='battle'||!Array.isArray(c.enemies)||!c.enemies.some(e=>e.hp>0)){
  c.phase='battle';c.enemies=[{id:'dummy',name:'',icon:'',hp:999,maxHp:999,block:0,debt:0,curse:0,baseAttack:0}];c.targetIndex=0;
  c.trainingId=null;c.trainingTurn=freshTrainingTurn();c.ingredient=0;c.reagent=0;c.relics=[];c.relicTurn={};c.relicUsed={};c.drawPile=Array(20).fill('strike');c.discard=[];c.hand=[];target=0;
 }
 c.hp=Math.max(1,Math.min(c.hp,c.maxHp-30));c.energy=99;c.logs=[];
 if(forceUp!==null){c.upgrades={...(c.upgrades||{}),[id]:!!forceUp}}
 c.hand=[id,...c.hand.slice(0,8)];
 const hp0=c.hp;let out=null;
 state=c;fxRec=[];
 try{
  const cost=getCost(id);const t=targetMode(id)==='enemy'?(Number.isInteger(target)?target:c.targetIndex):undefined;
  resolveCard(0,t);
  const r=fxRec,tgt=c.targetIndex,sum=k=>r.filter(x=>x.k===k).reduce((a,x)=>a+x.n,0);
  const hits=r.filter(x=>x.k==='dmg');const main=hits.find(x=>x.i===tgt)||hits[0];
  const healRaw=sum('heal'),gained=r.filter(x=>x.k==='heal').reduce((a,x)=>a+x.gained,0);
  const onT=k=>r.filter(x=>x.k===k&&x.i===tgt).reduce((a,x)=>a+x.n,0);
  out={cost,attack:main?main.raw:0,hits:hits.length,block:sum('block'),heal:healRaw,draw:sum('draw'),debt:onT('debt'),curse:onT('curse'),ingredient:sum('ingredient'),reagent:sum('reagent'),
   energy:c.energy-(99-cost),hpLoss:Math.max(0,hp0+gained-c.hp),aoe:new Set(hits.map(x=>x.i)).size>1};
 }catch(e){out=null}
 finally{state=real;[activeCard,activeBonus,fxRec]=keep}
 return out;
}
let dealFrom=0;
function nextStage(){
 state.stage++;state.nodeType=null;state.shop=null;state.eventId=null;
 if(state.stage>=9){finishRun(true);return}
 state.phase=state.contentRevision===21&&state.stage===3&&!state.trainingId?'training':'map';state.message='새로운 갈림길에서 다음 목적지를 선택해.';save();render();
}
function chooseNode(index){
 if(state.phase!=='map'||floorDecisionPending())return;const opts=mapRows[state.stage],t=opts[index];if(!t)return;
 state.nodeType=t;state.path[state.stage]={type:t,choice:index};
 state.message='';
 if(t==='battle'||t==='elite'||t==='boss')spawnEnemy();
 else if(t==='shop'){state.phase='shop';state.shop={cards:shuffle(allCardKeys().filter(k=>k!=='fatigue')).slice(0,3),relics:relicOptions(2),removed:0,cardBought:{},relicBought:{}};prepareWelfareShop()}
 else if(t==='rest'){state.phase='rest'}
 else if(t==='event'){
   state.phase='event';
   const eligible=eventCatalog.map((evt,i)=>({evt,i})).filter(x=>!x.evt.pair||x.evt.pair===keyPair()).map(x=>x.i);
   const unseen=eligible.filter(i=>!state.eventHistory.includes(i)),special=unseen.filter(i=>eventCatalog[i].pair);
   state.eventId=shuffle(special.length&&Math.random()<0.65?special:unseen.length?unseen:eligible)[0];
   state.eventHistory.push(state.eventId);
  }
 save();render();
}
function pickReward(i){if(state.phase!=='reward')return;if(i>=0){const id=state.rewardOptions[i];if(!id||!cards[id])return;awardCard(id)}else{state.gold+=8;log('💰 카드 대신 8G 획득')}nextStage()}
function pickRelic(i){if(state.phase!=='relicReward')return;if(i>=0){const id=state.rewardOptions[i];if(!id||!relics[id]||hasRelic(id))return;gainRelic(id)}else{state.gold+=15;log('🪙 유물 대신 15G 획득')}nextStage()}
function buyItem(kind,i){if(state.phase!=='shop'||!state.shop)return;const shop=state.shop;
 if(kind==='card'){const id=shop.cards[i],price=cardPrice(id);if(!id||shop.cardBought[i]||state.gold<price)return;state.gold-=price;awardCard(id);shop.cardBought[i]=true}
 else if(kind==='relic'){const id=shop.relics[i],price=shopRelicPrice(i);if(!id||shop.relicBought[i]||state.gold<price||hasRelic(id))return;state.gold-=price;gainRelic(id);shop.relicBought[i]=true}
 else if(kind==='remove'){const id=state.deck[i],price=30+shop.removed*15;if(!id||state.gold<price||state.deck.length<=5)return;state.gold-=price;shop.lastRemoval={id,index:i,price};state.deck.splice(i,1);shop.removed++;log('🧹 '+cards[id].name+' 제거 · 상점에서 삭제 취소 가능')}
 save();render();
}
function undoLastRemoval(){if(state?.phase!=='shop'||!state.shop?.lastRemoval)return;const {id,index,price}=state.shop.lastRemoval;if(!cards[id]||!Number.isInteger(index)||!Number.isInteger(price))return;state.deck.splice(Math.min(index,state.deck.length),0,id);state.gold+=price;state.shop.removed=Math.max(0,state.shop.removed-1);state.shop.lastRemoval=null;log('↩ '+cards[id].name+' 삭제 취소 · '+price+'G 반환');save();render()}
function cardPrice(id){return cards[id]?.family==='fusion'?55:cards[id]?.cost>=2?31:24}
function restAction(kind,id){if(state.phase!=='rest')return;
 if(kind==='heal')heal(24);
 else if(kind==='upgrade'){if(!id||!availableUpgrades().includes(id))return;state.upgrades[id]=true;log('✨ '+cards[id].name+' 강화!')}
 else if(kind==='recover'){if(state.workFatigue<=0)return;state.workFatigue=Math.max(0,state.workFatigue-3);log('🌿 휴식: 피로도 -3')}
 else return;nextStage();
}
function selectEvent(option){if(state.phase!=='event')return;
 const id=state.eventId??0;let ok=true;
 if(id===0){if(option===0){state.maxHp+=10;state.hp+=10;addFatigue(2)}else if(option===1){state.gold+=80;state.hp=Math.max(1,state.hp-6)}else if(option!==2)ok=false}
 else if(id===1){if(option===0){awardCard(shuffle(allCardKeys().filter(k=>cards[k].cost>=2))[0]);addFatigue(1)}else if(option===1)heal(12);else if(option!==2)ok=false}
 else if(id===2){if(option===0){if(state.gold<35)ok=false;else{state.gold-=35;const id=relicOptions(1)[0];if(id)gainRelic(id);else state.gold+=35}}else if(option===1){state.gold+=18;addFatigue(1)}else if(option!==2)ok=false}
 else if(id===3){if(option===0){heal(18);state.gold=Math.max(0,state.gold-10)}else if(option===1){awardCard(pair().sig);state.hp=Math.max(1,state.hp-8)}else if(option!==2)ok=false}
 else if(id===4){if(option===0){const del=state.deck.indexOf('fatigue');if(del>=0)state.deck.splice(del,1);else state.gold+=10} else if(option===1){state.gold+=30;state.hp=Math.max(1,state.hp-7)}else if(option!==2)ok=false}
 else if(id===5){if(option===0){const id=shuffle(availableUpgrades())[0];if(id){state.upgrades[id]=true;log('✨ '+cards[id].name+' 무료 강화')}else heal(12)}else if(option===1){state.gold+=25;addFatigue(1)}else if(option!==2)ok=false}
 else if(id===6){if(option===0){heal(15);state.deck.push('fatigue')}else if(option===1){state.gold+=30;state.hp=Math.max(1,state.hp-5)}else if(option!==2)ok=false}
 else if(id===7){if(option===0){if(state.gold<18)ok=false;else{state.gold-=18;const j=state.deck.indexOf('fatigue');if(j>=0)state.deck.splice(j,1);else heal(8)}}else if(option===1){state.hp=Math.max(1,state.hp-5);state.gold+=15}else if(option!==2)ok=false}
 else if(id===8){if(option===0||option===1){const j=option===0?state.real:state.fantasy;const pool=allCardKeys().filter(k=>cards[k].job===j);if(pool.length){awardCard(shuffle(pool)[0]);state.deck.push('fatigue')}}else if(option===2)heal(6);else ok=false}
 else if(id===9){if(option===0){const r=relicOptions(1)[0];if(state.gold<45||!r)ok=false;else{state.gold-=45;gainRelic(r)}}else if(option===1){state.gold+=30;state.deck.push('fatigue','fatigue')}else if(option!==2)ok=false}
 else if(id===10){if(option===0){state.gold+=35;state.hp=Math.max(1,state.hp-9)}else if(option===1){state.maxHp+=6;state.hp+=6;state.deck.push('fatigue')}else if(option===2)heal(5);else ok=false}
 else if(id===11){if(option===0||option===1){const j=option===0?state.real:state.fantasy;const pool=availableUpgrades().filter(k=>cards[k].job===j);if(!pool.length||(option===1&&state.gold<15))ok=false;else{const cid=shuffle(pool)[0];state.upgrades[cid]=true;log('✨ '+cards[cid].name+' 강화');if(option===0)state.hp=Math.max(1,state.hp-4);else state.gold-=15}}else if(option===2)state.gold+=10;else ok=false}
 else if(id===12){if(option===0){if(Math.random()<0.5)state.gold+=50;else state.gold=Math.max(0,state.gold-10)}else if(option===1)state.gold+=12;else if(option!==2)ok=false}
 else if(id===13){if(option===0){state.maxHp+=8;state.hp=Math.max(1,state.hp-8);state.deck.push('fatigue')}else if(option===1){awardCard(pair().sig);state.deck.push('fatigue')}else if(option===2)heal(8);else ok=false}
  else if(id===14){if(option===0){state.gold+=36;state.deck.push('fatigue')}else if(option===1){state.hp=Math.min(state.maxHp,state.hp+14)}else if(option===2)state.gold+=6;else ok=false}
  else if(id===15){if(option===0){awardCard('goldAudit');state.gold+=8}else if(option===1){if(state.gold<18)ok=false;else{state.gold-=18;state.maxHp+=6;state.hp+=6}}else if(option===2)state.gold+=8;else ok=false}
  else if(id===16){if(option===0){awardCard('infernalMenu');state.deck.push('fatigue')}else if(option===1){state.hp=Math.min(state.maxHp,state.hp+16);state.gold=Math.max(0,state.gold-8)}else if(option===2)state.gold+=8;else ok=false}
  else if(id===17){if(option===0){awardCard('grandFeast');state.deck.push('fatigue')}else if(option===1){const pool=availableUpgrades().filter(k=>['chef','alchemist'].includes(cards[k].job));if(!pool.length)ok=false;else{state.upgrades[pool[0]]=true;state.hp=Math.max(1,state.hp-5)}}else if(option===2)state.gold+=8;else ok=false}
 if(ok)nextStage();else render();
}
function restart(){state=null;savedRun=null;safeRemove(KEY);modal='';pendingAction=null;render()}
// v0.6.15: presentation preferences are separate from the saved run.
let readableBattle=false, fullscreenPending=false, fullscreenNotice='', viewportFrame=0;
readableBattle=!!saveCache?.settings?.readableBattle;
const fullscreenActive=()=>!!(document.fullscreenElement||document.webkitFullscreenElement);
const mobileDevice=()=>window.innerWidth<=700||(navigator.maxTouchPoints>0&&Math.min(screen.width,screen.height)<=700);
function safeInsets(){
 const probe=document.createElement('div');probe.style.cssText='position:fixed;visibility:hidden;pointer-events:none;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)';
 document.body.appendChild(probe);const css=getComputedStyle(probe),n=(parseFloat(css.paddingTop)||0)+(parseFloat(css.paddingBottom)||0);probe.remove();return n;
}
function mobileBattleFits(){return window.innerWidth>=320&&window.innerWidth<=700&&!readableBattle&&(window.visualViewport?.scale||1)<=1.25&&(window.visualViewport?.height||window.innerHeight)-safeInsets()>=640}
function syncBattleViewport(){
 const height=window.visualViewport?.height||window.innerHeight;
 document.documentElement.style.setProperty('--game-height',height+'px');
 const compact=(combatPlayback?.current?.state||state)?.phase==='battle'&&mobileBattleFits();
 document.body.classList.toggle('mobile-stage',!!compact);
 return compact;
}
function scheduleBattleViewport(){
 if(viewportFrame)return;
 viewportFrame=requestAnimationFrame(()=>{viewportFrame=0;const before=document.body.classList.contains('mobile-stage'),after=syncBattleViewport();
  if(before!==after){cleanGesture();render()}else{updateHandNavigation();if(selectedCard)revealHandCard(selectedCard.index)}
 });
}
window.addEventListener('resize',scheduleBattleViewport,{passive:true});
window.visualViewport?.addEventListener('resize',scheduleBattleViewport,{passive:true});
function screenNotice(message){
 fullscreenNotice=message;let el=document.querySelector('.screen-notice');
 if(!el){el=document.createElement('div');el.className='screen-notice';el.setAttribute('role','status');document.body.appendChild(el)}
 el.textContent=message;clearTimeout(screenNotice.timer);screenNotice.timer=setTimeout(()=>el.remove(),4200);
 if(modal==='battleMenu')render();
}
function requestGameFullscreen(){
 if(fullscreenActive()||fullscreenPending)return;
 const root=document.documentElement,request=root.requestFullscreen||root.webkitRequestFullscreen;
 if(!request||document.fullscreenEnabled===false||document.webkitFullscreenEnabled===false){screenNotice('전체화면을 지원하지 않는 환경입니다. 일반 화면으로 계속할게요.');return}
 fullscreenPending=true;
 try{
  const result=root.requestFullscreen?request.call(root,{navigationUI:'hide'}):request.call(root);
  Promise.resolve(result).then(()=>{fullscreenPending=false;scheduleBattleViewport()},()=>{fullscreenPending=false;screenNotice('전체화면으로 전환하지 못했어요. 메뉴에서 다시 시도할 수 있어요.')});
 }catch{fullscreenPending=false;screenNotice('전체화면으로 전환하지 못했어요. 일반 화면으로 계속할게요.')}
}
function toggleGameFullscreen(){
 if(!fullscreenActive()){requestGameFullscreen();return}
 const exit=document.exitFullscreen||document.webkitExitFullscreen;
 try{Promise.resolve(exit?.call(document)).catch(()=>screenNotice('전체화면을 종료하지 못했어요. 브라우저의 뒤로 가기 또는 Esc를 사용해 주세요.'))}catch{screenNotice('브라우저의 뒤로 가기 또는 Esc로 전체화면을 종료해 주세요.')}
}
for(const name of ['fullscreenchange','webkitfullscreenchange'])document.addEventListener(name,()=>{
 fullscreenPending=false;fullscreenNotice='';document.querySelector('.screen-notice')?.remove();scheduleBattleViewport();
 document.querySelectorAll('[data-fullscreen-label]').forEach(el=>{el.textContent=fullscreenActive()?'전체화면 종료':'전체화면'});
});
function battleMenuMarkup(){return `<h2>게임 메뉴</h2><div class="battle-menu-grid"><button class="btn" data-act="saveManager">저장 및 백업</button><button class="btn" data-act="releaseAbout">게임 소개 · 문의</button><button class="btn" data-act="fullscreen" data-fullscreen-label>${fullscreenActive()?'전체화면 종료':'전체화면'}</button><button class="btn" data-act="readingMode" aria-pressed="${readableBattle}">${readableBattle?'한 화면 모드로':'큰 카드 · 스크롤 모드'}</button><button class="btn" data-act="guide">규칙 안내</button>${state?`<button class="btn" data-act="deck">덱 ${state.deck.length}장</button><button class="btn" data-act="relics">유물 ${state.relics.length}개</button><button class="btn" data-act="log">전투 기록</button>${state.tutorial?'<button class="btn" data-act="mobileTutorial">튜토리얼</button>':''}<button class="btn danger" data-act="restartPrompt">도전 재시작</button>`:''}</div><p class="screen-help">시작·이어하기 시 모바일 전체화면을 시도해요. 종료 후에는 메뉴에서 직접 다시 켤 수 있어요. 화면이 낮거나 확대된 경우에는 스크롤 모드를 사용해요.</p>${fullscreenNotice?`<p role="status">${esc(fullscreenNotice)}</p>`:''}`}
// v0.6.21: the action hint and energy preview share live combat costs.
const ENERGY_ART=["assets/energy-battery-0-e0991b68df0d609b.svg", "assets/energy-battery-1-111f3700e64420c3.svg", "assets/energy-battery-2-625c5bb3a2854c89.svg", "assets/energy-battery-3-346ce767847b9cda.svg", "assets/energy-battery-4-cb24fc2c020e33ba.svg"];
function battleAvailability(){
 const usable=state.hand.filter(id=>id!=='fatigue');
 const canPlay=usable.some(id=>getCost(id)<=state.energy);
 const canOvertime=!canPlay&&usable.length>0&&overtimeStatus().ok;
 return {canPlay,canOvertime,endReady:!canPlay&&!canOvertime};
}
function energyMarkup(){
 const energy=state.energy,level=Math.min(4,Math.max(0,energy)),cost=selectedCard?getCost(selectedCard.id):null;
 let detail='매 턴 기본 3',after=null;
 if(selectedCard){
  if(selectedCard.id==='fatigue')detail='피로 카드는 사용 불가';
  else if(cost>energy)detail='비용 '+cost+' · '+(cost-energy)+' 부족';
  else if(selectionProjection){after=selectionProjection.after.energy;detail='사용 후 '+after+' · 비용 '+cost;}
 }
 return `<div class="energy-meter energy-orb ${energy===0?'empty':''} ${cost!==null&&cost>energy?'insufficient':''}" data-energy="${energy}" data-energy-state="${level}" role="status" aria-live="polite" aria-atomic="true" aria-label="남은 에너지 ${energy}. ${detail}"><span class="energy-art" aria-hidden="true"><img src="${ENERGY_ART[level]}" alt="" width="72" height="42"/></span><span class="energy-copy"><span class="energy-label">남은 에너지</span><span class="energy-value"><b>${energy}</b>${after!==null?`<span class="energy-after">→ <strong>${after}</strong></span>`:''}</span><small class="energy-detail">${detail}</small></span></div>`;
}
function animateEnergy(previous){
 const meter=document.querySelector('.energy-meter');if(!previous||!meter||reducedMotion())return;
 const value=Number(meter.dataset.energy);if(value===previous.value)return;
 meter.classList.add(value>previous.value?'energy-gain':'energy-spend');
 if(previous.src){const ghost=document.createElement('img');ghost.src=previous.src;ghost.alt='';ghost.className='energy-previous';meter.querySelector('.energy-art').appendChild(ghost);setTimeout(()=>ghost.remove(),260)}
}
function mobileResourcesMarkup(){
 const resources=JOB_GUIDE[keyPair()].resources.map(k=>`<button data-act="status" data-key="${k}" aria-label="${TERMS[k].name} ${resValue(k)}. 설명 보기"><span>${statIcon(k)} <b>${resValue(k)}</b></span><small>${TERMS[k].name}${k==='debt'||k==='curse'?'·대상':''}</small></button>`).join('');
 const ot=overtimeStatus();
 return `<section class="mb-resources" aria-label="직업 자원과 겸직">${resources}<button data-act="status" data-key="fatigueGauge" class="${state.workFatigue>=3?'warn':''}" aria-label="피로도 ${state.workFatigue}/6. ${fatigueNote(state.workFatigue)}"><span>${statIcon('fatigue')} <b>${state.workFatigue}/6</b></span><small>피로도</small></button><button data-act="status" data-key="synergy" class="mb-dual ${state.dualTurnUsed?'done':''}" aria-label="현실 ${state.usedReal?'충족':'미충족'}, 판타지 ${state.usedFantasy?'충족':'미충족'}, 겸직 ${state.dualTurnUsed?'발동 완료':'대기'}. 상세 보기"><span>${state.usedReal?'✓':'○'} 현실 ${state.usedFantasy?'✓':'○'} 판타지</span><small>${state.dualTurnUsed?'✦ 겸직 발동':state.usedReal?'판타지 쓰면 발동':state.usedFantasy?'현실 쓰면 발동':'두 계열 쓰면 발동'}</small></button><button class="mb-overtime" data-act="overtime" ${ot.ok?'':'disabled'} aria-label="초과근무: 에너지 +1, 피로도 +2, 전투당 1회. ${ot.ok?'사용 가능':esc(ot.reason)}"><b>초과근무</b><small>${ot.ok?'⚡+1 · ☾+2':state.overtimeUsed?'사용 완료':'과로 · 사용 불가'}</small></button></section>`;
}
// v0.6.15: reuse the same simulation as casting; previews never mutate the run.
function mobileSelectionOutcome(){
 const reason=selectionReason();if(reason)return reason;
 const p=selectionProjection;if(!p)return '상세에서 카드 효과를 확인해 주세요.';
 const parts=[],before=state,after=p.after;
 if(p.terminal==='defeat')parts.push('⚠ 사용하면 패배');
 if(p.terminal==='victory')parts.push('전투 승리 예상');
 const damaged=before.enemies.map((e,i)=>({e,a:after.enemies[i]})).filter(({e,a})=>a&&a.hp<e.hp);
 if(damaged.length===1){const {e,a}=damaged[0];parts.push('피해 '+(e.hp-a.hp)+' · 적 HP '+e.hp+'→'+a.hp)}
 else if(damaged.length>1)parts.push('적 '+damaged.length+'명 · 총 '+damaged.reduce((n,{e,a})=>n+e.hp-a.hp,0)+' 피해');
 const block=after.block-before.block,hp=after.hp-before.hp;
 if(block)parts.push('방어 '+(block>0?'+':'')+block);
 if(hp)parts.push('내 HP '+before.hp+'→'+after.hp);
 const current=turnForecast(before);
 if(!p.terminal&&(current.net!==p.forecast.net||current.fatigue!==p.forecast.fatigue)){
  parts.push('이번 적 턴 피해 '+current.net+'→'+p.forecast.net);
  if(current.fatigue!==p.forecast.fatigue)parts.push('피로 카드 '+current.fatigue+'→'+p.forecast.fatigue);
 }
 for(const [key,label] of [['ingredient','재료'],['reagent','시약']]){const delta=after[key]-before[key];if(delta)parts.push(label+' '+(delta>0?'+':'')+delta)}
 for(const [key,label] of [['curse','저주'],['debt','미수금']]){
  const changes=before.enemies.map((e,i)=>(after.enemies[i]?.[key]||0)-(e[key]||0));
  const affected=changes.filter(Boolean);if(affected.length===1)parts.push(label+' '+(affected[0]>0?'+':'')+affected[0]);
  else if(affected.length>1)parts.push(label+' '+affected.length+'명 변동');
 }
 const draw=p.records.filter(r=>r.k==='draw').reduce((n,r)=>n+r.n,0);if(draw)parts.push('뽑기 +'+draw);
 const energy=after.energy-before.energy;if(energy>0)parts.push('에너지 +'+energy);
 if(!parts.length)parts.push('에너지 '+before.energy+'→'+after.energy);
 return parts.join(' · ');
}
function mobileSelectionMarkup(){
 if(!selectedCard){
  const available=battleAvailability();
  const heading=available.endReady?'사용할 카드가 없어요':available.canOvertime?'에너지 부족 · 초과근무 가능':'카드 선택 → 대상 탭';
  const message=available.endReady?'턴 종료를 누르면 새 손패와 에너지를 받아요.':available.canOvertime?'초과근무: 에너지 +1 · 피로도 +2':/^🚪 \d+명의 적 등장!/.test(state.message||'')||/체력 0 회복/.test(state.message||'')?'적의 행동을 확인하고 카드를 골라 주세요.':state.message||'적의 행동을 확인하고 카드를 골라 주세요.';
  return `<section class="quick-preview mb-selection idle"><div class="mb-selection-heading"><b>${heading}</b>${state.tutorial?'<button data-act="mobileTutorial">도움말</button>':''}</div><p class="mb-outcome" role="status">${esc(message)}</p></section>`;
 }
 const c=cards[selectedCard.id],reason=selectionReason(),p=selectionProjection,self=targetMode(selectedCard.id)==='self',hint=reason?'사용 불가':self?'나에게':'적에게';
 return `<section class="quick-preview mb-selection ${reason?'unavailable':''}" aria-label="선택한 카드와 실제 예상 결과"><div class="mb-selection-heading"><span class="mb-selection-title"><b>${esc(c.name)}</b><small>${hint}${p?.dual&&!reason?' · ✦ 겸직 포함':''}</small></span><button data-act="selectedDetails">상세</button>${self&&!reason?'<button class="primary" data-act="useSelected">사용</button>':''}<button data-act="cancelSelection" aria-label="선택 취소">✕</button></div><p class="mb-outcome" role="status" tabindex="0" aria-label="예상 결과">${esc(mobileSelectionOutcome())}</p></section>`;
}

function renderMobileBattle(){
 ensureTarget();const p=pair(),{incoming,net,fatigue,trainingBlock}=turnForecast(state),n=state.hand.length,{endReady}=battleAvailability();
 return `<main class="compact-battle redesign-battle c2-battle mobile-battle">
 <header class="mb-header"><span class="brand">겸직<b>금지!</b></span>${battleLocationMarkup()}<button data-act="battleMenu" aria-label="게임 메뉴 및 전체화면">☰</button></header>
 <section class="multi-arena mb-arena" aria-label="전투 전장"><div class="enemies-row count-${state.enemies.length}">${state.enemies.map(enemyMarkup).join('')}</div><div class="player-lane"><button data-act="targetSelf" class="hero-unit" aria-label="내 캐릭터 ${p.name}, 체력 ${state.hp}/${state.maxHp}, 방어 ${state.block}. 방어·회복 카드 사용 대상"><span class="hero-avatar">${heroMarkup()}</span><span class="hero-details"><b>${p.name}</b>${bar(state.hp,state.maxHp)}<span class="hero-health">${statIcon('health')}${state.hp}/${state.maxHp}<span class="block-chip">${statIcon('block')}${state.block}</span></span></span><span class="self-preview" aria-hidden="true">나에게 사용 ✓</span></button><div class="battle-sidebar"><button class="forecast ${net?'danger':'safe'}" data-act="status" data-key="intent" aria-label="적 턴 예상 피해 ${net}, 임시 피로 카드 ${fatigue}장. 행동 상세 보기"><small>이번 적 턴 ›</small><b>${net?'−'+net+' HP':'피해 0'}</b><small>${incoming?'공격 '+incoming+' − 방어 '+(state.block+trainingBlock):'공격 없음'}</small>${fatigue?`<small>피로 카드 +${fatigue}</small>`:''}</button></div></div></section>
 ${bossPhaseMarkup()}${mobileResourcesMarkup()}${mobileSelectionMarkup()}
 <section class="hand-toolbar mb-toolbar" aria-label="에너지와 턴 종료">${energyMarkup()}<button class="compact-button primary end-turn-btn ${endReady?'ready-pulse':''}" data-act="endTurn" aria-label="턴 종료${endReady?', 사용 가능한 카드 없음':''}">턴 종료 ➜</button></section>
 <section class="compact-hand mb-hand" aria-label="손패 ${n}장"><div class="hand-zone"><div class="hand fanned" data-hand-count="${n}" data-small-hand="${n<=5}" aria-label="손패. 카드 선택 후 대상 탭. 6장부터 좌우로 넘겨 탐색.">${state.hand.map(renderHandSlot).join('')||'<span class="empty">손패가 비었어요. 턴을 종료해 주세요.</span>'}</div></div>${handNavigationMarkup()}<div class="mb-hand-bottom"><span class="mb-hand-caption">손패 ${n}장${n>5?' · ↔ 좌우 탐색':' · 탭해서 선택'}</span><button class="mb-piles" data-act="deck" aria-label="덱 보기. 뽑을 카드 ${state.drawPile.length}장, 버린 카드 ${state.discard.length}장"><span class="pile-count"><img class="deck-back" src="${CARD_BACK}" alt=""/>덱 ${state.drawPile.length}</span><span class="discard-pile"><span class="discard-icon" aria-hidden="true"></span>버림 ${state.discard.length}</span></button></div></section>
 </main>`;
}

function header(){return `<header class="mast"><div><div class="mini">THE SECOND SHIFT · ROGUELITE</div><div class="brand">겸직<b>금지!</b> <span class="ver-tag">v0.6.21</span></div></div><div class="mast-buttons"><button class="btn small" data-act="battleMenu" aria-label="화면 설정 및 게임 메뉴">☰</button><button class="btn small" data-act="guide" aria-label="규칙 안내">❔ 규칙</button>${state?`<button class="btn small" data-act="deck" aria-label="내 덱 보기">🗂️ 덱 ${state.deck.length}</button><button class="btn small danger" data-act="restartPrompt" aria-label="도전 재시작">↻</button>`:''}</div></header>`}
// v0.6.15: selection belongs to the current screen, never to the saved run.
let journeyReward=null,journeyRoute=null;
let journeyDockObserver=null;
function bindJourneyDock(){
 journeyDockObserver?.disconnect();journeyDockObserver=null;
 const root=document.querySelector('.flow-screen'),dock=root?.querySelector('.journey-dock');if(!dock)return;
 const reserve=()=>root.style.setProperty('--journey-dock-height',(dock.getBoundingClientRect().height||100)+'px');reserve();
 if(window.ResizeObserver){journeyDockObserver=new ResizeObserver(reserve);journeyDockObserver.observe(dock)}
}
const routeNotes={battle:'적을 쓰러뜨리고 카드·급여 획득',elite:'강한 적과 전투 · 승리하면 유물 선택',shop:'골드로 카드·유물 구매 또는 덱 정리',rest:'체력·피로 회복 또는 카드 강화 중 하나',event:'선택에 따라 보상이나 손실 발생',boss:'인사부장 마왕과 마지막 전투'};
function flowHeader(){return header()}
function flowPairTile(k){
 const p=pairs[k],g=JOB_GUIDE[k],[real,fantasy]=k.split('-'),selected=k===pickReal+'-'+pickFantasy;
 return `<button type="button" class="career-tile ${selected?'selected':''}" data-act="pickPair" data-pair="${k}" aria-pressed="${selected}" aria-label="${p.name}, 규칙 복잡도 ${g.label}. ${g.core}"><span class="career-portrait" aria-hidden="true">${heroMarkup({real,fantasy})}</span><span class="career-name">${p.name}</span><span class="career-core">${g.core}</span><span class="career-level">${g.recommended?'첫 플레이 추천 · ':''}${g.label}</span><span class="career-check" aria-hidden="true">${selected?'✓':''}</span></button>`;
}
function flowPairDetail(k){const p=pairs[k],g=JOB_GUIDE[k];return `<details class="flow-details career-details"><summary>${p.name} · 직업 자세히</summary><div class="flow-detail-body"><p>${esc(g.style)}</p><h3>기본 전략</h3><ol>${g.strategy.map(s=>'<li>'+esc(s)+'</li>').join('')}</ol><h3>대표 카드 조합</h3>${comboMarkup(k)}<p>${esc(g.comboNote)}</p><h3>겸직 효과 · 턴당 1회</h3><p>${dualSummary(k)}</p><p class="flow-muted">복잡도는 자원과 규칙 관리의 난이도이며 직업의 강함을 뜻하지 않아요.</p></div></details>`}
function renderTitle(){
 const k=pickReal+'-'+pickFantasy,p=pairs[k],imp=importCandidate();
 const resume=savedRun?`<section class="journey-resume"><div><b>${pairs[savedRun.real+'-'+savedRun.fantasy].name}</b><small>${rooms[savedRun.stage].label} ${savedRun.stage+1}/9 · 체력 ${savedRun.hp}/${savedRun.maxHp}</small></div><button class="btn calm" data-act="resume">이어하기 →</button></section>`:imp?`<details class="flow-details legacy-import"><summary>이전 기록 가져오기 · ${pairs[imp.run.real+'-'+imp.run.fantasy].name}</summary><div class="flow-detail-body"><p>${esc(imp.label)} · 구역 ${imp.run.stage+1}/9. 원본을 보존하고 복사본으로 이어갑니다.</p><button class="btn calm" data-act="importRun">복사해서 이어하기</button></div></details>`:'';
 return `<main class="flow-screen title-flow">${flowHeader()}${resume}<section class="journey-intro"><span class="release-tag">공개 테스트</span><h1>퇴근했더니 <em>던전으로 출근?</em></h1><p>현실 × 판타지 직업으로 9개 구역을 돌파하세요.</p></section><section class="career-select" aria-labelledby="career-heading"><h2 id="career-heading">출근할 직업</h2><div class="career-grid">${JOB_ORDER.map(flowPairTile).join('')}</div></section>${flowPairDetail(k)}<p class="flow-muted flow-help">${meta.tutorialDone?'규칙은 메뉴에서 다시 볼 수 있어요.':'첫 전투에서 조작과 겸직을 알려드려요.'} 시작할 때 전체화면을 시도하며, 지원하지 않으면 일반 화면으로 진행해요.</p><p class="flow-record">승리 ${meta.wins||0} · 도전 ${meta.attempts||0} · 경험한 직업 ${meta.combos.length}/4</p><div class="release-links"><button class="btn small" data-act="saveManager">저장 및 백업</button><button class="btn small" data-act="releaseAbout">게임 소개 · 문의</button></div><footer class="journey-dock start-dock"><div class="dock-copy" aria-live="polite"><b>${p.name}</b><small>${savedRun?'새 출근 시 기존 진행을 덮어씁니다.':'선택한 직업 · 자동 저장'}</small></div><button class="btn primary" data-act="start" aria-label="${p.name} · 출근하기">출근하기 →</button></footer></main>`;
}
function validJourneyReward(){return journeyReward&&state?.phase==='reward'&&journeyReward.run===state&&journeyReward.stage===state.stage&&state.rewardOptions[journeyReward.index]===journeyReward.id}
function renderReward(){
 if(!validJourneyReward())journeyReward=null;
 const id=journeyReward?.id,c=cards[id];
 const detail=c?`<div class="reward-copy" aria-live="polite"><h2>${esc(c.name)}</h2><p>${esc(c.desc)}</p><small>내 덱에 ${state.deck.filter(x=>x===id).length}장 보유 · 획득 후 ${state.deck.length+1}장</small><button class="reward-more" data-act="inspectReward" data-index="${journeyReward.index}">카드 상세 보기 ›</button></div>`:'<div class="reward-copy reward-empty"><p>카드를 선택하면 효과와 획득 버튼이 표시됩니다.</p></div>';
 return `<main class="flow-screen reward-flow">${flowHeader()}<section class="journey-panel"><div class="flow-kicker">${rooms[state.stage].label} 완료 · 다음: ${rooms[state.stage+1]?.label||'퇴근'}</div><h1>업무 해결!</h1><p class="flow-lead">카드 1장 또는 급여 8G를 선택하세요.</p>${pstats()}<div class="reward-grid journey-rewards">${state.rewardOptions.map((card,i)=>renderCard(card,{reward:true,index:i}).replace('data-act="inspectReward"','data-act="selectJourneyReward" aria-pressed="'+(journeyReward?.index===i)+'"').replace('class="card ','class="card '+(journeyReward?.index===i?'reward-picked ':'')).replace('⊕ 상세',journeyReward?.index===i?'✓ 선택됨':'선택')).join('')}</div>${detail}</section><footer class="journey-dock reward-dock"><button class="btn calm" data-act="reward" data-index="-1">건너뛰고 +8G</button><button class="btn primary" data-act="takeJourneyReward" ${c?'':'disabled'}>${c?esc(c.name)+' 획득':'카드를 선택하세요'}</button></footer></main>`;
}
function validJourneyRoute(){return journeyRoute&&state?.phase==='map'&&journeyRoute.run===state&&journeyRoute.stage===state.stage&&mapRows[state.stage]?.[journeyRoute.index]===journeyRoute.type}
function floorSpecialMarkup(level){
 const info=FLOOR_DECISIONS[level];if(!info)return '';
 const picked=state.floorDecisions?.[level];const pending=floorDecisionPending(level);
 return '<section class="floor-special" aria-label="구역 특수 선택"><h2>'+info.title+'</h2><p>'+info.desc+'</p><div class="floor-special-options">'+info.options.map((entry,i)=>'<button type="button" class="floor-special-choice" data-act="floorDecision" data-choice="'+i+'" '+(pending?'':'disabled')+' aria-pressed="'+(picked===i)+'"><b>'+entry[0]+'</b><small>'+entry[1]+'</small></button>').join('')+'</div><p class="floor-special-feedback" role="status">'+(pending?'선택 후 경로를 이동할 수 있어. 선택은 되돌릴 수 없어.':'✓ 결재 완료 · 다음 구역까지 효과 유지')+'</p></section>';
}
function bossPhaseMarkup(){return state.nodeType==='boss'&&state.bossPhase===2?'<div class="boss-phase" role="status">🚨 인사부장 2페이즈 · 겸직 적발 중! 현실·판타지 카드를 둘 다 사용해 피해를 줄이자.</div>':''}
function renderMap(){
 if(!validJourneyRoute())journeyRoute=null;
 const level=state.stage,room=rooms[level],selected=journeyRoute?nodeInfo[journeyRoute.type]:null;
 const route=mapRows.map((row,i)=>`<li class="route-overview-row ${i===level?'current':i<level?'past':''}"><b>${i+1}</b><div><strong class="route-floor-name">${esc(rooms[i].label)}</strong><small class="route-floor-desc">${esc(rooms[i].desc)}</small>${row.map((type,j)=>`<span class="route-stop ${state.path?.[i]?.choice===j?'visited':''}">${state.path?.[i]?.choice===j?'✓ ':''}${nodeInfo[type].icon} ${nodeInfo[type].label}</span>`).join('')}</div>${i===level?'<small>현재</small>':''}</li>`).join('');
 const history=(state.path||[]).slice(0,level).map((x,i)=>x?`${rooms[i].label} · ${nodeInfo[x.type]?.label||''}`:'').filter(Boolean).join(' → ');
 return `<main class="flow-screen map-flow">${flowHeader()}<section class="journey-panel"><div class="flow-kicker">구역 ${level+1}/9</div><h1>${esc(room.label)}</h1>${pstats()}<p class="flow-lead floor-intro">${room.line?`<strong>${esc(room.speaker)}</strong> “${esc(room.line)}”`:esc(room.desc)}</p>${level===2?'<p class="floor-special-feedback">🖨️ 복사실 전투 특전 · 전투를 선택하면 융합 카드 임시 사본을 손패에 1장 추가해. 영구 덱에는 남지 않아.</p>':''}${floorSpecialMarkup(level)}<div class="current-routes" aria-label="현재 선택 가능한 목적지">${mapRows[level].map((type,index)=>{const n=nodeInfo[type],picked=journeyRoute?.index===index;return `<button type="button" class="route-choice ${picked?'selected':''}" data-act="selectJourneyRoute" data-index="${index}" aria-pressed="${picked}"><span class="route-symbol" aria-hidden="true">${n.icon}</span><span><b>${n.label}</b><small>${esc(routeHint(type,level))}</small></span><span class="route-check" aria-hidden="true">${picked?'✓':'›'}</span></button>`}).join('')}</div><details class="flow-details route-overview"><summary>전체 경로 보기 · 9개 구역</summary><ol>${route}</ol></details>${history?`<p class="route-history">지나온 길 · ${esc(history)}</p>`:''}</section><footer class="journey-dock route-dock"><div class="dock-copy" aria-live="polite"><b>${selected?selected.label:'목적지를 선택하세요'}</b><small>${selected?esc(routeNotes[journeyRoute.type]):'이동하면 되돌릴 수 없어요.'}</small></div><button class="btn primary" data-act="goJourneyRoute" ${selected&&!floorDecisionPending()?'':'disabled'}>이동하기 →</button></footer></main>`;
}
function handleJourneyAction(act,el){
 if(modal)return false;
 if(act==='selectJourneyReward'){
  if(state?.phase!=='reward')return true;const index=Number(el.dataset.index),id=state.rewardOptions[index];if(!Number.isInteger(index)||!cards[id])return true;
  journeyReward={run:state,stage:state.stage,index,id};render();document.querySelector('.journey-rewards [data-index="'+index+'"]')?.focus({preventScroll:true});return true;
 }
 if(act==='takeJourneyReward'){
  if(validJourneyReward()){const index=journeyReward.index;journeyReward=null;pickReward(index)}return true;
 }
 if(act==='floorDecision'){
   if(state?.phase==='map')takeFloorDecision(state.stage,Number(el.dataset.choice));return true;
  }
  if(act==='selectJourneyRoute'){
  if(state?.phase!=='map')return true;const index=Number(el.dataset.index),type=mapRows[state.stage]?.[index];if(!Number.isInteger(index)||!type)return true;
  journeyRoute={run:state,stage:state.stage,index,type};render();document.querySelector('.current-routes [data-index="'+index+'"]')?.focus({preventScroll:true});return true;
 }
 if(act==='goJourneyRoute'){
  if(validJourneyRoute()){const index=journeyRoute.index;journeyRoute=null;chooseNode(index);maybeJobBrief()}return true;
 }
 return false;
}

function bar(v,max){return `<div class="hp-rail"><div class="hp-fill" style="width:${Math.max(0,Math.min(100,100*v/Math.max(1,max)))}%"></div></div>`}
function stageStrip(){return `<div class="stage-strip" aria-label="진행 상황">${rooms.map((r,i)=>`<div class="stage-node ${i===state.stage?'now':i<state.stage?'done':''}">${i<state.stage?'✓ ':''}${i+1}<small>${r.label}</small></div>`).join('')}</div>`}
function fatigueNote(v){return v>=5?'초과근무 불가':v>=3?'다음 전투 시작 손패 −1':'불이익 없음'}
function pstats(){return `<div class="statbar"><span class="pill red">${statIcon('health')} ${state.hp}/${state.maxHp}</span><span class="pill gold">🪙 ${state.gold}G</span><span class="pill purple">🃏 ${state.deck.length}장</span><span class="pill mint">✨ 겸직 ${state.synergies||0}회</span><button class="pill stat-token ${state.workFatigue>=3?'red':''}" data-act="status" data-key="fatigueGauge" aria-label="피로도 설명">💤 피로도 ${state.workFatigue||0}/6 · ${fatigueNote(state.workFatigue||0)}</button></div>`}
const resChip=k=>`<span class="res-chip res-${k}">${TERMS[k].icon} ${TERMS[k].name}</span>`;
const miniCard=id=>`<span class="mini-card ${cards[id].family}">${cards[id].icon} ${esc(cards[id].name)}</span>`;
const comboMarkup=k=>`<div class="combo">${JOB_GUIDE[k].combo.map(miniCard).join('<span class="combo-arrow" aria-hidden="true">→</span>')}</div>`;
function intentText(e){const i=intentInfo(e);return i.icon+' '+i.text+(i.sub?' · '+i.sub:'')}
const TERMS={
 block:{name:'방어',icon:'🛡️',desc:'적의 공격 피해를 먼저 흡수해. 남은 방어는 다음 내 턴이 시작될 때 0이 돼.'},
 debt:{name:'미수금',icon:'📋',desc:'적에게 쌓는 표식(적마다 따로). 미수금 회수·지옥의 세무조사는 미수금에 비례해 추가 피해를 주고 미수금을 전부 소모해. 최대 40.'},
 curse:{name:'저주',icon:'🕯️',desc:'적에게 쌓는 표식. 내가 턴을 끝내면 적이 행동하기 전에 중첩×2 피해를 주고 1 줄어. 밤의 파동·검은 일식은 저주에 비례해 강해져.'},
 ingredient:{name:'재료',icon:'🥕',desc:'요리사 카드가 모으는 내 자원. 화염 불쇼·도시락 등이 소모해 피해나 회복을 키워. 전투가 끝나면 0. 최대 12.'},
 reagent:{name:'시약',icon:'🧪',desc:'연금술사 카드가 모으는 내 자원. 연금 폭발 등이 최대 2개씩 소모해 피해·회복을 키워. 전투가 끝나면 0. 최대 12.'},
 draw:{name:'카드 뽑기',icon:'🎴',desc:'뽑을 덱에서 카드를 가져와. 덱이 비면 버린 카드를 섞어 새 덱을 만들어. 손패는 최대 10장.'},
 health:{name:'체력',icon:'❤️',desc:'전투가 끝나도 유지돼. 0이 되면 이번 도전은 끝나. 최대 체력 이상은 회복되지 않아.'},
 energy:{name:'에너지',icon:'⚡',desc:'카드 왼쪽 위 숫자만큼 소모해. 매 턴 3으로 돌아와. 모자라면 카드가 잠겨. 초과근무로 전투당 1번 +1.'},
 fatigue:{name:'피로 카드',icon:'🥱',desc:'사용할 수 없는 방해 카드. 손패 한 칸을 차지해. 적의 📜 특수 공격은 이번 전투 동안만 임시로 넣고, 일부 이벤트 선택지는 덱에 영구히 넣어. 영구 피로 카드는 상점 덱 정리나 일부 이벤트로 없앨 수 있어.'},
 fatigueGauge:{name:'피로도',icon:'💤',desc:'초과근무를 하면 쌓이는 0~6 게이지로, 다음 전투까지 이어져. 3 이상: 전투 시작 손패 5장 중 1장이 임시 피로 카드. 5 이상: 초과근무 불가. 전투 승리 시 −1, 휴식의 「피로 회복」으로 −3.'},
 synergy:{name:'겸직 (자동)',icon:'✨',desc:'같은 턴에 「현실」 카드와 「판타지」 카드를 각각 1장 이상 쓰면 융합 직업의 겸직 효과가 자동으로 발동해. 턴당 1번. 공용·융합 카드는 조건에 들어가지 않아.'},
 intent:{name:'적 행동 예고',icon:'👁️',desc:'턴을 끝내면 적이 현재 예고대로 행동해. 공격은 내 방어가 먼저 흡수해. 충전·야근 예고는 이번 턴 공격 없이 다음 행동을 준비해. 보호는 표시된 대상에게 방어를 부여해. 피로 공격은 막아도 임시 피로 카드를 넣으며 피로도 게이지와는 별개야. 적 방어는 다음 적 턴이 시작될 때 사라져.'},
 overtime:{name:'초과근무',icon:'☕',desc:'전투당 1번 쓸 수 있는 특수 행동. 즉시 에너지 +1, 대가로 피로도 +2. 피로도 5 이상이면 쓸 수 없어. 겸직과는 따로 계산돼(겸직 효과를 키우지 않아).'}
};
let inspected=null,statusKey='';
const toneName={real:'현실 직업',fantasy:'판타지 직업',fusion:'융합 기술',neutral:'공용 카드'};
const TERM_HINTS={block:/방어/,debt:/미수금/,curse:/저주/,ingredient:/재료/,reagent:/시약/,draw:/카드 .*뽑기|카드 \d장|드로우/,health:/체력|생명력/,energy:/에너지/,fatigue:/피로|사용 불가/};
function termsFor(id){const d=cards[id].desc;return Object.keys(TERM_HINTS).filter(k=>TERM_HINTS[k].test(d))}
function termButton(key,label){const t=TERMS[key];if(!t)return '';return `<button class="pill stat-token" data-act="status" data-key="${key}" title="${esc(t.desc)}" aria-label="${t.name} 설명 보기">${label||t.icon+' '+t.name} <span aria-hidden="true">ⓘ</span></button>`}
// C2.2 전투 피드백: 실제 효과 기록(fxRec)을 읽어 표시한다. 광역 공격은 맞은 적마다, 처치는 「처치!」,
// 적 턴은 저주 → 적 방어 → 내가 받은 공격 순서로 짧게 이어서 보여 준다. 동작 최소화 설정이면 숫자 연출 없이 메시지 줄로만 알린다.
function showFx(before, kind='card'){
 const r=fxRec||[];fxRec=null;
 if(!before||!state||state.phase!=='battle')return;const layer=document.getElementById('fx-layer');if(!layer||reducedMotion())return;
 const at=(selector,label,cls,delay=0,dy=0)=>setTimeout(()=>{const el=document.querySelector(selector);if(!el)return;const rect=el.getBoundingClientRect(),item=document.createElement('div');item.className='fx-pop '+cls;item.textContent=label;item.style.left=Math.max(6,Math.min(innerWidth-70,rect.left+rect.width/2-22))+'px';item.style.top=Math.max(10,rect.top+rect.height/2-26+dy)+'px';layer.appendChild(item);setTimeout(()=>item.remove(),820)},delay);
 const flair=(selector,delay=0)=>setTimeout(()=>{const el=document.querySelector(selector);if(!el)return;const rect=el.getBoundingClientRect(),item=document.createElement('div');item.className='fx-flare';item.style.width=item.style.height='64px';item.style.left=(rect.left+rect.width/2-32)+'px';item.style.top=(rect.top+rect.height/2-32)+'px';layer.appendChild(item);setTimeout(()=>item.remove(),480)},delay);
 const shake=(selector,cls,delay=0)=>setTimeout(()=>{const el=document.querySelector(selector);if(!el)return;el.classList.remove(cls);void el.offsetWidth;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),520)},delay);
 const E=i=>'.enemy-unit[data-target="'+i+'"]';
 if(kind==='endTurn'){
  let t=0;const STEP=200;
  for(const x of r){
   if(x.k==='tick'){at(E(x.i),'🕯 −'+x.n,'curse',t);if(x.kill)at(E(x.i),'처치!','kill',t+120,-26);t+=STEP}
   else if(x.k==='eguard'){at(E(x.i),'🛡 +'+x.n,'block',t);t+=STEP}
   else if(x.k==='prepare'){at(E(x.i),x.label,'curse',t);t+=STEP}
   else if(x.k==='hit'){shake(E(x.i),'lunge',t);if(x.dealt>0){at('.hero-unit','−'+x.dealt,'damage',t+90);shake('.hero-unit .hero-avatar','hero-hit',t+90)}if(x.absorbed)at('.hero-unit','🛡 '+x.absorbed+' 막음','block',t+150,34);t+=STEP}
  }
  return;
 }
 const hits={};for(const x of r)if(x.k==='dmg'){(hits[x.i]=hits[x.i]||[]).push(x)}
 Object.entries(hits).forEach(([i,xs],n)=>{const d=xs.reduce((a,x)=>a+x.dealt,0),b=xs.reduce((a,x)=>a+x.blocked,0),kill=xs.some(x=>x.kill);const delay=n*70;
  at(E(i),d>0?'−'+d:'🛡 막힘','damage',delay);if(b&&d>0)at(E(i),'🛡'+b,'block',delay+60,22);flair(E(i),delay);if(kill)at(E(i),'처치!','kill',delay+140,-28)});
 const debt={},cur={};for(const x of r){if(x.k==='debt')debt[x.i]=(debt[x.i]||0)+x.n;if(x.k==='curse')cur[x.i]=(cur[x.i]||0)+x.n}
 Object.entries(debt).forEach(([i,n])=>at(E(i),'📋+'+n,'status',220,40));Object.entries(cur).forEach(([i,n])=>at(E(i),'🕯+'+n,'curse',260,40));
 const hpd=state.hp-before.hp;if(hpd>0)at('.hero-unit','+'+hpd,'heal');if(hpd<0)at('.hero-unit',''+hpd,'damage');
 if(state.block>before.block)at('.hero-unit','🛡 +'+(state.block-before.block),'block',60,22);
 const res=r.filter(x=>x.k==='ingredient'||x.k==='reagent');if(res.length){const ing=res.filter(x=>x.k==='ingredient').reduce((a,x)=>a+x.n,0),rea=res.filter(x=>x.k==='reagent').reduce((a,x)=>a+x.n,0);if(ing)at('.res-pill.res-ingredient','🥕+'+ing,'status',80);if(rea)at('.res-pill.res-reagent','🧪+'+rea,'status',80)}
 if((state.synergies||0)>before.synergies)flair('.dual-meter');
}
function snapshot(){return !state?null:{hp:state.hp,block:state.block,synergies:state.synergies||0,targetIndex:state.targetIndex}}
function flyingCard(el,mode,targetIndex){if(!el||!(el instanceof Element)||!el.animate||reducedMotion())return;const box=el.getBoundingClientRect(),target=document.querySelector(mode==='self'?'.hero-unit':'.enemy-unit[data-target="'+targetIndex+'"]')?.getBoundingClientRect();if(!target)return;const g=el.cloneNode(true);g.classList.remove('deal','denied');g.classList.add('fx-card-fly');g.removeAttribute('data-act');g.removeAttribute('data-index');g.setAttribute('aria-hidden','true');g.tabIndex=-1;Object.assign(g.style,{left:box.left+'px',top:box.top+'px',width:box.width+'px',height:box.height+'px'});document.body.appendChild(g);const dx=target.left+target.width/2-box.left-box.width/2,dy=target.top+target.height/2-box.top-box.height/2;const anim=g.animate([{transform:'translate3d(0,0,0) scale(1)',opacity:.9},{transform:`translate3d(${dx*.55}px,${dy*.55-30}px,0) rotate(8deg) scale(.88)`,opacity:1,offset:.65},{transform:`translate3d(${dx}px,${dy}px,0) rotate(20deg) scale(.2)`,opacity:0}],{duration:260,easing:'ease-in',fill:'forwards'});anim.onfinish=()=>g.remove();setTimeout(()=>g.remove(),400)}
const reducedMotion=()=>!!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
// v0.6.15: committed run state and transient presentation frames are separate.
let combatCapture=null,combatPlayback=null,holdCombatRender=false,paintingCombatFrame=false;
const cloneCombat=s=>JSON.parse(JSON.stringify(s));
function captureCombatBeat(kind,index,label){
 if(!combatCapture)return;
 const records=(fxRec||[]).slice(combatCapture.cursor);combatCapture.cursor=(fxRec||[]).length;
 const previous=combatCapture.beats.at(-1)?.state||combatCapture.before;
 const fallen=(state.enemies||[]).flatMap((e,i)=>e.hp<=0&&previous.enemies?.[i]?.hp>0?[i]:[]);
 combatCapture.beats.push({kind,index,label,state:cloneCombat(state),records,fallen,duration:kind==='tick'?160:kind==='dual'?600:kind==='start'?120:kind==='revive'?280:300});
}
function combatCanAnimate(){return !reducedMotion()&&!document.hidden&&(document.querySelector('.multi-arena')?.getBoundingClientRect().width||0)>0}
function combatPop(selector,text,cls=''){const node=document.querySelector(selector);if(!node)return;const n=document.createElement('span');n.className='combat-pop '+cls;n.textContent=text;n.setAttribute('aria-hidden','true');node.appendChild(n)}
// Decorative cues read captured results only; no game state or extra playback timers.
function battleCue(root,selector,type){
 if(reducedMotion())return;
 const unit=root.querySelector(selector),anchor=unit?.querySelector('.enemy-avatar,.hero-avatar');
 if(!anchor||anchor.querySelector('.battle-cue.'+type))return;
 const cue=document.createElement('span');cue.className='battle-cue '+type;
 cue.setAttribute('aria-hidden','true');cue.innerHTML='<i></i><i></i><i></i>';anchor.appendChild(cue);
 if(type==='strike'&&unit.classList.contains('enemy-unit'))anchor.classList.add('battle-impact');
}
function paintBattleFeedback(root,beat){
 const enemies=new Map(),hero={damage:0,absorbed:0,block:0,heal:0};
 const entry=i=>{if(!enemies.has(i))enemies.set(i,{damage:0,tick:0,blocked:0,guard:0,kill:false});return enemies.get(i)};
 for(const r of beat.records||[]){
  if(r.k==='hit'){hero.damage+=r.dealt||0;hero.absorbed+=r.absorbed||0}
  else if(r.k==='dmg'){const e=entry(r.i);e.damage+=r.dealt||0;e.blocked+=r.blocked||0;e.kill=e.kill||r.kill}
  else if(r.k==='tick'){const e=entry(r.i);e.tick+=r.n||0;e.kill=e.kill||r.kill}
  else if(r.k==='eguard')entry(r.i).guard+=r.n||0;
  else if(r.k==='block')hero.block+=r.n||0;
  else if(r.k==='heal')hero.heal+=r.gained||0;
 }
 for(const [i,e] of enemies){
  const selector='.enemy-unit[data-target="'+i+'"]',lines=[];
  if(e.damage||e.tick){lines.push((e.tick?'저주 ':'')+'−'+(e.damage+e.tick)+(e.kill?' · 처치!':''));battleCue(root,selector,'strike')}
  if(e.blocked){lines.push(e.damage?'방어 '+e.blocked+' 흡수':'전부 방어');battleCue(root,selector,'ward')}
  if(e.guard){lines.push('방어 +'+e.guard);battleCue(root,selector,'ward')}
  if(lines.length)combatPop(selector,lines.join(' · '),e.kill?'kill':e.damage||e.tick?'damage':'block');
 }
 if(hero.damage)battleCue(root,'.hero-unit','strike');
 if(hero.absorbed||hero.block)battleCue(root,'.hero-unit','ward');
 if(hero.heal)battleCue(root,'.hero-unit','mend');
 // Keep hero HP and block readable: detailed gains occupy the existing status strip.
 const lines=[];
 if(hero.damage)lines.push('−'+hero.damage+' HP');
 if(hero.absorbed)lines.push('방어 '+hero.absorbed+' 흡수');
 if(hero.block)lines.push('방어 +'+hero.block);
 if(hero.heal)lines.push('회복 +'+hero.heal);
 if(lines.length&&beat.kind!=='dual'){
  const copy=root.querySelector('.combat-status-copy');
  if(copy){const old=copy.querySelector('small');if(old)old.remove();const summary=document.createElement('small');summary.className='combat-pop hero-feedback '+(hero.damage?'damage':hero.heal?'heal':'block');summary.textContent=lines.join(' · ');copy.appendChild(summary)}
 }
 if(beat.kind==='dual'){
  root.querySelectorAll('.dual-meter,.mb-dual').forEach(n=>n.classList.add('dual-result'));
  const title=root.querySelector('.combat-status-copy>b');
  if(title){title.classList.add('dual-steps');title.innerHTML='<span class="dual-step real">✓ 현실</span><span aria-hidden="true">+</span><span class="dual-step fantasy">✓ 판타지</span><span class="dual-step complete">✦ 겸직 발동</span>'}
  root.querySelector('.combat-status-copy>small')?.classList.add('dual-gains');
 }
}

function paintCombatFrame(){
 const session=combatPlayback,beat=session?.current;if(!beat)return;
 const live=state,drawFrom=dealFrom;paintingCombatFrame=true;
 try{state=cloneCombat(beat.state);dealFrom=beat.kind==='turnStart'?0:999;render()}finally{state=live;dealFrom=drawFrom;paintingCombatFrame=false}
 const root=document.querySelector('.c2-battle');if(!root)return;
 root.classList.add('combat-playing');root.dataset.combatKind=beat.kind;root.setAttribute('aria-busy','true');
 root.querySelectorAll('button').forEach(b=>b.disabled=true);
 const strip=root.querySelector('.quick-preview');
 if(strip){strip.classList.add('combat-status');strip.innerHTML=`<div class="combat-status-copy" role="status"><b>${esc(beat.label)}</b><small>${beat.kind==='dual'?esc(beat.state.lastDual?.text||''):session.kind==='turn'?'적 행동을 순서대로 확인하고 있어요.':(beat.state.usedReal?'✓':'○')+' 현실 · '+(beat.state.usedFantasy?'✓':'○')+' 판타지'}</small></div><button type="button" data-act="skipCombat" aria-label="전투 연출 건너뛰기">건너뛰기</button>`}
 if(session.kind==='turn'&&beat.kind!=='turnStart'){
  const forecast=root.querySelector('.forecast');
  if(forecast){const remaining=session.beats.flatMap(b=>b.records||[]).filter(r=>r.k==='hit').reduce((sum,r)=>sum+r.dealt,0);forecast.innerHTML='<small>남은 적 행동 피해</small><b>'+ (remaining?'−'+remaining+' HP':'피해 없음')+'</b>';forecast.setAttribute('aria-label','남은 적 행동 피해 '+remaining)}
 }
 if(beat.kind==='enemy'&&Number.isInteger(beat.index))root.querySelector('.enemy-unit[data-target="'+beat.index+'"]')?.classList.add('combat-acting');
 for(const i of beat.fallen||[])root.querySelector('.enemy-unit[data-target="'+i+'"]')?.classList.add('just-defeated');
 paintBattleFeedback(root,beat);
 if(beat.kind==='finish')root.classList.add('battle-resolved');
}
function finishCombatPlayback(){
 const session=combatPlayback;if(!session)return;
 clearTimeout(session.timer);combatPlayback=null;combatCapture=null;holdCombatRender=false;turnVisual=null;fxRec=null;
 document.querySelectorAll('.fx-card-fly,.fx-card-discard').forEach(n=>n.remove());
 if(session.kind==='turn')dealFrom=999;
 render();
 if(session.kind==='turn'){
  const hand=document.querySelector('.hand');if(hand)hand.scrollLeft=0;updateHandNavigation();
 }
 const app=document.querySelector('#app');
 if(['reward','relicReward','victory','defeat'].includes(state?.phase))app?.classList.add('combat-result-arrival');
 setTimeout(()=>app?.classList.remove('combat-result-arrival'),280);
}
function advanceCombatPlayback(session){
 if(combatPlayback!==session)return;
 if(state!==session.live||document.hidden||reducedMotion()){finishCombatPlayback();return}
 const beat=session.beats.shift();if(!beat){finishCombatPlayback();return}
 session.current=beat;
 try{paintCombatFrame();session.timer=setTimeout(()=>advanceCombatPlayback(session),beat.duration)}catch(error){finishCombatPlayback();throw error}
}
function runCombatPlayback(kind,resolve){
 const before=cloneCombat(state);const capture={before,beats:[],cursor:0};combatCapture=capture;holdCombatRender=true;
 let succeeded=false;
 try{resolve();succeeded=true}finally{holdCombatRender=false;combatCapture=null;if(!succeeded){fxRec=null;render()}}
 // The resolver has saved the final state already. Only the UI waits for these frames.
 const last=capture.beats.at(-1);
 if(!last){fxRec=null;render();return}
 if(state.phase==='battle'&&kind==='turn')capture.beats.push({kind:'turnStart',label:'내 턴 · '+state.turn+'턴',state:cloneCombat(state),records:[],fallen:[],duration:160});
 else if(state.phase!=='battle')capture.beats.push({kind:'finish',label:state.phase==='defeat'?'이번 출근은 여기까지':'전투 승리!',state:cloneCombat(last.state),records:[],fallen:[],duration:260});
 fxRec=null;combatPlayback={kind,live:state,beats:capture.beats,current:null,timer:null};advanceCombatPlayback(combatPlayback);
}
function playWithFx(i,target){
 if(turnVisualBusy()||!state||state.phase!=='battle'||!state.hand[i])return;
 selectedCard=null;const id=state.hand[i];if(id==='fatigue'||state.energy<getCost(id))return;
 if(Number.isInteger(target)){state.targetIndex=target;ensureTarget()}
 const before=snapshot(),mode=targetMode(id),el=document.querySelector('.hand .card[data-index="'+i+'"]');
 if(!combatCanAnimate()){playCard(i,target);showFx(before);if(state&&(state.synergies||0)>before.synergies&&state.lastDual)dualBanner(state.lastDual.text);return}
 cleanGesture();flyingCard(el,mode,state.targetIndex);runCombatPlayback('card',()=>playCard(i,target));
}
function endWithFx(){
 if(turnVisualBusy()||state?.phase!=='battle')return;
 cleanGesture();selectedCard=null;
 if(!combatCanAnimate()){endTurn();fxRec=null;return}
 discardHandVisual();runCombatPlayback('turn',()=>endTurn());
}
function dualBanner(text){
 document.querySelectorAll('.combat-dual-notice,.combo-banner').forEach(n=>n.remove());
 const strip=document.querySelector('.quick-preview');if(!strip)return;
 const n=document.createElement('div');n.className='combat-dual-notice';n.setAttribute('role','status');
 n.innerHTML='<b>✦ 겸직 발동 · 현실 + 판타지</b><span>'+esc(text)+'</span>';strip.appendChild(n);
 setTimeout(()=>n.remove(),1600);
}
// Backgrounding / reducing motion skips presentation, never repeats resolution.
document.addEventListener('visibilitychange',()=>{if(document.hidden)finishCombatPlayback()});
window.matchMedia?.('(prefers-reduced-motion: reduce)').addEventListener?.('change',e=>{if(e.matches)finishCombatPlayback()});

function overtimeFx(){if(!useOvertime()||reducedMotion())return;const el=document.querySelector('.energy-orb');if(!el)return;const r=el.getBoundingClientRect(),layer=document.getElementById('fx-layer'),n=document.createElement('div');n.className='fx-pop synergy';n.textContent='⚡+1';n.style.left=(r.left+r.width/2-18)+'px';n.style.top=(r.top-6)+'px';layer?.appendChild(n);setTimeout(()=>n.remove(),830)}
function familyHint(c){return c.family==='real'?'청록 「현실」 카드. 같은 턴에 「판타지」 카드도 쓰면 겸직이 자동 발동해.':c.family==='fantasy'?'보라 「판타지」 카드. 같은 턴에 「현실」 카드도 쓰면 겸직이 자동 발동해.':c.family==='fusion'?'융합 카드. 강력하지만 겸직 조건에는 들어가지 않아.':'공용 카드. 겸직 조건에는 들어가지 않아.'}
function cardDetailMarkup(){if(!inspected||!state)return '<p>카드 정보가 없어.</p>';const {id,source,index}=inspected,c=cards[id];if(!c)return '';
 const inBattle=state.phase==='battle',cost=getCost(id);
 const available=source==='hand'&&inBattle&&state.hand[index]===id&&id!=='fatigue'&&state.energy>=cost;
 const selectable=source==='reward'&&state.phase==='reward'&&state.rewardOptions[index]===id;
 const reason=id==='fatigue'?'피로 카드는 사용할 수 없어. 손패 칸만 차지해.':state.energy<cost?`에너지가 ${cost-state.energy} 부족해.${overtimeStatus().ok?' ☕ 초과근무로 +1 할 수 있어.':''}`:'';
 const tags=termsFor(id),up=upgraded(id),udiff=id==='fatigue'?[]:upgradeDiff(id);
 const outcome=dynamicOutcome(id);
 return `<div class="inspect-shell"><div>${renderCard(id,{preview:true})}</div><div class="inspect-right"><div class="inspect-role">${toneName[c.family]} · ${targetMode(id)==='self'?'🛡 나에게 사용':'⚔ 적에게 사용'} · ⚡ ${cost===99?'—':cost}</div><h2>${esc(c.name)}${up?' <span class="up-mark">✦ 강화됨</span>':''}</h2>
 <div class="inspect-effect"><b>📜 기본 효과</b><div>${esc(c.desc)}</div></div>
 ${id==='fatigue'?'':`<div class="inspect-upgrade ${up?'on':''}"><b>✦ 강화 효과 ${up?'· 적용 중 (강화 전 → 현재)':udiff.length?'· 휴식/이벤트에서 강화하면':'· 강화 불가'}</b><ul>${upgradeDiffMarkup(id)}</ul></div>`}
 ${outcome?`<div class="inspect-outcome">📈 ${outcome}</div>`:''}
 ${tags.length?`<div class="term-list"><b class="term-head">📖 용어</b>${tags.map(k=>`<div class="keyword-term"><strong>${statIcon(k,TERMS[k].icon)} ${TERMS[k].name}</strong><span>${esc(TERMS[k].desc)}</span></div>`).join('')}</div>`:''}
 <p class="inspect-hint">${familyHint(c)}</p>
 <div class="inspect-actions">${source==='hand'?`<button class="btn primary" data-act="confirmPlay" data-index="${index}" ${!available?'disabled':''}>${available?(targetMode(id)==='self'?'🛡 내 캐릭터에 사용':'⚔ '+esc(state.enemy?.name||'적')+'에게 사용'):'🔒 사용 불가'} · ${cost===99?'—':cost+' ⚡'}</button>`:source==='reward'?`<button class="btn primary" data-act="confirmReward" data-index="${index}" ${!selectable?'disabled':''}>🎁 이 카드를 덱에 추가</button>`:''}<button class="btn" data-act="closeModal">돌아가기</button></div>${reason&&source==='hand'?`<div class="inspect-hint warn-hint">${reason}</div>`:''}</div></div>`}
function heroMarkup(profile=state){const art=portraitMarkup('hero_'+profile.real+'_'+profile.fantasy);if(art)return art;const chef=profile.real==='chef',warlock=profile.fantasy==='warlock';return `<svg viewBox="0 0 116 124" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="cape-${profile.real}-${profile.fantasy}" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${warlock?'#a376db':'#4db4b7'}"/><stop offset="1" stop-color="#25294b"/></linearGradient></defs><ellipse cx="58" cy="116" rx="44" ry="7" fill="#070f20" opacity=".55"/><path d="M40 75L27 112Q57 122 90 112L76 76" fill="url(#cape-${profile.real}-${profile.fantasy})" stroke="#d8b978" stroke-width="2"/><path d="M43 74Q59 64 74 74L85 104Q58 116 33 103Z" fill="${chef?'#f8e5bd':'#292d57'}" stroke="#d4b58a" stroke-width="2"/><circle cx="58" cy="51" r="23" fill="#f2c8a7" stroke="#704966" stroke-width="2"/>${warlock?'<path d="M28 43Q32 4 62 8Q87 13 88 43L78 38Q56 17 37 42Z" fill="#343159" stroke="#b994ec" stroke-width="3"/>':'<path d="M39 29Q55 15 75 29L73 35Q55 29 41 35Z" fill="#61b4bb"/>'}${chef?'<path d="M36 28Q28 10 43 9Q52 -2 62 8Q79 0 81 16L77 34H37Z" fill="#fff1d8" stroke="#d7b995" stroke-width="2"/>':'<path d="M36 44Q54 28 80 44L76 32Q61 22 42 33Z" fill="#403253"/>'}<circle cx="49" cy="53" r="3" fill="#332945"/><circle cx="67" cy="53" r="3" fill="#332945"/>${profile.real==='accountant'?'<rect x="40" y="46" width="17" height="15" rx="5" fill="none" stroke="#493d51" stroke-width="2"/><rect x="60" y="46" width="17" height="15" rx="5" fill="none" stroke="#493d51" stroke-width="2"/><path d="M57 53H60" stroke="#493d51" stroke-width="2"/>':''}<path d="M51 64Q58 69 65 64" fill="none" stroke="#b36a78" stroke-width="2" stroke-linecap="round"/><path d="M37 81Q25 84 24 98M79 81Q92 84 92 98" stroke="#edc09e" stroke-width="10" stroke-linecap="round"/><rect x="${warlock?'83':'15'}" y="78" width="24" height="24" rx="4" fill="${warlock?'#b08de1':'#ffe0a1'}" stroke="#25233b" stroke-width="3"/>${warlock?'<path d="M94 83L89 90L96 91L91 98" fill="none" stroke="#312449" stroke-width="2"/>':'<path d="M20 84H34M20 90H31M20 96H34" stroke="#635172" stroke-width="2"/>'}</svg>`}
function enemyMarkup(e,i){const it=intentInfo(e),dead=e.hp<=0,tg=i===state.targetIndex&&!dead;
 return `<button type="button" data-act="targetEnemy" data-index="${i}" data-target="${i}" class="enemy-unit ${dead?'dead':''} ${tg?'targeted':''}" ${dead?'disabled':''} aria-label="${esc(e.name)}, 체력 ${e.hp}/${e.maxHp}${e.block?', 방어 '+e.block:''}, 이번 행동 ${esc(it.text)}${it.sub?', '+esc(it.sub):''}${e.debt?', 미수금 '+e.debt:''}${e.curse?', 저주 '+e.curse:''}${tg?', 현재 공격 대상':', 탭하면 공격 대상으로 선택'}">${tg?'<span class="target-tag">🎯 대상</span>':''}<span class="enemy-intent intent-${dead?'dead':it.cls}">${dead?'처치 완료':statIcon(it.cls==='guard'?'block':it.cls==='charge'?'energy':it.cls==='prepare'||it.cls==='curse'?'fatigue':'attack',it.icon)+' <span class="intent-copy"><strong>'+esc(it.text)+'</strong>'+(it.sub?'<small>'+esc(it.sub)+'</small>':'')+'</span>'}</span><span class="enemy-avatar" aria-hidden="true">${enemyPortrait(e)}</span><b>${esc(e.name)}</b>${bar(e.hp,e.maxHp)}<span class="enemy-hp">${statIcon('health')} ${e.hp}/${e.maxHp}${e.block?` <i class="eblock">${statIcon('block')}${e.block}</i>`:''}</span><span class="enemy-effects">${e.debt?`<i class="st st-debt">📋${e.debt}</i>`:''}${e.curse?`<i class="st st-curse">${statIcon('curse')}${e.curse}</i>`:''}</span><span class="damage-preview" aria-hidden="true"></span></button>`}
function resValue(k){return k==='ingredient'?state.ingredient:k==='reagent'?state.reagent:k==='debt'?(state.enemy?.debt||0):(state.enemy?.curse||0)}
function jobbarMarkup(){const g=JOB_GUIDE[keyPair()],ot=overtimeStatus(),r=state.usedReal,f=state.usedFantasy,done=state.dualTurnUsed,wf=state.workFatigue||0;
 const res=g.resources.map(k=>{const v=resValue(k),onEnemy=k==='debt'||k==='curse';return `<button type="button" class="res-pill res-${k}" data-act="status" data-key="${k}" aria-label="${TERMS[k].name} ${v}${onEnemy?', 현재 대상 기준':''}. 설명 보기"><span aria-hidden="true">${statIcon(k,TERMS[k].icon)}</span><b>${v}</b><small>${TERMS[k].name}${onEnemy?'<br/>대상':''}</small></button>`}).join('');
 const pips=Array.from({length:6},(_,i)=>`<i class="pip ${i<wf?'on':''} ${i===2||i===4?'gap':''}"></i>`).join('');
 const dualLine=done?(state.lastDual?.turn===state.turn?state.lastDual.text:'이번 턴 발동함'):dualSummary();
 return `<section class="jobbar" aria-label="직업 상태"><div class="job-resources">${res}<button type="button" class="fatigue-meter ${wf>=3?'warn':''} ${wf>=5?'danger':''}" data-act="status" data-key="fatigueGauge" aria-label="피로도 ${wf}/6, ${fatigueNote(wf)}. 설명 보기"><span class="fm-head">${statIcon('fatigue')} 피로도 <b>${wf}/6</b></span><span class="pips" aria-hidden="true">${pips}</span><small>${fatigueNote(wf)}</small></button></div>
<div class="job-actions"><button type="button" class="dual-meter ${done?'done':r&&f?'ready':''}" data-act="status" data-key="synergy" aria-label="겸직 ${done?'이번 턴 발동 완료':'조건 현실 '+(r?'충족':'미충족')+', 판타지 '+(f?'충족':'미충족')}. 설명 보기"><span class="dm-row"><span class="dm-chip real ${r?'on':''}">${r?'✓':'○'} 현실</span><span class="dm-plus" aria-hidden="true">+</span><span class="dm-chip fantasy ${f?'on':''}">${f?'✓':'○'} 판타지</span><span class="dm-state">${done?'✨ 발동!':'→ 겸직 자동'}</span></span><small>${resourceTextMarkup(dualLine)}</small></button><button type="button" class="overtime-btn ${ot.ok?'':'off'}" data-act="overtime" ${ot.ok?'':'disabled'} aria-label="초과근무: 에너지 +1, 피로도 +2, 전투당 1회. ${ot.ok?'사용 가능':esc(ot.reason)}"><b>${statIcon('overtime')} 초과근무</b><small>${ot.ok?statIcon('energy')+'+1 · '+statIcon('fatigue')+'+2':esc(ot.reason)}</small><em>전투당 1회</em></button></div></section>`}
function tutorialMarkup(){const t=state.tutorial;if(!t||t.step>=TUTORIAL.length)return '';const s=TUTORIAL[t.step],last=t.step===TUTORIAL.length-1;
 return `<section class="coach" role="status" aria-live="polite"><div class="coach-body"><b>🎓 ${s.title}</b><p>${s.text()}</p></div><div class="coach-actions"><button class="coach-next" data-act="tutNext">${last?'완료 ✓':s.wait==='next'?'알겠어 ›':'다음 ›'}</button><button class="coach-skip" data-act="tutSkip">그만 보기</button></div></section>`}

function validateSelection(){if(!state||state.phase!=='battle'||!selectedCard||state.hand[selectedCard.index]!==selectedCard.id)selectedCard=null;}
function projectSelection(index,target){
 if(!state||state.phase!=='battle'||!state.hand[index]||state.hand[index]==='fatigue')return null;
 const real=state,keep=[activeCard,activeBonus,fxRec];
 const c=JSON.parse(JSON.stringify(real));state=c;fxRec=[];
 try{
  resolveCard(index,target);
  const survives=c.hp>0||preventLethal();
  if(survives&&livingEnemies().length){ensureTarget();tryAutoDual()}
  return {after:c,records:fxRec.slice(),dual:c.synergies>real.synergies,terminal:!survives?'defeat':!livingEnemies().length?'victory':null,forecast:turnForecast(c)};
 }finally{state=real;[activeCard,activeBonus,fxRec]=keep}
}
function selectionReason(){if(!selectedCard)return '';return selectedCard.id==='fatigue'?'사용할 수 없는 피로 카드':state.energy<getCost(selectedCard.id)?'에너지 '+(getCost(selectedCard.id)-state.energy)+' 부족':'';}
function useSelected(target){
 validateSelection();if(!selectedCard)return;
 const reason=selectionReason();if(reason){state.message=reason;render();denySelected();return}
 const i=selectedCard.index;selectedCard=null;playWithFx(i,target);
}
function quickPreviewMarkup(){
 if(!selectedCard)return '<section class="quick-preview idle" aria-label="카드 선택 안내"><span>카드 선택 → 대상 탭</span><small>↔ 좌우로 손패 탐색</small></section>';
 const c=cards[selectedCard.id],p=selectionProjection,reason=selectionReason(),self=targetMode(selectedCard.id)==='self';
 const numbers=[];
 if(p){
  const hits=p.records.filter(r=>r.k==='dmg');if(hits.length)numbers.push(hits.map(r=>esc(state.enemies[r.i].name)+' '+r.dealt+' 피해').join(' · '));
  const b=p.after.block-state.block,h=p.after.hp-state.hp;if(b)numbers.push('방어 '+(b>0?'+':'')+b);if(h)numbers.push('체력 '+(h>0?'+':'')+h);
  for(const [k,label] of [['ingredient','재료'],['reagent','시약']]){const v=p.after[k]-state[k];if(v)numbers.push(label+' '+(v>0?'+':'')+v)}
  for(let i=0;i<state.enemies.length;i++)for(const [k,label] of [['debt','미수금'],['curse','저주']]){const v=(p.after.enemies[i][k]||0)-(state.enemies[i][k]||0);if(v)numbers.push(esc(state.enemies[i].name)+' '+label+' '+(v>0?'+':'')+v)}
  const draws=p.records.filter(r=>r.k==='draw').reduce((n,r)=>n+r.n,0);if(draws)numbers.push('카드 '+draws+'장 뽑기');
  numbers.push('에너지 '+state.energy+' → '+p.after.energy);
 }
 return `<section class="quick-preview ${reason?'unavailable':''}" aria-label="선택한 카드 미리보기"><div class="qp-main"><div class="qp-title"><b>${c.icon} ${esc(c.name)}</b><span>${statIcon('energy')} ${getCost(selectedCard.id)===99?'—':getCost(selectedCard.id)}</span></div><p class="qp-outcome" role="status">${reason||numbers.join(' · ')||esc(c.desc)}</p><p class="qp-instruction">${reason?'상세에서 효과를 확인할 수 있어.':self?'내 캐릭터를 탭하거나 사용 버튼을 눌러줘.':'사용할 적을 탭해 줘. 수치는 현재 대상 기준이야.'}${p?.dual&&!reason?' <strong>✦ 겸직 포함</strong>':''}${p?.terminal==='defeat'&&!reason?' <strong>⚠ 사용하면 패배</strong>':''}${p?.terminal==='victory'&&!reason?' <strong>전투 승리 예상</strong>':''}</p></div><div class="qp-actions"><button class="compact-button" data-act="selectedDetails">상세</button>${self&&!reason?'<button class="compact-button primary" data-act="useSelected">사용</button>':''}<button class="compact-button" data-act="cancelSelection" aria-label="카드 선택 취소">취소</button></div></section>`;
}
function paintSelection(p){
 const app=document.querySelector('#app');app.querySelectorAll('.hp-projection,.projected-outcome,.projected-forecast').forEach(n=>n.remove());app.querySelectorAll('.can-target').forEach(n=>n.classList.remove('can-target'));
 if(!selectedCard||!p||selectionReason())return;
 const self=targetMode(selectedCard.id)==='self';app.querySelectorAll(self?'.hero-unit':'.enemy-unit:not(.dead)').forEach(n=>n.classList.add('can-target'));
 state.enemies.forEach((e,i)=>{const after=p.after.enemies[i],unit=app.querySelector('.enemy-unit[data-target="'+i+'"]');if(!unit||e.hp<=0)return;
  if(after.hp<e.hp){const rail=unit.querySelector('.hp-rail'),band=document.createElement('span');band.className='hp-projection';band.style.left=(100*after.hp/e.maxHp)+'%';band.style.width=(100*(e.hp-after.hp)/e.maxHp)+'%';rail?.appendChild(band)}
  if(after.hp!==e.hp){const tag=document.createElement('span');tag.className='projected-outcome';tag.textContent=after.hp<=0?'처치 예상':e.hp+' → '+after.hp;unit.appendChild(tag)}
 });
 const f=app.querySelector('.forecast');if(f){const tag=document.createElement('small');tag.className='projected-forecast';tag.textContent=p.terminal==='defeat'?'⚠ 카드 사용 시 패배':p.terminal==='victory'?'사용 후 전투 승리':'사용 후 −'+p.forecast.net+' HP'+(p.forecast.fatigue?' · 피로 카드 +'+p.forecast.fatigue:'');f.appendChild(tag)}
}

// Visual-only state. Card indices, combat resolution and save schema stay unchanged.
let spreadHand=false;
// v0.6.15: transient presentation only; no animation state enters the save.
let handResizeObserver=null,turnVisual=null;
const turnVisualBusy=()=>!!combatPlayback||holdCombatRender||!!turnVisual&&performance.now()<turnVisual.until;
function handNavigationMarkup(){
 return '<nav class="hand-nav" aria-label="손패 탐색" hidden><button type="button" data-act="handPage" data-dir="-1" aria-label="이전 손패 보기">‹ <span class="hand-left-label">이전</span></button><span class="hand-range" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" data-act="handPage" data-dir="1" aria-label="다음 손패 보기"><span class="hand-right-label">다음</span> ›</button></nav>';
}
function updateHandNavigation(){
 const hand=document.querySelector('.c2-battle .hand'),nav=document.querySelector('.hand-nav');if(!hand||!nav)return;
 const slots=Array.from(hand.querySelectorAll('.hand-slot')),width=hand.clientWidth,max=Math.max(0,hand.scrollWidth-width);
 nav.hidden=!slots.length||width<=0||max<=2;
 const left=Math.max(0,hand.scrollLeft),right=left+width;
 const visible=slots.map((s,i)=>({s,i})).filter(({s})=>s.offsetLeft+s.offsetWidth>left+12&&s.offsetLeft<right-12);
 const before=slots.filter(s=>s.offsetLeft<left-2).length,after=slots.filter(s=>s.offsetLeft+s.offsetWidth>right+2).length;
 const prev=nav.querySelector('[data-dir="-1"]'),next=nav.querySelector('[data-dir="1"]');
 prev.disabled=left<=2;next.disabled=left>=max-2;
 const a=before?'앞 '+before+'장':'이전',b=after?'뒤 '+after+'장':'다음';
 nav.querySelector('.hand-left-label').textContent=a;nav.querySelector('.hand-right-label').textContent=b;
 prev.setAttribute('aria-label',before?'왼쪽에 가려진 손패 '+before+'장 보기':'이전 손패 보기');
 next.setAttribute('aria-label',after?'오른쪽에 가려진 손패 '+after+'장 보기':'다음 손패 보기');
 const range=visible.length?(visible[0].i+1)+'–'+(visible.at(-1).i+1)+' / '+slots.length+'장':'손패 '+slots.length+'장';
 const label=nav.querySelector('.hand-range');if(label.textContent!==range)label.textContent=range;
 const caption=document.querySelector('.mb-hand-caption');if(caption&&slots.length>5&&width>0)caption.textContent=range+' · ↔ 좌우로 넘기기';
}
function bindHandNavigation(){
 handResizeObserver?.disconnect();
 const hand=document.querySelector('.c2-battle .hand');if(!hand)return;
 hand.addEventListener('scroll',updateHandNavigation,{passive:true});
 if(window.ResizeObserver){handResizeObserver=new ResizeObserver(updateHandNavigation);handResizeObserver.observe(hand)}
 if(turnVisual&&turnVisualBusy()){
  hand.classList.add('turn-arrival');hand.style.setProperty('--draw-wait',turnVisual.delay+'ms');
  const region=document.querySelector('.compact-hand');region?.setAttribute('aria-busy','true');
  const button=document.querySelector('[data-act="endTurn"]');if(button)button.disabled=true;
 }
 updateHandNavigation();
}
function pageHand(dir){
 const hand=document.querySelector('.c2-battle .hand');if(!hand)return;
 hand.scrollLeft=Math.max(0,Math.min(hand.scrollWidth-hand.clientWidth,hand.scrollLeft+dir*Math.max(100,hand.clientWidth-48)));
 updateHandNavigation();
}
function revealHandCard(i){
 const hand=document.querySelector('.c2-battle .hand'),slot=hand?.querySelector(`.hand-slot[data-slot="${i}"]`),card=slot?.querySelector('.card');if(!card)return;
 // offsetLeft/offsetWidth reflect final layout, unaffected by the active FLIP transform.
 if(hand.clientWidth>0){
  const left=slot.offsetLeft-12,right=slot.offsetLeft+slot.offsetWidth+12;
  if(left<hand.scrollLeft)hand.scrollLeft=Math.max(0,left);
  else if(right>hand.scrollLeft+hand.clientWidth)hand.scrollLeft=Math.min(Math.max(0,hand.scrollWidth-hand.clientWidth),right-hand.clientWidth);
 }
 updateHandNavigation();card.focus({preventScroll:true});
}
function discardHandVisual(){
 if(reducedMotion())return 0;
 const hand=document.querySelector('.c2-battle .hand'),pile=document.querySelector('.discard-pile');if(!hand||!pile)return 0;
 const h=hand.getBoundingClientRect(),p=pile.getBoundingClientRect();if(h.width<=0||p.width<=0)return 0;
 let count=0;
 for(const el of hand.querySelectorAll('.card')){
  const r=el.getBoundingClientRect();
  if(!el.animate||r.right<=h.left||r.left>=h.right||r.bottom<0||r.top>window.innerHeight)continue;
  const g=el.cloneNode(true);g.classList.remove('deal','selected-card','denied');g.classList.add('fx-card-discard');
  g.removeAttribute('data-act');g.removeAttribute('data-index');g.tabIndex=-1;g.setAttribute('aria-hidden','true');
  Object.assign(g.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px',minHeight:'0',margin:'0',pointerEvents:'none'});
  // Keep the hand's compact layout when the clone leaves its CSS ancestors.
  const selectors=['.top','.cost','.family','.art-stage','.card-name','.face-stats','.face-chip','.card-footer','.lock-ribbon','.dual-tag','.card-desc','.inline-card-icon'];
  const properties=['display','flex-direction','flex-grow','flex-shrink','gap','padding','margin','font-size','font-weight','line-height','min-height','max-height','height','width','align-items','justify-content'];
  for(const selector of selectors){
   const originals=el.querySelectorAll(selector),copies=g.querySelectorAll(selector);
   originals.forEach((node,i)=>{const style=getComputedStyle(node);for(const key of properties)copies[i].style.setProperty(key,style.getPropertyValue(key))});
  }
  g.style.padding=getComputedStyle(el).padding;
  document.body.appendChild(g);
  const dx=p.left+p.width/2-r.left-r.width/2,dy=p.top+p.height/2-r.top-r.height/2;
  const a=g.animate([{transform:'translate(0,0) rotate(0deg)',opacity:.9},{transform:`translate(${dx}px,${dy}px) rotate(18deg) scale(.08)`,opacity:0}],{duration:180,delay:Math.min(count,4)*10,easing:'ease-in',fill:'both'});
  a.onfinish=()=>g.remove();setTimeout(()=>g.remove(),300);count++;
 }
 return count?220:0;
}
function finishTurnVisual(token){
 if(turnVisual!==token)return;turnVisual=null;
 document.querySelector('.compact-hand')?.removeAttribute('aria-busy');
 const button=document.querySelector('[data-act="endTurn"]');if(button)button.disabled=false;
}
window.addEventListener('resize',()=>{if(selectedCard)revealHandCard(selectedCard.index);updateHandNavigation()},{passive:true});

function renderHandSlot(id,i){
 const n=state.hand.length,t=n<2?0:(i-(n-1)/2)/Math.max(1,(n-1)/2),picked=selectedCard?.index===i;
 return `<div class="hand-slot ${picked?'picked':''}" data-slot="${i}" data-card="${id}" style="--order:${i+1};--tilt:${(t*3).toFixed(2)}deg;--arc:${(Math.abs(t)*6).toFixed(2)}px">${renderCard(id,{index:i})}</div>`;
}
function captureHand(){
 const hand=document.querySelector('.hand');if(!hand)return null;
 return {signature:Array.from(hand.querySelectorAll('.hand-slot')).map(e=>e.dataset.card).join(','),slots:Array.from(hand.querySelectorAll('.hand-slot')).map(e=>({x:e.getBoundingClientRect().left,transform:getComputedStyle(e.querySelector('.card')).transform}))};
}
function animateHand(before){
 if(!before||reducedMotion())return;
 const slots=Array.from(document.querySelectorAll('.hand-slot'));
 if(slots.map(e=>e.dataset.card).join(',')!==before.signature)return;
 slots.forEach((el,i)=>{
  const old=before.slots[i],card=el.querySelector('.card');if(!old||!card.animate)return;
  const dx=old.x-el.getBoundingClientRect().left,to=getComputedStyle(card).transform;
  if(Math.abs(dx)>.5)el.animate([{transform:`translateX(${dx}px)`},{transform:'translateX(0)'}],{duration:180,easing:'cubic-bezier(.2,.8,.2,1)'});
  if(old.transform!==to)card.animate([{transform:old.transform},{transform:to}],{duration:180,easing:'cubic-bezier(.2,.8,.2,1)'});
 });
}
function denySelected(){
 const el=document.querySelector('.selected-card');if(!el||reducedMotion())return;
 el.classList.add('denied');setTimeout(()=>el.classList.remove('denied'),220);
}

function renderBattle(){if(mobileBattleFits())return renderMobileBattle();ensureTarget();const p=pair();const en=state.enemies||[],alive=livingEnemies();const noPlay=battleAvailability().endReady;
 const {incoming,net,fatigue,trainingBlock}=turnForecast(state);
 return `${header()}<main class="compact-battle redesign-battle c2-battle ${state.tutorial&&state.tutorial.step<TUTORIAL.length?'has-coach':''}"><div class="battle-top">${battleLocationMarkup()}<strong>${p.icon} ${p.name}</strong><span class="top-actions"><button class="relic-battle-btn" data-act="relics" aria-label="보유 유물 ${state.relics.length}개 보기">💎 ${state.relics.length}</button><button class="relic-battle-btn" data-act="log" aria-label="전투 기록 보기">📜 기록</button></span></div>
<section class="multi-arena" aria-label="전투 전장"><div class="arena-caption"><span>◈ 적 ${alive.length}명 · 탭해서 공격 대상 선택</span><span>카드 선택 → 대상 탭</span></div><div class="enemies-row count-${en.length}">${en.map(enemyMarkup).join('')}</div>
<div class="player-lane"><button type="button" data-act="targetSelf" class="hero-unit" aria-label="내 캐릭터 ${p.name}, 체력 ${state.hp}/${state.maxHp}, 방어 ${state.block}. 방어·회복 카드 사용 대상"><span class="hero-avatar">${heroMarkup()}</span><span class="hero-details"><b>나 · ${p.name}</b>${bar(state.hp,state.maxHp)}<span class="hero-health">${statIcon('health')} ${state.hp}/${state.maxHp}<span class="block-chip ${state.block?'on':''}">${statIcon('block')} ${state.block}</span></span><span class="hero-tooltip">방어·회복 카드는 여기로</span></span><span class="self-preview" aria-hidden="true">나에게 사용 ✓</span></button><div class="battle-sidebar"><button type="button" class="forecast ${incoming?(net>0?'danger':'safe'):'calm'}" data-act="status" data-key="intent" aria-label="적 턴 예상 피해 ${net}, 임시 피로 카드 ${fatigue}장. 행동 상세 보기"><small>예상 피해 · 행동 보기</small><b>${incoming?(net>0?'−'+net+' HP':'전부 막음'):'공격 없음'}</b>${incoming?`<small>공격 ${incoming} − ${statIcon('block')} ${state.block+trainingBlock}${trainingBlock?' (교육 +'+trainingBlock+')':''}</small>`:''}${fatigue?`<small class="forecast-fatigue">${statIcon('fatigue')} 임시 피로 카드 +${fatigue}</small>`:''}</button></div></div><div class="battle-message" aria-live="polite">${/^🚪 \d+명의 적 등장!/.test(state.message)?'':esc(state.message)}</div></section>
${bossPhaseMarkup()}${jobbarMarkup()}${tutorialMarkup()}
<section class="compact-hand">${quickPreviewMarkup()}<div class="hand-toolbar">${energyMarkup()}<span class="hand-count">${statIcon('draw')} 손패 ${state.hand.length} · <span class="pile-count"><img class="deck-back" src="${CARD_BACK}" alt="" aria-hidden="true" width="15" height="23" draggable="false"/>덱 ${state.drawPile.length}</span> · <span class="discard-pile"><span class="discard-icon" aria-hidden="true"></span>버림 ${state.discard.length}</span></span><button class="compact-button primary end-turn-btn ${noPlay?'ready-pulse':''}" data-act="endTurn" aria-label="턴 종료${noPlay?', 지금 쓸 수 있는 카드 없음':''}">${noPlay?'사용 불가 · ':''}턴 종료 ➜</button></div>${handNavigationMarkup()}<div class="hand-zone"><div class="hand ${spreadHand?'spread':'fanned'}" aria-label="내 손패. 좌우로 넘기고 카드를 탭해서 펼칩니다.">${state.hand.map(renderHandSlot).join('')||'<span class="empty">손패가 비었어. 턴을 종료하자.</span>'}</div>${state.hand.length>3?'<div class="hand-peek" aria-hidden="true">↔</div>':''}</div><div class="hand-options"><span>탭해서 펼치기 · 좌우로 손패 탐색</span><button type="button" data-act="toggleHand" aria-pressed="${spreadHand}">${spreadHand?'겹쳐 보기':'모두 펼치기'}</button></div><div class="compact-hint">선택 → 대상 탭으로 사용 · 위로 끌어 사용</div></section></main>`}

// 카드 앞면은 최소한의 수치/아이콘을 제공한다. 자세한 설명은 기존 탭 팝업 그대로 유지.
// 수치가 변하는 공격은 전투에서 현재 대상과 강화·유물 효과를 반영한다(방어 전 표시).
const FACE_STATS={
 ledger:[['block',6],['debt','+2']],audit:[['attack',6],['debt','+1']],balance:[['block',4],['draw','+1']],receipt:[['debt','+1'],['draw','+1']],collect:[['attack',5],['scaleDebt','×3']],
 chop:[['attack',6],['ingredient','+1']],broth:[['block',6],['ingredient','+1']],taste:[['ingredient','+1'],['draw','+1']],lunch:[['block',4],['heal',4]],flambe:[['attack',12],['scaleIng','×3']],
 curse:[['attack',5],['curse','+2']],drain:[['attack',7],['heal',2]],soul:[['hpLoss','−3'],['energy','+1'],['draw','+1']],veil:[['block',6],['curse','+1']],night:[['attack',10],['scaleCurse','×3']],
 extract:[['reagent','+1'],['draw','+1']],blast:[['attack',9],['scaleRea','×4']],transmute:[['block',6],['reagent','+1']],catalyst:[['reagent','+2'],['draw','+1']],elixir:[['heal',5],['scaleRea','×2']],
 hellTax:[['attack',8],['scaleDebt','×4'],['curse','+2']],goldAudit:[['attack',8],['scaleRea','×5'],['block',4]],infernalMenu:[['attack',10],['scaleIng','×4'],['heal',3]],grandFeast:[['attack',9],['scaleBoth','×3'],['heal',5]],
 strike:[['attack',8]],guard:[['block',9]],hustle:[['draw','+2'],['energy','+1']],
 closeBooks:[['debt','+3'],['draw','+1']],surpriseAudit:[['attack',4],['all','전체'],['debt','+2']],riskHedge:[['block',8],['scaleDebt','4↑: +4']],
 pantry:[['ingredient','+2'],['draw','+1']],hotMeal:[['heal',6],['scaleIng','×3']],spiceStorm:[['attack',7],['all','전체'],['scaleIng','×2']],
 darkBargain:[['hpLoss','−3'],['draw','+2']],contagion:[['curse','+2'],['all','전염']],eclipse:[['attack',5],['all','전체'],['scaleCurse','×2']],
 distill:[['reagent','+2'],['block',4]],flashFlask:[['attack',6],['scaleRea','2↑: +5']],chainReaction:[['attack',9],['all','전체'],['scaleRea','×3']],fatigue:[['disabled','사용 불가']]
};
const FACE_TOKENS={attack:['⚔','공격','offense'],block:['🛡','방어','defense'],heal:['💚','회복','healing'],draw:['🎴','드로우','utility'],energy:['⚡','에너지','resource'],hpLoss:['❤️','체력 소모','offense'],debt:['📋','미수금','resource'],curse:['🕯','저주','utility'],ingredient:['🥕','재료','resource'],reagent:['🧪','시약','resource'],scaleDebt:['📋','미수금 비례','utility'],scaleCurse:['🕯','저주 비례','utility'],scaleRea:['🧪','시약 비례','utility'],scaleIng:['🥕','재료 비례','utility'],scaleBoth:['🥕🧪','복합 자원 비례','utility'],all:['🌐','광역','utility'],disabled:['⛔','방해 카드','offense']};
const FACE_DAMAGE_CARDS=new Set(['audit','collect','chop','flambe','curse','drain','night','blast','hellTax','goldAudit','infernalMenu','grandFeast','strike','surpriseAudit','spiceStorm','eclipse','flashFlask','chainReaction']);
// C2.2: 앞면 수치는 previewCard(실제 효과 함수 실행)로 계산한다. 전투 중에는 현재 대상·자원·강화·유물을 반영하고,
// 전투 밖(보상·상점·덱·강화 비교)에서는 카드 자체 수치(강화 반영)를 보여 준다. 공격 수치는 적 방어 적용 전 값.
function cardNumbers(id,{forceUp=null,live=true}={}){
 const inBattle=live&&state&&state.phase==='battle'&&livingEnemies().length>0;
 const b=previewCard(id,{base:true,forceUp});if(!b)return null;
 if(!inBattle)return {...b,live:false};
 const l=previewCard(id,{forceUp});if(!l)return {...b,live:false};
 const t=state.targetIndex;
 return {...l,draw:b.draw,live:true,target:t};
}
function faceValue(kind,n){
 switch(kind){case 'attack':return n.attack;case 'block':return n.block;case 'heal':return n.heal;case 'draw':return '+'+n.draw;case 'energy':return '+'+n.energy;
  case 'hpLoss':return '−'+n.hpLoss;case 'debt':return '+'+n.debt;case 'curse':return '+'+n.curse;case 'ingredient':return '+'+n.ingredient;case 'reagent':return '+'+n.reagent;default:return null}
}
function faceStatsMarkup(id,opt={}){
 const rows=FACE_STATS[id]||[];const n=id==='fatigue'?null:cardNumbers(id,opt);
 return `<div class="face-stats" aria-label="기본 효과 미리보기">${rows.map(([kind,v])=>{
  const [icon,label,cls]=FACE_TOKENS[kind];let amount=v;
  if(n){const x=faceValue(kind,n);if(x!==null&&x!==undefined)amount=x;}
  const liveMark=n&&n.live&&kind==='attack'?' live':'';
  return `<span class="face-chip ${cls}${liveMark}" title="${label}: ${esc(amount)}" aria-label="${label} ${esc(amount)}">${statIcon(kind,icon)} <span class="face-label">${label}</span> <span class="face-amount">${esc(amount)}</span></span>`;
 }).join('')}</div>`;
}
// 강화 전후 비교(카드 자체 수치 기준). 변화가 없으면 빈 배열 → 강화 대상에서 제외.
function upgradeDiff(id){
 if(!state||!cards[id]||id==='fatigue')return [];
 const a=cardNumbers(id,{forceUp:false,live:false}),b=cardNumbers(id,{forceUp:true,live:false});if(!a||!b)return [];
 const out=[];const add=(icon,label,x,y,fmt=v=>v)=>{if(x!==y)out.push({icon,label,before:fmt(x),after:fmt(y)})};
 add('⚡','비용',a.cost,b.cost);add('⚔','공격',a.attack,b.attack);add('🛡','방어',a.block,b.block);add('💚','회복',a.heal,b.heal);add('🎴','드로우',a.draw,b.draw,v=>'+'+v);
 add('📋','미수금',a.debt,b.debt,v=>'+'+v);add('🕯','저주',a.curse,b.curse,v=>'+'+v);add('🥕','재료',a.ingredient,b.ingredient,v=>'+'+v);add('🧪','시약',a.reagent,b.reagent,v=>'+'+v);add('⚡','에너지 획득',a.energy,b.energy,v=>'+'+v);
 return out;
}
function upgradeDiffMarkup(id){const d=upgradeDiff(id);if(!d.length)return '<li>강화해도 바뀌는 수치가 없는 카드야.</li>';const scale=(FACE_STATS[id]||[]).some(([x])=>x.startsWith('scale'));return d.map(x=>`<li>${x.icon} ${x.label} <b>${x.before}</b> → <b class="up-after">${x.after}</b></li>`).join('')+(scale?'<li class="up-note">자원 비례 추가분(×)은 강화와 무관하게 그대로 더해져.</li>':'')}
function estimateDamage(id,e){if(!e||targetMode(id)==='self'||!state||state.phase!=='battle')return 0;const i=state.enemies.indexOf(e);const n=previewCard(id,{target:i<0?undefined:i});return n?n.attack:0}
function dynamicOutcome(id){
 if(!state||state.phase!=='battle'||id==='fatigue')return '';
 const n=cardNumbers(id);if(!n)return '';const e=state.enemies[n.target];const parts=[];
 if(n.attack){const blocked=e?.block||0;parts.push(`${n.aoe?'전체 공격 · 적마다 ':'🎯 '+esc(e?.name||'대상')+' · '}공격 <b>${n.attack}</b>${n.aoe?'':` → 방어 ${blocked} 적용 후 <b>${Math.max(0,n.attack-blocked)}</b> 피해`}`)}
 if(n.block)parts.push(`🛡 방어 <b>${n.block}</b>`);
 if(n.heal)parts.push(`💚 회복 <b>${n.heal}</b> (실제 회복은 최대 체력까지 ${Math.min(n.heal,state.maxHp-state.hp)})`);
 if(!parts.length)return '';
 return parts.join('<br/>')+'<small style="display:block;margin-top:4px">현재 자원·대상·강화·유물을 반영한 값이야. 사용하는 순간 다시 계산돼.</small>';
}
const CARD_ART={"chop":"assets/asset-4e915676ddf4825f.webp","broth":"assets/asset-622d2ec463a27597.webp","drain":"assets/asset-8d27096eca4fdbb5.webp","soul":"assets/asset-b7781b7874be7b43.webp","infernalMenu":"assets/asset-18f3191534509e32.webp","curse":"assets/asset-8bdc01be88cc7d49.webp","veil":"assets/asset-44608f9b5557e8ac.webp","taste":"assets/asset-f6d712a4cb232617.webp","lunch":"assets/asset-580ff4dd7843f5ad.webp","ledger":"assets/asset-bdfa70e8a4391a5f.webp","collect":"assets/asset-795057e3d6ce4acc.webp","extract":"assets/asset-25554b3891797a09.webp","blast":"assets/asset-b936a172ed0fee2f.webp","audit":"assets/card-audit-2e50ba2041d27784.webp","balance":"assets/card-balance-d071a551f2410cee.webp","receipt":"assets/card-receipt-c4dcffd8e1e9f711.webp","closeBooks":"assets/card-closeBooks-4b2db0044d7e74a1.webp","surpriseAudit":"assets/card-surpriseAudit-2f5776a6d7068d12.webp","riskHedge":"assets/card-riskHedge-afd83f27e0789a2f.webp","flambe":"assets/card-flambe-e7cedf5e695fb608.webp","pantry":"assets/card-pantry-d58010130c9b4a12.webp","hotMeal":"assets/card-hotMeal-a7df99501bd88835.webp","spiceStorm":"assets/card-spiceStorm-33c9519f29655dda.webp","night":"assets/card-night-d29c7038d0f9d4e1.webp","darkBargain":"assets/card-darkBargain-ebdb406e6786d941.webp","contagion":"assets/card-contagion-aae928af2b7996f0.webp","eclipse":"assets/card-eclipse-3e9abcf7c74c7139.webp","transmute":"assets/card-transmute-0b3aa78b1eb0b548.webp","catalyst":"assets/card-catalyst-fcf2f957906cefc6.webp","elixir":"assets/card-elixir-928ab0fc818f6630.webp","distill":"assets/card-distill-e85ddd5858f46cd6.webp","flashFlask":"assets/card-flashFlask-1d5979543dbedaaf.webp","chainReaction":"assets/card-chainReaction-eb4614fe990fafc7.webp","hellTax":"assets/card-hellTax-7ebf0b1d1cafb002.webp","goldAudit":"assets/card-goldAudit-0261728464902cd8.webp","grandFeast":"assets/card-grandFeast-5535d182f4d389b7.webp","strike":"assets/card-strike-d782333209f1d2cb.webp","guard":"assets/card-guard-59e1984d7acf2cb3.webp","hustle":"assets/card-hustle-10e8e3a799202371.webp","fatigue":"assets/card-fatigue-c067afe037f1803d.webp"};
const RELIC_ART={"overtimeClock":"assets/relic-overtimeClock-9269fad8355b639a.webp","manaAmp":"assets/relic-manaAmp-93c096efcb96a39c.webp","ledgerBeyond":"assets/relic-ledgerBeyond-d32f8f8f96b6b012.webp","infinitePot":"assets/relic-infinitePot-23e7001196d56b80.webp","dualContract":"assets/relic-dualContract-9c42678fe47bcc30.webp","lunchVoucher":"assets/relic-lunchVoucher-e8b7ed334e14916a.webp","copperBuckle":"assets/relic-copperBuckle-727ef6ed5514993a.webp","paydayCoupon":"assets/relic-paydayCoupon-bfb4bcf8320623b7.webp","glassRetort":"assets/relic-glassRetort-4d15ba2a547840c0.webp","protectiveApron":"assets/relic-protectiveApron-67288d8941e7b48e.webp","ravenFeather":"assets/relic-ravenFeather-5aad590f235f330e.webp","severancePackage":"assets/relic-severancePackage-4253f8a2203fa9a8.webp"};
function relicArtMarkup(id){return RELIC_ART[id]?`<img class="relic-art" data-asset="relic_${id}" src="${RELIC_ART[id]}" alt="" aria-hidden="true" width="256" height="256" draggable="false"/>`:esc(relics[id]?.icon||'')}
function cardThumbMarkup(id){return CARD_ART[id]?`<img class="card-thumb" data-asset="card_${id}" src="${CARD_ART[id]}" alt="" aria-hidden="true" width="384" height="176" draggable="false"/>`:esc(cards[id]?.icon||'')}
const CARD_BACK="assets/asset-5bc6e1896de3002a.svg";
function cardArtMarkup(id){
 const art=CARD_ART[id];
 return `<div class="art-stage ${art?'illustrated':'art-symbol'}" aria-hidden="true">${art?`<img class="card-art" data-asset="card_${id}" src="${art}" alt="" width="384" height="176" draggable="false"/>`:statIcon(id==='fatigue'?'fatigue':(FACE_STATS[id]||[])[0]?.[0]||'draw','✦')}</div>`;
}
function resourceTextMarkup(text){
 const icons={'🥕':'ingredient','🕯':'curse','💚':'heal','🛡':'block','⚡':'energy','🧪':'reagent','📋':'debt','🎴':'draw'};
 return esc(text).replace(/🥕|🕯️?|💚|🛡️?|⚡|🧪|📋|🎴/gu,icon=>statIcon(icons[icon.replace(/\uFE0F/g,'')],icon));
}
function renderCard(id,opt={}){const c=cards[id]||cards.fatigue;const inHand=Number.isInteger(opt.index)&&!opt.reward&&!opt.preview;const inBattle=state&&state.phase==='battle';const cost=getCost(id);const canUse=inBattle&&id!=='fatigue'&&state.energy>=cost;const locked=inHand&&!canUse;const family={real:'현실',fantasy:'판타지',fusion:'융합',neutral:'공용'}[c.family];
 const dualHint=inHand&&canUse&&!state.dualTurnUsed&&((c.family==='real'&&state.usedFantasy&&!state.usedReal)||(c.family==='fantasy'&&state.usedReal&&!state.usedFantasy));
 const act=opt.preview?'':inHand?`data-act="selectCard" data-index="${opt.index}" data-id="${id}"`:opt.reward?`data-act="inspectReward" data-index="${opt.index}" data-id="${id}"`:'';
 const lockText=id==='fatigue'?'사용 불가':'⚡ '+(cost-state.energy)+' 부족';
 return `<button type="button" class="card ${c.family} ${inHand&&selectedCard?.index===opt.index?'selected-card':''} ${locked?'locked':inHand?'playable':''} ${dualHint?'dual-hint':''} ${opt.preview?'preview':''} ${inHand&&opt.index>=dealFrom?'deal':''}" ${act} style="--slot:${inHand?Math.max(0,opt.index-dealFrom):0}" ${opt.preview?'tabindex="-1" aria-hidden="true"':inHand?'aria-pressed="'+(selectedCard?.index===opt.index)+'"':''} aria-label="${esc(c.name)}, 비용 ${cost===99?'없음':cost}, ${family}. ${esc(c.desc)}${locked?'. '+lockText:''}${dualHint?'. 사용하면 겸직 발동':''}. ${inHand?'탭해서 선택, 대상 탭으로 사용':'상세 보기'}"><div class="top"><span class="cost ${inHand&&locked&&id!=='fatigue'?'short':''}">${cost===99?'×':cost}</span><span class="family">${family}</span></div>${dualHint?'<span class="dual-tag">✦ 겸직</span>':''}${locked?`<span class="lock-ribbon">${lockText}</span>`:''}${cardArtMarkup(id)}<div class="card-name"><span class="inline-card-icon" aria-hidden="true">${c.icon} </span>${esc(c.name)}${upgraded(id)||(id===pair().sig&&state.sigUpgrade)?' ✦':''}</div>${faceStatsMarkup(id)}<div class="card-desc">${esc(c.desc)}</div><div class="card-footer"><span>${id==='fatigue'?'—':targetMode(id)==='self'?statIcon('block')+' 나에게':statIcon('attack')+' 적에게'}</span><span class="view-indicator">${opt.preview?'':inHand?(selectedCard?.index===opt.index?'✓ 선택됨':locked?'효과 확인':'사용 가능'):'⊕ 상세'}</span></div></button>`}
function relicTile(id,buttonAttrs='',priceLabel=''){const r=relics[id];return `<button class="relic-tile rarity-${r.rarity}" ${buttonAttrs}><span class="relic-symbol">${relicArtMarkup(id)}</span><span class="relic-title">${r.name}</span><span class="relic-rarity">${r.rarity}</span><span class="relic-description">${esc(r.desc)}</span>${priceLabel?`<span class="relic-cost">${esc(priceLabel)}</span>`:''}</button>`}
function renderRelicReward(){return `${header()}${stageStrip()}<section class="panel big-event"><div class="eyebrow">ELITE CLEAR · 유물 선택</div><h1>💎 정예 전리품</h1><p class="description">세 가지 유물을 눌러 효과를 확인한 뒤 확정해. 유물은 도전 종료까지 지속돼.</p>${pstats()}<div class="relic-grid">${state.rewardOptions.map((id,i)=>relicTile(id,`data-act="previewRewardRelic" data-index="${i}"`)).join('')||'<p>모든 유물을 모았어!</p>'}</div><div class="action-foot"><button class="btn calm" data-act="pickRelic" data-index="-1">유물 대신 15G</button></div></section>`}
function renderShop(){const x=state.shop||{cards:[],relics:[],cardBought:{},relicBought:{},removed:0};return `${header()}${stageStrip()}<section class="panel big-event"><div class="eyebrow">MARKET · 사내 복지몰</div><h1>🛒 이세계 야시장</h1><p class="description">상품이나 카드를 누르면 상세 정보를 먼저 확인해. <b>팝업에서 구매·삭제를 확정하기 전까지는 아무것도 바뀌지 않아.</b></p>${pstats()}<h2 class="sub-title">🎴 카드 판매</h2><div class="shop-grid">${x.cards.map((id,i)=>`<button class="shop-item" data-act="previewShopCard" data-index="${i}" ${x.cardBought[i]?'disabled':''}><span class="shop-icon">${cardThumbMarkup(id)}</span><strong>${cards[id].name}</strong><small>${cards[id].desc}</small><b>${x.cardBought[i]?'구매 완료':cardPrice(id)+'G · 상세 보기'}</b></button>`).join('')}</div><h2 class="sub-title">💎 유물 판매</h2><div class="relic-grid">${x.relics.map((id,i)=>relicTile(id,`data-act="previewShopRelic" data-index="${i}" ${x.relicBought[i]?'disabled':''}`,x.relicBought[i]?'구매 완료':(validWelfare(state)&&i===0?'복지 추천 · ':'')+shopRelicPrice(i)+'G · 상세 보기')).join('')||'<p>남은 유물이 없어.</p>'}</div><h2 class="sub-title">🧹 덱 정리 <span class="sub-note">${30+x.removed*15}G · 카드 한 장만 제거</span></h2><p class="safe-removal-hint">⚠️ 카드 선택 → 상세 확인 → 삭제 확정의 2단계로 진행돼. 상점을 나가기 전에는 방금 삭제한 카드를 복원할 수 있어.</p>${x.lastRemoval?`<div class="undo-line"><span>🧹 방금 제거: <b>${cards[x.lastRemoval.id]?.name||"카드"}</b> · ${x.lastRemoval.price}G</span><button class="btn small calm" data-act="undoRemove">↩ 삭제 취소 · 골드 환불</button></div>`:""}<div class="removal-list">${state.deck.map((id,i)=>`<button data-act="previewRemove" data-index="${i}" ${state.deck.length<=5?'disabled':''}>${cards[id].icon} ${cards[id].name} <b>상세·제거</b></button>`).join('')}</div><div class="action-foot"><button class="btn primary" data-act="leaveNode">↪ 상점 나가기</button></div></section>`}
function renderRest(){return `${header()}${stageStrip()}<section class="panel big-event"><div class="eyebrow">REST SITE · 전투 준비</div><h1>🏕️ 작은 휴게실</h1><p class="description">회복·피로 관리·카드 강화 중 한 가지만 선택할 수 있어. <b>카드 강화는 이름이 같은 모든 사본에 적용</b>돼.</p>${pstats()}<div class="rest-choice"><button class="choice rest-heal" data-act="previewHeal"><span class="symbol">💚</span><strong>따뜻한 휴식</strong><span>체력 24 회복 (최대 체력까지)</span></button><button class="choice rest-heal" data-act="previewRecover" ${state.workFatigue<=0?'disabled':''}><span class="symbol">🌿</span><strong>피로 회복</strong><span>지속 피로 -3 · 현재 ${state.workFatigue}/6</span></button></div><h2 class="sub-title">✨ 카드 강화 (1종 선택)</h2><p class="footnote">강화할 카드를 누르면 강화 전과 강화 후를 비교할 수 있어.</p><div class="removal-list">${availableUpgrades().map(id=>`<button data-act="previewUpgrade" data-id="${id}">${cards[id].icon} ${cards[id].name} <b>비교 보기 ✦</b></button>`).join('')||'<div class="footnote">강화 가능한 카드가 없어. 체력을 회복하자.</div>'}</div></section>`}
const eventCatalog=[
 {icon:'📋',title:'마왕성 긴급 채용',desc:'작은 글씨로 「퇴근 불가」가 적힌 계약서.',options:[['정규직 지원','최대 체력 +10 · 피로 카드 2장'],['계약직 지원','급여 +80G · HP -6 (최소 1)'],['면접 거절','아무 변화 없음']]},
 {icon:'🧬',title:'금지된 사내 연구실',desc:'연구원이 위험한 실험에 참여해 달라고 한다.',options:[['실험 참가','강한 카드 1장 · 피로 카드 1장'],['안전 진단','체력 12 회복'],['떠나기','아무 변화 없음']]},
 {icon:'💸',title:'영혼 급여 협상',desc:'금화를 유물로 바꿔 준다는 낯선 중개인.',options:[['희귀 거래','35G 지불 · 무작위 유물 (중복 없음)'],['선지급','급여 18G · 피로 카드 1장'],['계약 취소','아무 변화 없음']]},
 {icon:'☕',title:'야근 복지 쿠폰',desc:'동료가 말한다. 쿠폰에도 부작용이 있다.',options:[['회복 음료','체력 +18 · 급여 최대 10G 사용'],['융합 카드 복제','융합 카드 +1 · HP -8 (최소 1)'],['그냥 물 마시기','아무 변화 없음']]},
 {icon:'🧹',title:'퇴근길 청소반',desc:'청소부가 오래된 카드 하나를 처리해준다.',options:[['서류 파쇄','피로 카드 1장 제거 · 없으면 10G'],['추가 수당','급여 +30G · HP -7 (최소 1)'],['정중히 사양','아무 변화 없음']]},
 {icon:'🛠️',title:'이세계 사내 교육',desc:'낡은 교재에서 희미한 마력이 느껴진다.',options:[['전문 교육','무작위 카드 이름 1종 무료 강화'],['수업 건너뛰기','급여 +25G · 피로 카드 1장'],['퇴실','아무 변화 없음']]},
 {icon:'🚌',title:'끝나지 않는 퇴근 버스',desc:'버스가 같은 정류장을 일곱 번째 지나친다. 차장이 차비 대신 다른 것을 요구한다.',options:[['졸다가 내리기','HP +15 · 피로 카드 1장'],['비상 탈출','30G · HP -5 (최소 1)'],['이번 정류장 통과','그냥 진행']]},
 {icon:'🛂',title:'마법 보안 검색대',desc:'가방에서 정체불명의 저주 영수증이 검출됐다.',options:[['유료 정밀 검사','18G 지불 · 피로 카드 1장 제거 (없으면 HP +8)'],['벌금 납부 거부','HP -5 (최소 1) · 급여 +15G'],['줄 끝에 서 있기','아무 변화 없음']]},
 {icon:'🎉',title:'신입 사원 환영회',desc:'신입 요정이 현실의 명함과 판타지의 주문서를 들고 있다.',options:[['명함 교환','무작위 현실 직업 카드 1장 · 피로 카드 1장'],['주문 교환','무작위 판타지 직업 카드 1장 · 피로 카드 1장'],['조용히 퇴장','HP +6']]},
 {icon:'🧺',title:'이세계 사내 벼룩시장',desc:'이름 없는 상인이 장신구에 적힌 원가를 급히 지운다.',options:[['흥정 성공?','45G 지불 · 랜덤 유물 1개'],['불량품 대신 판매','30G · 피로 카드 2장'],['구경만 하기','아무 변화 없음']]},
 {icon:'🌀',title:'불안정한 통근 포털',desc:'포털의 행선지가 「회사」와 「집」 사이에서 깜빡인다.',options:[['지름길 통과','35G · HP -9 (최소 1)'],['안전장치 설치','최대 HP +6 · 피로 카드 1장'],['계단으로 이동','HP +5']]},
 {icon:'🎓',title:'사내 특별 세미나',desc:'강사는 현실과 마법의 업무를 각각 가르치고 있다.',options:[['현실 실습','무작위 현실 카드 1종 강화 · HP -4 (최소 1)'],['마법 실습','15G 지불 · 무작위 판타지 카드 1종 강화'],['출석만 하기','10G 획득']]},
 {icon:'🎰',title:'인사 평가 룰렛',desc:'매우 공정하다고 쓰인 룰렛. 단, 평가 기준은 공개되지 않는다.',options:[['승부 걸기','50%: +50G / 실패: -10G (최대 보유량)'],['안전한 근무평가','12G 확정 획득'],['평가 거부','아무 변화 없음']]},
 {icon:'⏳',title:'멈춰 버린 사무실',desc:'초침이 멈췄다. 오래된 계약서에서 시간의 냄새가 난다.',options:[['시간을 팔기','최대 HP +8 · HP -8 (최소 1) · 피로 카드 1장'],['융합 야근','융합 카드 1장 · 피로 카드 1장'],['시계를 다시 돌리기','HP +8']]},
  {pair:'accountant-warlock',icon:'🕯️',title:'망자의 세금 체납',desc:'사망한 직원의 미납 세금이 생전에 발행한 급여명세서로 돌아왔다.',options:[['사후 추심','36G · 영구 피로 카드 1장'],['추모 공제','체력 14 회복'],['추심 보류','6G 확보']]},
  {pair:'accountant-alchemist',icon:'⚗️',title:'황금 분식 회계',desc:'연금술로 매출을 부풀린 장부에서 노란빛이 새어 나온다.',options:[['황금 손익 정리','현자의 손익계산 카드 1장 · 8G'],['신체 자산 재평가','18G 지불 · 최대 HP +6 · HP +6'],['외부 감사','8G 확보']]},
  {pair:'chef-warlock',icon:'🍖',title:'마왕의 구내식당 감사',desc:'지옥에서 식중독은 당연하다는 규정에 조리장이 반기를 들었다.',options:[['지옥 신메뉴 개발','금단의 풀코스 카드 1장 · 영구 피로 카드 1장'],['직원 식사 제공','체력 16 회복 · 최대 8G 소모'],['위생 교육만','8G 확보']]},
  {pair:'chef-alchemist',icon:'🧪',title:'금지된 조리 실험',desc:'연금 냄비가 내일의 메뉴를 미리 끓여 버렸다.',options:[['미래의 연회','연금 연회 카드 1장 · 영구 피로 카드 1장'],['재료 연구','요리·연금 카드 1종 강화 · HP -5'],['일반식 제공','8G 확보']]}

];
function eventAllowed(id,i){
 if(i===2)return true;
  if(id===15&&i===1)return state.gold>=18;
  if(id===17&&i===1)return availableUpgrades().some(k=>['chef','alchemist'].includes(cards[k].job));
 if(id===2&&i===0)return state.gold>=35&&relicOptions(1).length>0;
 if(id===7&&i===0)return state.gold>=18;
 if(id===9&&i===0)return state.gold>=45&&relicOptions(1).length>0;
 if(id===11&&i===1)return state.gold>=15&&availableUpgrades().some(k=>cards[k].job===state.fantasy);
 if(id===11&&(i===0||i===1)){const j=i===0?state.real:state.fantasy;return availableUpgrades().some(k=>cards[k].job===j)}
 return true;
}
function renderEvent(){const event=eventCatalog[state.eventId??0]||eventCatalog[0];return `${header()}${stageStrip()}<section class="panel big-event"><div class="eyebrow">EVENT · RANDOM ENCOUNTER · ${eventCatalog.length}종</div><div class="event-icon">${event.icon}</div><h1>${event.title}</h1><p class="description">${event.desc}</p>${pstats()}<div class="choice-grid">${event.options.map(([title,desc],i)=>`<button class="choice" data-act="previewEvent" data-index="${i}" ${!eventAllowed(state.eventId??0,i)?'disabled':''}><span class="symbol">${['✨','🎲','↪'][i]}</span><strong>${title}</strong><span>${desc}</span></button>`).join('')}</div><p class="footnote">🎭 선택지를 누르면 결과와 비용을 확인한 뒤 확정할 수 있어. 방문한 이벤트는 가능한 한 반복되지 않아.</p></section>`}
function renderEnd(){const won=state.phase==='victory';return `${header()}<section class="panel end-screen"><div class="eyebrow">${won?'RUN COMPLETE':'GAME OVER'} · ${won?'SUCCESSFUL RESIGNATION':'OVERTIME NEVER ENDS'}</div><div class="end-icon">${won?'🎓':'🥀'}</div><h1>${won?'마왕에게 사표를 던졌다!':'다음 출근을 준비하자'}</h1><p class="description" style="color:#cfc3dc;line-height:1.8">${won?'인사부장이 무너지고 이세계 최초의 정시 퇴근이 실현됐다. 하지만 채용 공고는 다시 올라온다.':'이번 계약은 여기까지야. 직업 조합은 도감에 기록됐으니, 다음에는 더 강력한 콤보로 도전하자.'}</p><div class="pill gold" style="font-size:16px;padding:9px 16px">${pair().icon} ${pair().name}</div><div class="end-stats"><div><strong>${state.defeated||0}</strong><small>처치한 적</small></div><div><strong>${state.synergies||0}</strong><small>겸직 발동</small></div><div><strong>${state.gold}G</strong><small>획득한 골드 보유량</small></div></div><button class="btn primary wide" data-act="restart">🔁 새로운 직업으로 재도전</button><p class="small-print">🎴 발견 조합 ${meta.combos.length}/4 · 누적 승리 ${meta.wins||0}회 · 이 게임은 로컬 프로토타입으로 네트워크/결제 기능이 없어.</p></section>`}
const utilityDrawCards=new Set(['receipt','taste','extract','catalyst','pantry','closeBooks','darkBargain','hustle','soul']);
const upgradedDamageCards=new Set(['audit','collect','chop','flambe','curse','drain','night','blast','hellTax','goldAudit','infernalMenu','grandFeast','strike','surpriseAudit','spiceStorm','eclipse','flashFlask','chainReaction']);
const upgradedBlockCards=new Set(['ledger','balance','broth','lunch','veil','transmute','goldAudit','guard','riskHedge','distill']);
const upgradedHealCards=new Set(['lunch','drain','elixir','infernalMenu','grandFeast','hotMeal']);
function upgradeModifiers(id){const c=cards[id],d=[];if(c.cost>=2&&c.cost!==99)d.push('에너지 비용 1 감소');if(upgradedDamageCards.has(id))d.push('적중할 때마다 피해 +3');if(upgradedBlockCards.has(id))d.push('방어 획득마다 +3');if(upgradedHealCards.has(id))d.push('회복 발동마다 체력 +2');if(utilityDrawCards.has(id))d.push('카드 추가 드로우 +1');return d.length?d:['강화 보너스 적용'];}
function beginTransaction(kind,v){if(!state||modal)return;let a=null;
 if(kind==='shopCard'&&state.phase==='shop'){const i=Number(v),id=state.shop?.cards[i];if(id&&cards[id]&&!state.shop.cardBought[i])a={kind,id,index:i,price:cardPrice(id),phase:'shop'};}
 if(kind==='shopRelic'&&state.phase==='shop'){const i=Number(v),id=state.shop?.relics[i];if(id&&relics[id]&&!state.shop.relicBought[i]&&!hasRelic(id))a={kind,id,index:i,price:shopRelicPrice(i),phase:'shop'};}
 if(kind==='remove'&&state.phase==='shop'){const i=Number(v),id=state.deck[i];if(id&&cards[id]&&state.deck.length>5)a={kind,id,index:i,price:30+state.shop.removed*15,phase:'shop'};}
 if(kind==='upgrade'&&state.phase==='rest'){const id=String(v);if(cards[id]&&availableUpgrades().includes(id))a={kind,id,phase:'rest'};}
 if(kind==='rewardRelic'&&state.phase==='relicReward'){const i=Number(v),id=state.rewardOptions[i];if(id&&relics[id]&&!hasRelic(id))a={kind,id,index:i,phase:'relicReward'};}
 if(kind==='heal'&&state.phase==='rest')a={kind,phase:'rest'};
 if(kind==='recover'&&state.phase==='rest'&&state.workFatigue>0)a={kind,phase:'rest'};
 if(kind==='event'&&state.phase==='event'){const i=Number(v),eventId=state.eventId??0;if(eventCatalog[eventId]?.options[i]&&eventAllowed(eventId,i))a={kind,index:i,eventId,phase:'event'};}
 if(!a)return;pendingAction=a;modal='transaction';render();
}
function executeTransaction(){if(modal!=='transaction'||!pendingAction||!state)return;
 const a=pendingAction; // Recheck every price, source and current state before any write.
 if(state.phase!==a.phase)return;
 if(a.kind==='shopCard'&&!(state.shop?.cards[a.index]===a.id&&!state.shop.cardBought[a.index]&&cardPrice(a.id)===a.price&&state.gold>=a.price))return;
 if(a.kind==='shopRelic'&&!(state.shop?.relics[a.index]===a.id&&!state.shop.relicBought[a.index]&&!hasRelic(a.id)&&shopRelicPrice(a.index)===a.price&&state.gold>=a.price))return;
 if(a.kind==='remove'&&!(state.deck[a.index]===a.id&&state.deck.length>5&&a.price===30+state.shop.removed*15&&state.gold>=a.price))return;
 if(a.kind==='rewardRelic'&&!(state.rewardOptions[a.index]===a.id&&relics[a.id]&&!hasRelic(a.id)))return;
 if(a.kind==='upgrade'&&!availableUpgrades().includes(a.id))return;
 if(a.kind==='event'&&(a.eventId!==(state.eventId??0)||!eventAllowed(a.eventId,a.index)))return;
 pendingAction=null;modal='';
 if(a.kind==='shopCard')buyItem('card',a.index);
 else if(a.kind==='shopRelic')buyItem('relic',a.index);
 else if(a.kind==='remove')buyItem('remove',a.index);
 else if(a.kind==='rewardRelic')pickRelic(a.index);
 else if(a.kind==='upgrade')restAction('upgrade',a.id);
 else if(a.kind==='heal')restAction('heal');
 else if(a.kind==='recover')restAction('recover');
 else if(a.kind==='event')selectEvent(a.index);
}
function detailsForTransaction(){const a=pendingAction;if(!a)return '<p>선택 정보가 없어.</p>';const c=cards[a.id],r=relics[a.id];
 if(a.kind==='shopCard'||a.kind==='remove'){
 const buying=a.kind==='shopCard',copies=state.deck.filter(id=>id===a.id).length;const pay=state.gold>=a.price;
 return `<div class="transaction-head"><span class="txn-icon">${cardThumbMarkup(a.id)}</span><div><div class="eyebrow">${buying?'카드 구매 미리보기':'카드 제거 미리보기'}</div><h2>${esc(c.name)}</h2><p>${toneName[c.family]} · 비용 ${c.cost}⚡</p></div></div><div class="txn-description"><strong>📜 카드 효과</strong><p>${esc(c.desc)}${upgraded(a.id)?' · 현재 강화 적용':''}</p></div>${!buying?`<div class="warning-note">⚠️ <b>이 카드 사본 1장만 덱에서 영구 제거</b>해. 같은 이름 ${copies}장 보유 중이며 제거 후 ${copies-1}장이 남아. 상점에서 나가기 전에는 삭제 취소가 가능해.</div>`:`<div class="info-note">구매하면 <b>${esc(c.name)} 1장</b>이 덱에 추가돼. 현재 덱 ${state.deck.length} → ${state.deck.length+1}장</div>`}<div class="transaction-balance"><span>현재 잔액 <b>${state.gold}G</b></span><span>비용 <b>−${a.price}G</b></span><span>남는 잔액 <b>${pay?state.gold-a.price+'G':'잔액 부족'}</b></span></div><div class="txn-actions"><button class="btn calm" data-act="closeModal">취소</button><button class="btn ${buying?'primary':'danger'}" data-act="confirmPending" ${!pay?'disabled':''}>${buying?'🎴 구매 확정':'🗑️ 삭제 확정'} · ${a.price}G</button></div>`;
 }
 if(a.kind==='rewardRelic'){return `<div class="transaction-head"><span class="txn-icon">${relicArtMarkup(a.id)}</span><div><div class="eyebrow">정예 전투 보상 · ${r.rarity}</div><h2>${esc(r.name)}</h2></div></div><div class="txn-description"><strong>💎 지속 효과</strong><p>${esc(r.desc)}</p></div><div class="info-note">한 가지 유물만 고를 수 있어. 확정하면 이번 도전에 적용되고 다음 갈림길로 이동해.</div><div class="txn-actions"><button class="btn calm" data-act="closeModal">다른 유물 보기</button><button class="btn primary" data-act="confirmPending">💎 유물 선택 확정</button></div>`}
 if(a.kind==='shopRelic'){const pay=state.gold>=a.price;return `<div class="transaction-head"><span class="txn-icon">${relicArtMarkup(a.id)}</span><div><div class="eyebrow">유물 구매 미리보기 · ${r.rarity}</div><h2>${esc(r.name)}</h2></div></div><div class="txn-description"><strong>💎 지속 효과</strong><p>${esc(r.desc)}</p></div><div class="info-note">유물은 덱에 들어가지 않고 이번 도전 동안 적용돼. 현재 보유 ${state.relics.length}/12종.</div><div class="transaction-balance"><span>현재 잔액 <b>${state.gold}G</b></span><span>비용 <b>−${a.price}G</b></span><span>남는 잔액 <b>${pay?state.gold-a.price+'G':'잔액 부족'}</b></span></div><div class="txn-actions"><button class="btn calm" data-act="closeModal">취소</button><button class="btn primary" data-act="confirmPending" ${!pay?'disabled':''}>💎 유물 구매 확정 · ${a.price}G</button></div>`}
 if(a.kind==='upgrade'){
 const copies=state.deck.filter(id=>id===a.id).length,nb=cardNumbers(a.id,{forceUp:false,live:false}),na=cardNumbers(a.id,{forceUp:true,live:false});
 return `<h2>✨ 카드 강화 비교</h2><p class="txn-intro">강화 전후 수치를 확인한 뒤 확정해. <b>같은 이름 카드 ${copies}장 전체 적용</b>.</p><div class="upgrade-comparison"><div class="compare-card before"><span class="compare-label">강화 전</span><div class="compare-icon">${cardThumbMarkup(a.id)}</div><strong>${esc(c.name)}</strong><span class="energy-cost">⚡ ${nb?nb.cost:c.cost}</span>${faceStatsMarkup(a.id,{forceUp:false,live:false})}<small>${esc(c.desc)}</small></div><div class="compare-arrow">➜</div><div class="compare-card after"><span class="compare-label">강화 후 ✦</span><div class="compare-icon">${cardThumbMarkup(a.id)}</div><strong>${esc(c.name)}+</strong><span class="energy-cost">⚡ ${na?na.cost:c.cost}</span>${faceStatsMarkup(a.id,{forceUp:true,live:false})}<ul class="up-diff">${upgradeDiffMarkup(a.id)}</ul></div></div><div class="info-note">수치는 자원·유물이 없는 기본 상태 기준이야. 공격은 강화된 카드가 피해를 줄 때마다 +3씩 더해져. 이 휴식 지점은 강화를 확정하면 종료돼.</div><div class="txn-actions"><button class="btn calm" data-act="closeModal">취소</button><button class="btn primary" data-act="confirmPending">✨ 강화 확정</button></div>`;
 }
 if(a.kind==='recover'){return `<h2>🌿 피로 회복</h2><div class="txn-description">피로도 ${state.workFatigue}/6 → <b>${Math.max(0,state.workFatigue-3)}/6</b></div><p>회복·강화·피로 관리 중 하나만 선택할 수 있어.</p><div class="txn-actions"><button class="btn calm" data-act="closeModal">취소</button><button class="btn primary" data-act="confirmPending">피로 회복 확정</button></div>`}
 if(a.kind==='heal'){const n=Math.min(24,state.maxHp-state.hp);return `<h2>💚 휴식으로 회복</h2><div class="txn-description">체력 ${state.hp}/${state.maxHp} → <b>${state.hp+n}/${state.maxHp}</b> · 실제 회복량 ${n}</div><p>이 지점에서는 회복과 강화 중 하나만 선택할 수 있어.</p><div class="txn-actions"><button class="btn calm" data-act="closeModal">취소</button><button class="btn primary" data-act="confirmPending">회복 확정</button></div>`}
 if(a.kind==='event'){const e=eventCatalog[a.eventId],o=e.options[a.index];return `<div class="transaction-head"><span class="txn-icon">${e.icon}</span><div><div class="eyebrow">이벤트 선택 확인</div><h2>${esc(o[0])}</h2><p>${esc(e.title)}</p></div></div><div class="txn-description"><strong>선택 결과</strong><p>${esc(o[1])}</p></div><div class="info-note">이벤트 선택은 한 번만 할 수 있어. 선택하면 다음 갈림길로 이동해.</div><div class="txn-actions"><button class="btn calm" data-act="closeModal">다른 선택 보기</button><button class="btn primary" data-act="confirmPending">이 선택 확정</button></div>`}
 return '<p>선택 정보가 없어.</p>';
}
function jobBriefMarkup(k){const p=pairs[k],g=JOB_GUIDE[k];return `<div class="transaction-head"><span class="txn-icon">${p.icon}</span><div><div class="eyebrow">처음 출근하는 직업 · ${stars(g.level)} ${g.label}</div><h2>${p.name}</h2><p>${g.core}</p></div></div><div class="txn-description"><strong>핵심 자원</strong><p>${g.resourceBrief}</p></div><div class="pd-box" style="margin-top:10px"><b class="h">기본 전략</b><ol>${g.strategy.map(x=>`<li>${x}</li>`).join('')}</ol><b class="h" style="margin-top:8px">대표 조합</b>${comboMarkup(k)}<div class="pd-note">${g.comboNote}</div></div><div class="info-note">✨ 겸직 자동 효과: <b>${dualSummary(k)}</b> (현실+판타지 카드를 같은 턴에, 턴당 1회)</div><div class="txn-actions"><button class="btn primary" data-act="closeModal">확인, 전투 시작</button></div>`}
const GUIDE_HTML=()=>`<h2>📖 이세계 출근 안내서 · v0.6.21</h2>
<div class="guide-actions"><button class="btn primary small" data-act="tutReplay">🎓 튜토리얼 다시 보기</button></div>
<div class="guide-sec"><b>⚔ 기본 전투</b><p>카드를 탭하면 전장을 보면서 효과를 확인할 수 있어. 적 또는 내 캐릭터를 탭하면 사용해. 「상세」에서 전체 설명을 볼 수 있어. 손패를 좌우로 넘겨 탐색하고, 위로 끌어 대상에 놓으면 바로 사용해. 에너지는 매 턴 ⚡3, 손패는 5장. 「턴 종료」를 누르면 적이 예고한 행동을 해. 오른쪽 <b>예상 피해</b>를 보고 방어를 챙기자.</p></div>
<div class="guide-sec"><b>✨ 겸직 (자동)</b><p>같은 턴에 청록 「현실」 카드와 보라 「판타지」 카드를 쓰면 직업 고유 효과가 자동 발동해. 턴당 1번. 공용·융합 카드는 조건에 포함되지 않아. 한쪽만 썼으면 나머지 계열 카드에 <b>✦겸직</b> 표시가 떠.</p></div>
<div class="guide-sec"><b>${statIcon('overtime')} 초과근무</b><p>전투당 1번 쓰는 특수 행동. 즉시 ⚡+1, 대신 💤 피로도 +2. 피로도 5 이상이면 쓸 수 없어. 겸직 효과와 따로 계산돼.</p></div>
<div class="guide-sec"><b>💤 피로도 vs 🥱 피로 카드</b><p><b>피로도</b>(0~6)는 다음 전투까지 이어지는 게이지야. 3↑이면 전투 시작 손패 1장이 임시 피로 카드, 5↑이면 초과근무 불가. 승리 −1, 휴식 「피로 회복」 −3. <b>피로 카드</b>는 사용 불가 카드야. 적의 📜 특수 공격은 이번 전투에만 임시로, 일부 이벤트는 덱에 영구로 넣어. 영구 피로 카드는 상점 덱 정리로 지울 수 있어.</p></div>
<div class="guide-sec"><b>🧬 직업별 핵심 자원</b>${JOB_ORDER.map(k=>`<div class="guide-job"><span>${pairs[k].icon} <b>${pairs[k].name}</b> ${stars(JOB_GUIDE[k].level)}</span><span>${JOB_GUIDE[k].resources.map(resChip).join('')}</span><small>${JOB_GUIDE[k].core} · 겸직: ${dualSummary(k)}</small></div>`).join('')}<p class="footnote">★은 규칙 복잡도야. 별이 많다고 더 강하지 않아.</p></div>
<div class="guide-sec"><b>🗺 갈림길·보상</b><p>9개 지점마다 길을 골라. 일반 전투는 카드, 정예는 유물(12종), 상점은 구매·제거, 휴식은 회복·피로 회복·강화 중 하나. 구매·제거·강화·이벤트 선택은 모두 <b>미리보기 → 확정</b> 2단계야.</p></div>
<div class="guide-sec"><b>🎓 사내 전문교육</b><p>새 도전은 3구역을 마친 뒤 전문화 하나를 무료로 선택해. 이번 도전 동안 자동 적용되며 기존 겸직 규칙은 유지돼. 4구역 상점은 미보유 일반 유물 한 칸을 10G 할인해. 기존 진행 중인 도전은 이전 규칙으로 끝까지 이어가.</p></div>
<div class="guide-sec"><b>💾 저장</b><p>v0.6.21은 v0.6 계열과 같은 저장 키에 자동 저장돼. 이전 C2.2·C2.1·C2·C1·v0.4.1 진행은 원본을 건드리지 않고 복사본으로만 가져와. 브라우저 데이터를 지우면 기록도 지워져.</p></div>`;
const backupOwn=(o,k)=>!!o&&Object.hasOwn(o,k);
const backupPlain=o=>!!o&&typeof o==='object'&&!Array.isArray(o);
function checkedBackupTree(value,depth=0,budget={n:0}){
 if(++budget.n>20000||depth>20)throw Error('파일 구조가 너무 복잡해요.');
 if(typeof value==='number'&&!Number.isFinite(value))throw Error('올바르지 않은 숫자가 있어요.');
 if(typeof value==='string'&&value.length>20000)throw Error('문자열이 너무 길어요.');
 if(value&&typeof value==='object')for(const [k,v]of Object.entries(value)){
  if(['__proto__','constructor','prototype'].includes(k))throw Error('지원하지 않는 파일 구조예요.');checkedBackupTree(v,depth+1,budget);
 }
}
function validateBackupRun(raw){
 if(raw===null)return null;
 if(!backupPlain(raw)||raw.version!==4||!RUN_PHASES.includes(raw.phase)||!backupOwn(pairs,raw.real+'-'+raw.fantasy))throw Error('지원하지 않는 진행 기록이에요.');
 if(!validTrainingSave(raw)||raw.shop?.welfare&&!validWelfare(raw))throw Error('전문교육·복지 상품 기록이 올바르지 않아요.');
 const array=(v,valid,max=300)=>Array.isArray(v)&&v.length<=max&&v.every(valid);
 const card=id=>typeof id==='string'&&backupOwn(cards,id),relic=id=>typeof id==='string'&&backupOwn(relics,id);
 if(!array(raw.deck,card)||!raw.deck.length||!['hand','drawPile','discard'].every(k=>array(raw[k],card)))throw Error('카드 목록이 올바르지 않아요.');
 if(!array(raw.relics,relic,50)||!backupPlain(raw.upgrades)||!Object.entries(raw.upgrades).every(([k,v])=>card(k)&&typeof v==='boolean'))throw Error('강화·유물 기록이 올바르지 않아요.');
 for(const k of ['hp','maxHp','gold','stage','turn','energy','block','ingredient','reagent','workFatigue','synergies','defeated','overtimes']){
  const v=raw[k];if(typeof v!=='number'||!Number.isFinite(v)||v<0||v>1000000)throw Error('진행 수치가 올바르지 않아요.');
 }
 if(!Number.isInteger(raw.stage)||raw.stage>8||raw.hp<1||raw.hp>raw.maxHp||raw.workFatigue>6)throw Error('구역·체력·피로도 범위를 확인해 주세요.');
 if(!array(raw.path,x=>x===null||(backupPlain(x)&&backupOwn(nodeInfo,x.type)&&Number.isInteger(x.choice)&&x.choice>=0&&x.choice<3),9))throw Error('이동 기록이 올바르지 않아요.');
 if(!array(raw.logs,x=>typeof x==='string'&&x.length<2000,20)||typeof raw.message!=='string')throw Error('전투 기록이 올바르지 않아요.');
 if(!backupPlain(raw.relicTurn)||!backupPlain(raw.relicUsed)||!array(raw.eventHistory,x=>Number.isInteger(x)&&x>=0&&x<eventCatalog.length,100))throw Error('도전 기록이 올바르지 않아요.');
 if(raw.tutorial!==null&&(!backupPlain(raw.tutorial)||!Number.isInteger(raw.tutorial.step)||raw.tutorial.step<0||raw.tutorial.step>=TUTORIAL.length))throw Error('튜토리얼 기록이 올바르지 않아요.');
 if(raw.lastDual!=null&&(!backupPlain(raw.lastDual)||typeof raw.lastDual.text!=='string'||!Number.isFinite(raw.lastDual.turn)))throw Error('겸직 기록이 올바르지 않아요.');
 if(raw.phase==='battle'){
  if(!array(raw.enemies,e=>backupPlain(e)&&backupOwn(enemies,e.id)&&typeof e.name==='string'&&typeof e.icon==='string'&&['hp','maxHp','baseAttack','block','debt','curse'].every(k=>Number.isFinite(e[k])&&e[k]>=0&&e[k]<=1000000)&&e.maxHp>0&&e.hp<=e.maxHp,3)||!raw.enemies.some(e=>e.hp>0))throw Error('적 정보가 올바르지 않아요.');
  for(const e of raw.enemies)if(e.intent!=null&&(!backupPlain(e.intent)||!['attack','curse','guard','charge','prepare','slam'].includes(e.intent.type)))throw Error('적 행동 정보가 올바르지 않아요.');
 }
 if(raw.phase==='reward'&&!array(raw.rewardOptions,card,3))throw Error('카드 보상이 올바르지 않아요.');
 if(raw.phase==='relicReward'&&!array(raw.rewardOptions,relic,3))throw Error('유물 보상이 올바르지 않아요.');
 if(raw.phase==='event'&&(!Number.isInteger(raw.eventId)||raw.eventId<0||raw.eventId>=eventCatalog.length))throw Error('사건 정보가 올바르지 않아요.');
 if(raw.shop!=null){
  const x=raw.shop;if(!backupPlain(x)||!array(x.cards,card,3)||!array(x.relics,relic,2)||!backupPlain(x.cardBought)||!backupPlain(x.relicBought)||!Number.isInteger(x.removed)||x.removed<0)throw Error('상점 정보가 올바르지 않아요.');
  if(x.lastRemoval&&(!backupPlain(x.lastRemoval)||!card(x.lastRemoval.id)||!Number.isInteger(x.lastRemoval.index)||x.lastRemoval.index<0||!Number.isFinite(x.lastRemoval.price)||x.lastRemoval.price<0))throw Error('상점 복구 기록이 올바르지 않아요.');
 }
 if(raw.phase==='shop'&&!raw.shop)throw Error('상점 기록이 없어요.');
 const run=sanitizeRun(raw);if(!run)throw Error('진행 기록을 복원할 수 없어요.');return run;
}
function parseBackup(text){
 if(typeof text!=='string'||new Blob([text]).size>SAVE_LIMIT)throw Error('백업은 512KB 이하의 JSON 파일이어야 해요.');
 let x;try{x=JSON.parse(text)}catch{throw Error('JSON 파일을 읽지 못했어요. 백업 파일을 다시 선택해 주세요.')}
 checkedBackupTree(x);
 if(!backupPlain(x)||x.game!=='aldol-dualjob'||x.backupVersion!==1||!backupOwn(x,'run')||!backupPlain(x.meta)||!backupPlain(x.settings)||typeof x.settings.readableBattle!=='boolean')throw Error('겸직금지! 백업 파일이 아니거나 지원하지 않는 버전이에요.');
 for(const k of ['attempts','wins','best'])if(!Number.isInteger(x.meta[k])||x.meta[k]<0||x.meta[k]>1000000)throw Error('누적 기록이 올바르지 않아요.');
 if(!Array.isArray(x.meta.combos)||!x.meta.combos.every(k=>backupOwn(pairs,k))||!Array.isArray(x.meta.seenPairs)||!x.meta.seenPairs.every(k=>backupOwn(pairs,k))||typeof x.meta.tutorialDone!=='boolean')throw Error('직업·튜토리얼 기록이 올바르지 않아요.');
 return {schema:1,run:validateBackupRun(x.run),meta:cleanMeta(x.meta),settings:{readableBattle:x.settings.readableBattle}};
}
function currentSavePacket(){return {schema:1,run:state?(RUN_PHASES.includes(state.phase)?JSON.parse(JSON.stringify(state)):null):(savedRun?JSON.parse(JSON.stringify(savedRun)):null),meta:JSON.parse(JSON.stringify(meta)),settings:{readableBattle}}}
function backupText(){const x=currentSavePacket();return JSON.stringify({game:'aldol-dualjob',backupVersion:1,gameVersion:'0.6.21',createdAt:new Date().toISOString(),run:x.run,meta:x.meta,settings:x.settings},null,2)}
function downloadBackup(){
 try{const blob=new Blob([backupText()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='dualjob-save-'+new Date().toISOString().replace(/[:.]/g,'-')+'.json';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);saveMessage='백업 파일 다운로드를 요청했어요. 저장이 안 되면 아래 백업 텍스트를 복사해 주세요.'}
 catch{saveMessage='다운로드를 시작하지 못했어요. 아래 백업 텍스트를 복사해 주세요.'}
 render();
}
function prepareRestore(text){restoreCandidate=null;saveMessage='';try{restoreCandidate=parseBackup(text);modal='restoreSave'}catch(e){saveMessage=e.message;modal='saveManager'}render()}
async function readBackupFile(file){
 const token=++restoreSerial;restoreCandidate=null;if(!file)return;
 if(file.size>SAVE_LIMIT){saveMessage='백업 파일은 512KB 이하여야 해요.';render();return}
 try{const text=await file.text();if(token!==restoreSerial||modal!=='saveManager')return;prepareRestore(text)}catch{if(token===restoreSerial){saveMessage='파일을 읽지 못했어요. 백업 텍스트를 붙여넣어 주세요.';render()}}
}
function commitRestore(){
 if(modal!=='restoreSave'||!restoreCandidate)return;
 const next=restoreCandidate;
 // A single verified setItem succeeds before any live run/meta is replaced.
 if(!persistSavePacket(next,true)){saveMessage='복원을 저장하지 못했어요. 현재 플레이 화면과 기록은 적용 전 상태로 유지합니다.';modal='saveManager';restoreCandidate=null;render();return}
 restoreCandidate=null;restoreSerial++;cleanGesture();selectedCard=null;selectionProjection=null;journeyReward=null;journeyRoute=null;inspected=null;pendingAction=null;
 state=null;savedRun=next.run;meta=next.meta;readableBattle=next.settings.readableBattle;
 if(savedRun){pickReal=savedRun.real;pickFantasy=savedRun.fantasy}
 modal='saveManager';saveMessage='복원했어요. 닫은 뒤 이어하기를 누르면 계속할 수 있어요.';render();
}
function saveManagerMarkup(){
 const run=state&&RUN_PHASES.includes(state.phase)?state:savedRun;
 return `<h2>저장 및 백업</h2><p>진행과 누적 기록은 이 브라우저에 저장됩니다. 다른 주소·기기에서는 백업 파일을 가져와 주세요.</p><div class="save-summary">${run?esc(pairs[run.real+'-'+run.fantasy].name)+' · 구역 '+(run.stage+1)+'/9':'진행 중인 도전 없음'}<br/>누적 승리 ${meta.wins} · 도전 ${meta.attempts}</div>${saveIssue?`<p class="save-error" role="alert">${esc(saveIssue)}</p>`:'<p class="save-ok">자동 저장 사용 중 · 브라우저 데이터 삭제 시 기록도 사라집니다.</p>'}${saveMessage?`<p role="status">${esc(saveMessage)}</p>`:''}<div class="save-actions"><button class="btn primary" data-act="exportSave">백업 파일 내보내기</button><button class="btn calm" data-act="retrySave">현재 기록 저장 재시도</button></div><label class="save-file">백업 파일 가져오기<input id="backup-file" type="file" accept=".json,application/json"/></label><details class="save-text"><summary>파일 저장이 안 되나요? 백업 텍스트 보기</summary><textarea id="backup-output" readonly aria-label="현재 기록 백업 텍스트">${esc(backupText())}</textarea><button class="btn small" data-act="selectBackupText">텍스트 전체 선택</button></details><details class="save-text"><summary>백업 텍스트 붙여넣기</summary><textarea id="backup-input" maxlength="524288" spellcheck="false" aria-label="복원할 백업 텍스트"></textarea><button class="btn calm" data-act="previewBackupText">내용 확인</button></details>`;
}
function restoreSaveMarkup(){const x=restoreCandidate,r=x?.run;if(!x)return '';return `<h2>이 기록으로 복원할까요?</h2><div class="save-summary">${r?esc(pairs[r.real+'-'+r.fantasy].name)+' · 구역 '+(r.stage+1)+'/9 · 체력 '+r.hp+'/'+r.maxHp:'진행 중인 도전 없음'}<br/>누적 승리 ${x.meta.wins} · 도전 ${x.meta.attempts}</div><p>현재 진행과 누적 기록, 화면 설정을 위 내용으로 교체합니다. 지금 기록이 필요하면 먼저 백업해 주세요.</p><div class="save-actions"><button class="btn calm" data-act="cancelRestore">취소</button><button class="btn primary" data-act="commitRestore">이 기록으로 복원</button></div>`}
function releaseAboutMarkup(){return `<h2>겸직금지!</h2><p class="release-tag">공개 테스트 · v0.6.21</p><p>낮에는 직장인, 밤에는 던전 출근. 현실과 판타지 직업을 조합하고 카드를 모아 인사부장 마왕에게 퇴사를 통보하세요.</p><p>직업 4종 · 갈림길 9개 구역 · 싱글플레이 카드 로그라이트</p><h3>기록과 개인정보</h3><p>게임에는 계정·클라우드 저장·게임 분석 전송 기능이 없습니다. 기록은 이 브라우저에 저장됩니다. 배포 후 호스팅 서비스의 접속 로그는 게임 저장과 별도로 처리될 수 있습니다.</p><h3>제작</h3><p>ALDOL · AI 도구를 활용해 제작한 일러스트를 포함합니다. 글꼴 출처와 라이선스는 규칙 안내에서 확인할 수 있어요.</p><h3>버그 제보</h3><p>버전, 기기·브라우저, 문제가 생긴 행동과 스크린샷을 함께 알려 주세요. 백업 파일에는 플레이 기록이 포함되므로 필요할 때만 첨부해 주세요.</p>`}
function handleReleaseAction(act){
 if(act==='saveManager'){restoreSerial++;restoreCandidate=null;saveMessage='';modal='saveManager';render();return true}
 if(act==='releaseAbout'){modal='releaseAbout';render();return true}
 if(act==='exportSave'&&modal==='saveManager'){downloadBackup();return true}
 if(act==='retrySave'&&modal==='saveManager'){saveMessage=persistSavePacket(currentSavePacket())?'현재 기록을 저장하고 확인했어요.':'저장할 수 없어요. 현재 기록을 백업해 주세요.';render();return true}
 if(act==='previewBackupText'&&modal==='saveManager'){prepareRestore(document.getElementById('backup-input')?.value||'');return true}
 if(act==='selectBackupText'&&modal==='saveManager'){const el=document.getElementById('backup-output');el?.focus();el?.select();return true}
 if(act==='cancelRestore'&&modal==='restoreSave'){restoreCandidate=null;modal='saveManager';render();return true}
 if(act==='commitRestore'){commitRestore();return true}
 return false;
}
document.addEventListener('change',e=>{if(e.target.id==='backup-file'&&modal==='saveManager')readBackupFile(e.target.files?.[0])});
document.getElementById('save-alert').addEventListener('click',()=>{if(combatPlayback)finishCombatPlayback();handleReleaseAction('saveManager')});

function renderModal(){if(!modal)return '';let content='',eyebrow='GAME MANUAL';
 if(modal==='battleMenu'){content=battleMenuMarkup();eyebrow='DISPLAY & GAME'}
 else if(modal==='trainingInfo'){content=trainingInfoMarkup();eyebrow='CAREER TRAINING'}
 else if(modal==='mobileTutorial'){content=tutorialMarkup()||'<h2>튜토리얼 완료</h2><p>카드 선택 → 대상 탭으로 사용해요.</p>';eyebrow='HOW TO PLAY'}
 else if(modal==='transaction'){content=detailsForTransaction();eyebrow='선택 확인 · 아직 반영되지 않음'}
 else if(modal==='guide'){content=GUIDE_HTML()+`<details><summary>글꼴 저작권 및 라이선스</summary><h3>GmarketSans-OFL</h3><pre style="white-space:pre-wrap;font:11px/1.5 inherit;max-height:220px;overflow:auto">Copyright © 2019 eBay Korea Co., Ltd. All rights reserved.

[LICENSE]

Copyright © &lt; 2019.&gt;, &lt;eBay Korea Co., Ltd.&gt; (&lt;www.gmarket.co.kr&gt;),
with Reserved Font Name &lt;Gmarket Sans Font&gt;.

This Font Software is licensed under the SIL Open Font License, Version 1.1.



[DEFINITIONS]

&quot;Font Software&quot; refers to the set of files released by the Copyright Holder(s) under this license and clearly marked as such. This may include source files, build scripts and documentation.

&quot;Reserved Font Name&quot; refers to any names specified as such after the copyright statement(s).

&quot;Original Version&quot; refers to the collection of Font Software components as distributed by the Copyright Holder(s).

&quot;Modified Version&quot; refers to any derivative made by adding to, deleting, or substituting in part or in whole any of the components of the Original Version, by changing formats or by porting the Font Software to a new environment.‘

&quot;Author&quot; refers to any designer, engineer, programmer, technical writer or other person who contributed to the Font Software.

 

[PREAMBLE]

The goals of the Open Font License (OFL) are to stimulate worldwide development of collaborative font projects,

to support the font creation efforts of academic and linguistic communities, and to provide a free and open framework in which fonts may be shared and improved in partnership with others.

The OFL allows the licensed fonts to be used, studied, modified and redistributed freely as long as they are not sold

by themselves. The fonts, including any derivative works, can be bundled, embedded, redistributed and/or sold with any software provided that any reserved names are not used by derivative works.

The fonts and derivatives, however, cannot be released under any other type of license.

The requirement for fonts to remain under this license does not apply to any document created using the fonts or their derivatives.

 

[PERMISSION &amp; CONDITIONS]

Permission is hereby granted, free of charge, to any person obtaining a copy of the Font Software, to use, study, copy, merge, embed, modify, redistribute, and sell modified and unmodified copies of the Font Software, subject to the following conditions:


1) Neither the Font Software nor any of its individual components,in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled, redistributed and/or sold with any software, provided that each copy contains the above copyright notice and this license. These can be included either as stand-alone text files, human-readable headers or in the appropriate machine-readable metadata fields within text or binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font Name(s) unless explicit written

permission is granted by the corresponding Copyright Holder. This restriction only applies to the primary font name as presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font Software shall not be used to promote, endorse or advertise any Modified Version, except to acknowledge the contribution(s) of the Copyright Holder(s) and the Author(s) or with their explicit written permission.

5) The Font Software, modified or unmodified, in part or in whole, must be distributed entirely under this license, and must not be distributed any other license. The requirement for fonts to remain under this license does not apply to any document created using the Font Software.

6) Any images of the production such as printouts, advertisement materials, online videos using the Font Software, modified or unmodified, in part or in whole, may be utilized as means of promoting the Font Software in discretion of the Copyright Holder unless explicitly expressed the rejection of utilization to the Copyright Holder with specific terms.

 

[TERMINATION]

This license becomes null and void if any of the above conditions are not met.

[DISCLAIMER]

THE FONT SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM OTHER DEALINGS IN THE FONT SOFTWARE.

www.gmarket.co.kr/corp/gmarketsans

[요약]

가능: 상업적 목적의 사용 (사용범위: 인쇄물,광고물, 온라인, 영상 포함

수정 및 배포)

불가능: 서브라이선스, 단독판매, 상표권 이용

필수조건: 라이선스 포함, 수정 시 명칭 변경



-G마켓산스 폰트의 지적재산권은 ㈜이베이코리아에게 있습니다.

-G마켓산스 폰트는 개인 및 기업 사용자를 포함한 모든 사용자들에게 무료로 제공됩니다.

-수정은 가능하나, 수정 시 ‘G마켓산스 폰트’라는 명칭은 사용할 수 없습니다.

-G마켓산스 폰트를 유료로 판매하는 것은 금지되며, 본 저작권 안내 및 라이선스 전문을 포함하여 다른 소프트웨어와 번들하거나 재배포 또는 판매는 가능합니다.

-라이선스 전문을 포함하기 어려울 경우 G마켓산스 폰트의 출처 표기를 권장합니다.

(예시: 이 페이지는 이베이코리아에서 제공한 G마켓산스폰트가 적용되어 있습니다.)

-G마켓산스 폰트를 사용한 제작물(인쇄물, 광고물, 온라인, 영상 포함)은 ㈜이베이코리아의 프로모션을 위해 활용될 수 있습니다. 이를 원하지 않는 사용자는 언제든지 이베이코리아에 사용중단을 요청하실 수 있습니다.

-정확한 사용 조건은 아래 라이선스 전문을 참고하여 주십시오. 아래 라이선스 전문의 법적 효력은 영문에 한하고, 한글은 이용자의 이해를 돕기 위하여 제공되었습니다.

 

[라이선스]

Copyright © &lt; 2019.&gt;, &lt;eBay Korea Co., Ltd.&gt; (&lt;www.gmarket.co.kr&gt;),
with Reserved Font Name &lt;Gmarket Sans Font&gt;.

This Font Software is licensed under the SIL Open Font License, Version 1.1.

 

[정의]

‘폰트 소프트웨어’는 본 라이선스에 입거해 저작권자가 배포하고 명확하게 같은 표시가 된 파일들의 집합을 뜻하며, 여기에는 소스 파일, 빌드 스크립트와 문서가 이에 포함됩니다.

‘저작권이 있는 폰트명’은 저작권 정책에 따라서 지정된 이름을 말합니다.

‘원본’은 저작권자가 배포한 폰트 소프트웨어 구성요소를 의미합니다.

‘수정본’은 포맷의 변경이나 폰트 소프트웨어를 새로운 환경에 포팅시켜, 원본의 일부 혹은 전체에 추가, 삭제 대체해 만든 파생 저작물을 의미합니다.

‘저자’는 폰트 소프트웨어에 기여한 디자이너, 엔지니어, 프로그래머, 기술 전문가 등을 의미합니다.

 

[전문]

본 폰트 라이선스를 오픈 하는 것은(이하 OFL)는 전 세계 폰트 개발 프로젝트를 지원하고 학계와 언어 관련 학계의 폰트 개발을 위한 연구를 지지하기 위해서인 동시에, 폰트 제휴를 통해 폰트가 공유되고 개선될 수 있는 자유롭게 개방된 환경을 만들기 위해서 입니다.

OFL은 라이선스를 취득한 폰트가 그 자체로 판매되지 않는 한 자유롭게 사용, 연구, 수정, 재배포 하는 것을 허가합니다. 수정된 폰트를 포함한 폰트는 저작권 명이 사용되지 않는 한 기타 소프트웨어와 함께 묶이거나 삽입, 재배포 할 수 있습니다. 단 폰트와 수정된 폰트는 기타 다른 라이선스에 포함되어 배포될 수는 없습니다. 이 라이선스 하에 있기 위한 폰트에 대한 요구사항은 본 폰트나 수정본을 사용하여 제작된 어떠한 문서에도 적용되지 않습니다.

 

[허가 및 조건]

 본 폰트 소프트웨어를 사용하도록 허가 받은 개인/기업/단체 누구라도 다음 명시된 조건에 따라 폰트 소프트웨어의 수정 혹은 수정되지 않은 복사본을 무료로 사용, 연구, 복사, 통합, 삽입, 수정, 재배포할 수 있도록 허가합니다.

 

1) 원본이나 수정본의 폰트 소프트웨어 혹은 개별 구성요소인 폰트 자체가 판매되어서는 안됩니다.

2) 본 폰트 소프트웨어의 원본 혹은 수정본은 상기 저작권 안내와 본 라이선스에 대한 내용을 포함하는 경우에는 다른 소프트웨어와 함께 묶이거나 재배포 혹은 판매가 가능합니다. 이는 독립 텍스트 파일과 가독성이 있는 헤더 혹은 유저가 용이하게 열람 가능한 이상 텍스트파일 혹은 이진파일 내 기계가 읽을 수 있는 메타데이터 형태를 모두 의미 합니다.

3) 본 폰트 소프트웨어의 어떠한 수정본도 동일한 저작권자가 명시적 허가서를 부여하지 않는 한 저작권이 있는 폰트명을 사용해서는 안 됩니다. 본 제한 사항은 유저들에게 제공된 기존 폰트명을 뜻합니다.

4) 본 폰트 소프트웨어의 저작권자 혹은 저자의 이름은 그들의 명시적 서면 허가가 있거나 또는 그들의 공헌을 인정하기 위한 경우를 제외하고는 수정본에 대한 사용을 유도,추천 혹은 광고하기 위한 목적으로 사용할 수 없습니다.

5) 본 폰트 소프트웨어는 전체나 부분, 혹은 수정 여부에 상관없이 본 라이선스 하에 배포가 되어야 하며 기타 다른 라이선스 하에서는 배포를 할 수 없습니다. 폰트에 대한 요구조건은 이 라이선스 하에서만 유효하며 이 라이선스 하에 있기 위한 폰트에 대한 요구사항은 본 폰트 소프트웨어를 사용해 제작한 어떠한 문서에도 적용되지 않습니다.

6) 본 폰트 소프트웨어의 전체나 부분, 혹은 수정 여부에 상관없이 사용된 제작물, 예를 들어 인쇄물, 홍보물, 온라인 영상 등의 이미지는 본 폰트 소프트웨어의 홍보를 위한 수단으로 활용될 수 있으나, 활용에 대한 거부의사는 구체적인 조건과 함께 저작권자에게 표시하여야 합니다.

 

[계약의 종료]

본 라이선스는 상기 조건 중 일부라도 부합되지 않으면 무효가 될 수 있습니다.

 

[면책조항]

본 폰트 소프트웨어는 저작권, 특허권, 상표권 및 기타 권리의 비침해성과 특정 목적에의 적합성 포함한 명시적, 묵시적인 어떠한 종류의 보증 없이 “있는 그대로” 제공됩니다. 어떠한 경우에도 저작권자는 본 폰트 소프트웨어의 사용 또는 이의 사용불가, 그밖에 폰트 소프트웨어의 취급과 관련하여 발생하는 모든 계약, 불법행위 혹은 다른 일로 하여금 발생하는 일반적, 특수적, 간접적, 부차적 혹은 필연적 손해를 포함하는 소송, 손해, 혹은 기타 책임에 대한 의무를 가지지 않습니다.</pre><h3>Pretendard-OFL</h3><pre style="white-space:pre-wrap;font:11px/1.5 inherit;max-height:220px;overflow:auto">Copyright (c) 2021, Kil Hyung-jin (https://github.com/orioncactus/pretendard),
with Reserved Font Name &#x27;Pretendard&#x27;.

Copyright 2014-2021 Adobe (http://www.adobe.com/),
with Reserved Font Name &#x27;Source&#x27;.
Source is a trademark of Adobe in the United States and/or other countries.

Copyright (c) 2016 The Inter Project Authors (https://github.com/rsms/inter),
with Reserved Font Name &#x27;Inter&#x27;.

Copyright 2021 The M+ FONTS Project Authors (https://github.com/coz-m/MPLUS_FONTS),
with Reserved Font Name &#x27;M PLUS 1&#x27;.

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, and is also available with a FAQ at:
https://scripts.sil.org/OFL


-----------------------------------------------------------
SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007
-----------------------------------------------------------

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

The OFL allows the licensed fonts to be used, studied, modified and
redistributed freely as long as they are not sold by themselves. The
fonts, including any derivative works, can be bundled, embedded, 
redistributed and/or sold with any software provided that any reserved
names are not used by derivative works. The fonts and derivatives,
however, cannot be released under any other type of license. The
requirement for fonts to remain under this license does not apply
to any document created using the fonts or their derivatives.

DEFINITIONS
&quot;Font Software&quot; refers to the set of files released by the Copyright
Holder(s) under this license and clearly marked as such. This may
include source files, build scripts and documentation.

&quot;Reserved Font Name&quot; refers to any names specified as such after the
copyright statement(s).

&quot;Original Version&quot; refers to the collection of Font Software components as
distributed by the Copyright Holder(s).

&quot;Modified Version&quot; refers to any derivative made by adding to, deleting,
or substituting -- in part or in whole -- any of the components of the
Original Version, by changing formats or by porting the Font Software to a
new environment.

&quot;Author&quot; refers to any designer, engineer, programmer, technical
writer or other person who contributed to the Font Software.

PERMISSION &amp; CONDITIONS
Permission is hereby granted, free of charge, to any person obtaining
a copy of the Font Software, to use, study, copy, merge, embed, modify,
redistribute, and sell modified and unmodified copies of the Font
Software, subject to the following conditions:

1) Neither the Font Software nor any of its individual components,
in Original or Modified Versions, may be sold by itself.

2) Original or Modified Versions of the Font Software may be bundled,
redistributed and/or sold with any software, provided that each copy
contains the above copyright notice and this license. These can be
included either as stand-alone text files, human-readable headers or
in the appropriate machine-readable metadata fields within text or
binary files as long as those fields can be easily viewed by the user.

3) No Modified Version of the Font Software may use the Reserved Font
Name(s) unless explicit written permission is granted by the corresponding
Copyright Holder. This restriction only applies to the primary font name as
presented to the users.

4) The name(s) of the Copyright Holder(s) or the Author(s) of the Font
Software shall not be used to promote, endorse or advertise any
Modified Version, except to acknowledge the contribution(s) of the
Copyright Holder(s) and the Author(s) or with their explicit written
permission.

5) The Font Software, modified or unmodified, in part or in whole,
must be distributed entirely under this license, and must not be
distributed under any other license. The requirement for fonts to
remain under this license does not apply to any document created
using the Font Software.

TERMINATION
This license becomes null and void if any of the above conditions are
not met.

DISCLAIMER
THE FONT SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT
OF COPYRIGHT, PATENT, TRADEMARK, OR OTHER RIGHT. IN NO EVENT SHALL THE
COPYRIGHT HOLDER BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
INCLUDING ANY GENERAL, SPECIAL, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL
DAMAGES, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF THE USE OR INABILITY TO USE THE FONT SOFTWARE OR FROM
OTHER DEALINGS IN THE FONT SOFTWARE.
</pre></details>`}
 else if(modal==='jobBrief'&&state){content=jobBriefMarkup(keyPair());eyebrow='JOB BRIEFING'}
 else if(modal==='log'&&state){content=`<h2>📜 전투 기록</h2><div class="log-list">${(state.logs||[]).map(l=>`<p>${esc(l)}</p>`).join('')||'<p>기록이 없어.</p>'}</div>`;eyebrow='BATTLE LOG · 최근 20개'}
 else if(modal==='deck'&&state){const tally={};for(const id of state.deck)tally[id]=(tally[id]||0)+1;content=`<h2>🗂️ 내 덱 (${state.deck.length}장)</h2><p>${jobs[state.real].name} + ${jobs[state.fantasy].name} = ${pair().name}. 융합 카드 강화 ${state.sigUpgrade?'완료 ✦':'미적용'}.</p><div class="deck-list">${Object.entries(tally).map(([id,n])=>`<div class="deck-row"><span>${cards[id].icon} <b>${cards[id].name}</b>${upgraded(id)?' ✦':''} <small class="fam-${cards[id].family}">${toneName[cards[id].family]}</small></span><span class="pill">×${n}</span></div>`).join('')}</div>`}
 else if(modal==='relics'&&state){content=`<h2>💎 보유 유물 (${state.relics.length}/12)</h2><p>유물은 덱에 들어가지 않으며 이번 도전에만 적용돼.</p><div class="relic-grid">${state.relics.map(k=>relicTile(k,'disabled')).join('')||'<p>아직 유물이 없어. 정예 전투나 상점을 방문해봐.</p>'}</div>`}
 else if(modal==='card'){content=cardDetailMarkup();eyebrow='CARD DETAILS'}
 else if(modal==='status'){const t=TERMS[statusKey];eyebrow='EFFECT CODEX';content=t?`<h2>${t.icon} ${t.name}</h2><p class="rule-sentence">${t.desc}</p>${statusKey==='synergy'&&state?`<div class="inspect-outcome">${pair().name} 겸직: <b>${dualSummary()}</b><br/>이번 턴: 현실 ${state.usedReal?'✓':'○'} · 판타지 ${state.usedFantasy?'✓':'○'} · ${state.dualTurnUsed?'발동 완료':'대기'}</div>`:''}${statusKey==='fatigueGauge'&&state?`<div class="inspect-outcome">현재 피로도 <b>${state.workFatigue}/6</b> · ${fatigueNote(state.workFatigue)}</div>`:''}${statusKey==='intent'&&state?.phase==='battle'?intentDetailsMarkup():''}<p class="inspect-hint">아이콘을 누르면 언제든 설명을 다시 볼 수 있어.</p>`:''}
 else if(modal==='saveManager'){content=saveManagerMarkup();eyebrow='저장 관리'}
 else if(modal==='restoreSave'){content=restoreSaveMarkup();eyebrow='기록 복원 확인'}
 else if(modal==='releaseAbout'){content=releaseAboutMarkup();eyebrow='ALDOL'}
 else if(modal==='restartPrompt'){content=`<h2>⚠️ 현재 도전을 초기화할까?</h2><p>진행 중인 덱과 전투는 사라져. 누적 승리 기록과 튜토리얼 진행은 유지돼.</p><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn danger" data-act="restart">도전 포기</button><button class="btn calm" data-act="closeModal">계속 플레이</button></div>`}
 if(!content){modal='';return ''}
 return `<div class="modal-screen" data-act="outsideModal"><div class="modal" role="dialog" aria-modal="true" aria-label="게임 상세 및 확인"><div class="modal-top"><span class="eyebrow">${eyebrow}</span><button class="close-x" data-act="closeModal" aria-label="닫기">×</button></div>${content}${['card','transaction','jobBrief'].includes(modal)?'':'<div style="display:flex;justify-content:flex-end;margin-top:18px"><button class="btn small" data-act="closeModal">✕ 닫기</button></div>'}</div></div>`}
function render(){if(holdCombatRender)return;if(combatPlayback&&!paintingCombatFrame){paintCombatFrame();return}syncBattleViewport();validateSelection();selectionProjection=selectedCard?projectSelection(selectedCard.index):null;const app=document.querySelector('#app');app.classList.toggle('flow-app',!state||['map','reward','training'].includes(state.phase));if(state?.phase!=='reward')journeyReward=null;if(state?.phase!=='map')journeyRoute=null;let out='';if(!state)out=renderTitle();else if(state.phase==='battle')out=renderBattle();else if(state.phase==='training')out=renderTraining();else if(state.phase==='map')out=renderMap();else if(state.phase==='reward')out=renderReward();else if(state.phase==='relicReward')out=renderRelicReward();else if(state.phase==='shop')out=renderShop();else if(state.phase==='rest')out=renderRest();else if(state.phase==='event')out=renderEvent();else out=renderEnd();
 const oldEnergy=app.querySelector('.energy-meter'),energyBefore=oldEnergy?{value:Number(oldEnergy.dataset.energy),src:oldEnergy.querySelector('img')?.getAttribute('src')}:null;
 const handBefore=captureHand();const scrollLeft=app.querySelector('.hand')?.scrollLeft||0;const hadModal=!!app.querySelector('.modal');app.innerHTML=out+renderModal();bindJourneyDock();const handNow=app.querySelector('.hand');if(handNow)handNow.scrollLeft=scrollLeft;paintSelection(selectionProjection);animateHand(handBefore);animateEnergy(energyBefore);bindHandNavigation();
 if(state?.phase==='battle'&&state.tutorial&&!modal){const s=TUTORIAL[state.tutorial.step];if(s)app.querySelectorAll(s.focus).forEach(el=>el.classList.add('tut-focus'))}
 if(modal&&!hadModal)app.querySelector('.modal .close-x')?.focus({preventScroll:true});
 dealFrom=999;const ph=state?state.phase:'title';if(ph!==lastPhase){lastPhase=ph;window.scrollTo(0,0)}
 const peek=app.querySelector('.hand-peek');if(peek&&handNow&&handNow.scrollWidth<=handNow.clientWidth+2)peek.remove();
}
let lastPhase='';
// 전투 노드 진입 시: 튜토리얼이 없고 처음 쓰는 직업이면 직업 브리핑을 띄운다.
function maybeJobBrief(){if(state?.phase==='battle'&&!state.tutorial&&!meta.seenPairs.includes(keyPair())){seePair(keyPair());modal='jobBrief';render()}}
// Defer all commands to delegated, synchronous click handlers to keep card actions deterministic.
document.querySelector('#app').addEventListener('click',ev=>{
 const el=ev.target.closest('[data-act]');if(!el)return;
 const act=el.dataset.act;
 if(act==='skipCombat'){finishCombatPlayback();return}
 if(turnVisualBusy()){ev.preventDefault();return}
 if(!modal&&act==='handPage'){pageHand(Number(el.dataset.dir));return}
 if(ev.detail!==0&&performance.now()<suppressClickUntil){ev.preventDefault();return}
 if(handleReleaseAction(act))return;
 if(handleJourneyAction(act,el))return;
 if(!modal&&act==='toggleHand'){spreadHand=!spreadHand;render();if(selectedCard)revealHandCard(selectedCard.index);return}
 if(!modal&&act==='selectCard'){const i=Number(el.dataset.index),id=state?.hand[i];if(!id)return;selectedCard=selectedCard?.index===i?null:{index:i,id};render();revealHandCard(i);return}
 if(!modal&&act==='cancelSelection'){selectedCard=null;render();return}
 if(!modal&&act==='selectedDetails'){validateSelection();if(!selectedCard)return;inspected={...selectedCard,source:'hand'};modal='card';render();return}
 if(!modal&&act==='useSelected'){useSelected();return}
 if(act==='outsideModal'&&ev.target!==el)return;
 if(act==='closeModal'||act==='outsideModal'){restoreSerial++;restoreCandidate=null;modal='';inspected=null;pendingAction=null;render();return}
 if(act==='trainingInfo'&&trainingFor(state)){modal='trainingInfo';render();return}
 if(act==='status'){statusKey=el.dataset.key;modal='status';render();return}
 if(act==='battleMenu'||act==='mobileTutorial'){modal=act;render();return}
 if(act==='fullscreen'){toggleGameFullscreen();return}
 if(act==='readingMode'){readableBattle=!readableBattle;persistSavePacket(currentSavePacket());modal='';cleanGesture();render();return}
 if(act==='guide'||act==='deck'||act==='relics'||act==='restartPrompt'||act==='log'){modal=act;render();return}
 if(act==='inspectCard'||act==='inspectReward'){const i=Number(el.dataset.index),source=act==='inspectCard'?'hand':'reward',id=source==='hand'?state?.hand[i]:state?.rewardOptions[i];if(!id||!cards[id])return;inspected={id,index:i,source};modal='card';render();return}
 if(act==='confirmPlay'){const i=Number(el.dataset.index);if(modal!=='card'||inspected?.source!=='hand'||i!==inspected.index||state?.hand[i]!==inspected.id)return;modal='';inspected=null;selectedCard=null;render();playWithFx(i);return}
 if(act==='confirmReward'){const i=Number(el.dataset.index);if(modal!=='card'||inspected?.source!=='reward'||i!==inspected.index||state?.rewardOptions[i]!==inspected.id)return;modal='';inspected=null;pickReward(i);return}
 if(act==='confirmPending'){executeTransaction();return}
 if(act==='restart'){restart();return}
 if(act==='tutReplay'){meta.tutorialDone=false;saveMeta();modal='';if(state){state.tutorial={step:0};log('🎓 튜토리얼을 다시 시작해.'+(state.phase==='battle'?'':' 다음 전투에서 안내할게.'));save()}render();return}
 if(modal)return;
 if(act==='selectTraining'&&state?.phase==='training'&&trainingOptions().includes(el.dataset.id)){trainingChoice={run:state,id:el.dataset.id};render();return}
 if(act==='confirmTraining'&&trainingChoice?.run===state){chooseTraining(trainingChoice.id);return}
 if(act==='tutNext'){if(state?.tutorial){tutorialEvent('next');save();render()}return}
 if(act==='tutSkip'){if(state?.tutorial){finishTutorial(true);save();render();maybeJobBrief()}return}
 if(act==='overtime'){overtimeFx();return}
 if(act==='previewShopCard'){beginTransaction('shopCard',el.dataset.index);return}
 if(act==='previewShopRelic'){beginTransaction('shopRelic',el.dataset.index);return}
 if(act==='previewRewardRelic'){beginTransaction('rewardRelic',el.dataset.index);return}
 if(act==='previewRemove'){beginTransaction('remove',el.dataset.index);return}
 if(act==='undoRemove'){undoLastRemoval();return}
 if(act==='previewUpgrade'){beginTransaction('upgrade',el.dataset.id);return}
 if(act==='previewHeal'){beginTransaction('heal');return}
 if(act==='previewRecover'){beginTransaction('recover');return}
 if(act==='previewEvent'){beginTransaction('event',el.dataset.index);return}
 if(act==='targetEnemy'){if(selectedCard&&targetMode(selectedCard.id)==='enemy'){useSelected(Number(el.dataset.index));return}selectTarget(Number(el.dataset.index));return}
 if(act==='targetSelf'){if(selectedCard&&targetMode(selectedCard.id)==='self'){useSelected();return}state.message=selectedCard?'이 카드는 적에게 사용해.':'카드를 선택한 뒤 내 캐릭터를 누르면 사용할 수 있어.';render();return}
 if(act==='pickPair'){const k=el.dataset.pair;if(!pairs[k])return;[pickReal,pickFantasy]=k.split('-');render();document.querySelector('[data-act=pickPair][data-pair="'+k+'"]')?.focus({preventScroll:true});return}
 if(act==='chooseNode'){chooseNode(Number(el.dataset.index));maybeJobBrief();return}
 if(act==='pickRelic'){pickRelic(Number(el.dataset.index));return}
 if(act==='leaveNode'){if(state?.phase==='shop')nextStage();return}
 if(act==='start'){if(mobileDevice())requestGameFullscreen();newRun();return}
 if(act==='resume'){if(!state&&savedRun){if(mobileDevice())requestGameFullscreen();state=savedRun;savedRun=null;pickReal=state.real;pickFantasy=state.fantasy;ensureTarget();save();render();maybeJobBrief()}return}
 if(act==='importRun'){const imp=importCandidate();if(!imp)return;if(mobileDevice())requestGameFullscreen();state=imp.run;pickReal=state.real;pickFantasy=state.fantasy;if(state.phase==='battle')ensureTarget();log('💾 '+imp.label+' 기록을 복사해 가져왔어. 원본 저장은 그대로야.');save();render();return}
 if(act==='endTurn'){selectedCard=null;endWithFx();return}
 if(act==='reward'){pickReward(Number(el.dataset.index));return}
});

let dragState=null;
const appEl=document.querySelector('#app');
function hoverTarget(x,y,mode){return Array.from(document.querySelectorAll(mode==='self'?'.hero-unit':'.enemy-unit:not(.dead)')).find(el=>{const r=el.getBoundingClientRect();return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom})||null}
function clearTargetHover(){document.querySelectorAll('.enemy-unit,.hero-unit').forEach(el=>el.classList.remove('drag-hover'));}
function cleanGesture(){const d=dragState;dragState=null;d?.ghost?.remove();document.body.classList.remove('dragging-card');clearTargetHover();if(d?.el.hasPointerCapture?.(d.pointer))d.el.releasePointerCapture(d.pointer);return d;}
appEl.addEventListener('pointerdown',ev=>{
 const el=ev.target.closest('.redesign-battle .hand .card[data-index]');if(!el||ev.button!==0||modal||!state||state.phase!=='battle'||dragState||turnVisualBusy())return;
 const idx=Number(el.dataset.index),hand=el.closest('.hand');dragState={idx,id:state.hand[idx],sx:ev.clientX,sy:ev.clientY,mode:'pending',pointer:ev.pointerId,el,hand,scroll:hand.scrollLeft};el.setPointerCapture?.(ev.pointerId);
});
document.addEventListener('pointermove',ev=>{
 const d=dragState;if(!d||ev.pointerId!==d.pointer)return;
 const dx=ev.clientX-d.sx,dy=ev.clientY-d.sy;
 if(d.mode==='pending'){
  if(Math.hypot(dx,dy)<12)return;
  if(Math.abs(dx)>Math.abs(dy)*1.15)d.mode='scroll';
  else if(dy < -12&&-dy>Math.abs(dx)*1.15)d.mode='cast';
  else if(dy>12)d.mode='cancel';else return;
 }
 ev.preventDefault();
 if(d.mode==='scroll'){d.hand.scrollLeft=d.scroll-dx;updateHandNavigation();return}if(d.mode==='cancel')return;
 document.body.classList.add('dragging-card');
 const mode=targetMode(d.id),hit=hoverTarget(ev.clientX,ev.clientY,mode);clearTargetHover();
 const usable=d.id!=='fatigue'&&state.energy>=getCost(d.id);
 if(hit&&usable){hit.classList.add('drag-hover');const preview=hit.querySelector('.damage-preview');if(preview){const e=state.enemies[Number(hit.dataset.target)],n=estimateDamage(d.id,e);preview.textContent=n>0?'예상 −'+Math.max(0,n-(e.block||0))+' HP':'여기에 사용'}}
 if(!d.ghost){d.ghost=document.createElement('div');d.ghost.className='drag-ghost';document.body.appendChild(d.ghost)}
 d.ghost.textContent=(usable?(mode==='self'?'🛡 나에게 ':'⚔ 적에게 '):'사용 불가 · ')+cards[d.id].name;d.ghost.style.left=ev.clientX+'px';d.ghost.style.top=ev.clientY+'px';
},{passive:false});
document.addEventListener('pointerup',ev=>{
 if(!dragState||ev.pointerId!==dragState.pointer)return;const d=cleanGesture();if(d.mode==='pending')return;
 suppressClickUntil=performance.now()+450;ev.preventDefault();ev.stopPropagation();
 if(d.mode!=='cast')return;
 const mode=targetMode(d.id),hit=hoverTarget(ev.clientX,ev.clientY,mode);
 if(!modal&&state?.phase==='battle'&&state.hand[d.idx]===d.id&&hit&&d.id!=='fatigue'&&state.energy>=getCost(d.id)){selectedCard=null;playWithFx(d.idx,mode==='enemy'?Number(hit.dataset.target):undefined)}
 else if(state?.phase==='battle'){state.message=hit?'이 카드는 지금 사용할 수 없어.':'사용 취소 · 대상 위에 놓아줘.';render()}
},true);
document.addEventListener('pointercancel',()=>{if(dragState){suppressClickUntil=performance.now()+450;cleanGesture()}});
window.addEventListener('blur',()=>cleanGesture());
const flushRunOnExit=()=>{if(state&&RUN_PHASES.includes(state.phase))save()};
window.addEventListener('pagehide',flushRunOnExit);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')flushRunOnExit()});
document.addEventListener('keydown',ev=>{if(turnVisualBusy()&&ev.key==='Escape'){finishCombatPlayback();return}if(ev.key==='Escape'){if(dragState)cleanGesture();if(modal){restoreSerial++;restoreCandidate=null;modal='';inspected=null;pendingAction=null}else selectedCard=null;render()}});
render();
})();
