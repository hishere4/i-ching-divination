import { hexagramMap, Hexagram } from './hexagrams';

export interface YaoInput {
  position: number; // 1-6, 從下到上
  value: number;    // 1=陽, 0=陰
  isMoving: boolean;
}

export interface DivinationResult {
  question: string;
  originalYao: YaoInput[];
  originalHexagram: Hexagram;
  changedHexagram: Hexagram;
  movingYao: number[]; // 動爻位置
  category: string;
}

/**
 * 計算本卦和之卦
 */
export function calculateHexagram(yaoInputs: YaoInput[]): DivinationResult | null {
  const originalPattern = yaoInputs.map(y => y.value.toString()).join('');
  const originalHexagram = hexagramMap[originalPattern];
  if (!originalHexagram) return null;

  const changedPattern = yaoInputs.map(y => y.isMoving ? (y.value === 1 ? '0' : '1') : y.value.toString()).join('');
  const changedHexagram = hexagramMap[changedPattern];
  if (!changedHexagram) return null;

  const movingYao = yaoInputs.filter(y => y.isMoving).map(y => y.position);

  return {
    question: '',
    originalYao: yaoInputs,
    originalHexagram,
    changedHexagram,
    movingYao,
    category: 'general'
  };
}

/**
 * 根據問題自動判斷類別
 */
export function detectCategory(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('考') || q.includes('試') || q.includes('學') || q.includes('成績')) return 'exam';
  if (q.includes('感情') || q.includes('愛') || q.includes('戀') || q.includes('結婚') || q.includes('分手') || q.includes('見') || q.includes('對方')) return 'relationship';
  if (q.includes('工作') || q.includes('事業') || q.includes('職') || q.includes('升遷') || q.includes('面試')) return 'career';
  if (q.includes('怎麼做') || q.includes('選擇') || q.includes('決定') || q.includes('該不該')) return 'decision';
  return 'general';
}

/**
 * 獲取對應類別的解釋
 */
export function getMeaning(hexagram: Hexagram, category: string): string {
  return hexagram.meanings[category] || hexagram.meanings['general'];
}

/**
 * 生成爻辭解釋（簡化版）
 */
export function getYaoExplanation(position: number, isYang: boolean): string {
  const yaoTexts: Record<number, Record<string, string>> = {
    1: {
      'yang': '初九：潛龍勿用。時機未到，宜韜光養晦。',
      'yin': '初六：履霜堅冰至。防微杜漸，見微知著。'
    },
    2: {
      'yang': '九二：見龍在田，利見大人。才華漸顯，得遇貴人。',
      'yin': '六二：直方大，不習無不利。順其自然，無往不利。'
    },
    3: {
      'yang': '九三：君子終日乾乾，夕惕若。勤奮不懈，謹慎自持。',
      'yin': '六三：含章可貞，或從王事。內蘊才華，待時而發。'
    },
    4: {
      'yang': '九四：或躍在淵，無咎。進退有度，伺機而動。',
      'yin': '六四：括囊，無咎無譽。收斂鋒芒，明哲保身。'
    },
    5: {
      'yang': '九五：飛龍在天，利見大人。如日中天，大展宏圖。',
      'yin': '六五：黃裳元吉。謙和處下，大吉之象。'
    },
    6: {
      'yang': '上九：亢龍有悔。物極必反，盛極而衰。',
      'yin': '上六：龍戰于野，其血玄黃。陰陽交戰，兩敗俱傷。'
    }
  };
  
  const key = isYang ? 'yang' : 'yin';
  return yaoTexts[position]?.[key] || `${position}爻：動而化變，吉凶未定。`;
}

/**
 * 獲取爻位名稱
 */
function getYaoName(position: number): string {
  const names = ['初爻', '二爻', '三爻', '四爻', '五爻', '上爻'];
  return names[position - 1] || '';
}

/**
 * 獲取爻的顯示名稱
 */
function getYaoDisplayName(value: number, isMoving: boolean): string {
  if (isMoving) {
    return value === 1 ? '老陽' : '老陰';
  }
  return value === 1 ? '少陽' : '少陰';
}

/**
 * 生成人性化結論
 */
export function generateConclusion(
  originalHexagram: Hexagram,
  changedHexagram: Hexagram,
  movingYao: number[],
  category: string,
  question: string,
  originalYao: YaoInput[]
): string {
  
  // 構建爻位列表
  const yaoList = originalYao.map(y => {
    return `* ${getYaoName(y.position)}：${getYaoDisplayName(y.value, y.isMoving)}`;
  }).join('\n');

  const hasMoving = movingYao.length > 0;
  const movingCount = movingYao.length;
  
  // 根據動爻位置判斷變化階段
  let changePhase = '';
  if (movingCount === 0) {
    changePhase = '目前處於穩定狀態，沒有明顯變化跡象';
  } else if (movingYao.every(p => p <= 2)) {
    changePhase = '變化主要集中在初期階段，事情剛開始醞釀轉變';
  } else if (movingYao.every(p => p >= 5)) {
    changePhase = '變化集中在後期，事情即將有結果或轉折';
  } else if (movingYao.some(p => p >= 3 && p <= 4)) {
    changePhase = '變化在中段，表示事情正在核心層面發生轉變';
  } else {
    changePhase = '變化分布在不同階段，表示事情有多個層面同時在轉變';
  }

  // 根據類別生成具體建議
  let categoryAdvice = '';
  switch(category) {
    case 'relationship':
      categoryAdvice = generateRelationshipAdvice(originalHexagram, changedHexagram, movingYao);
      break;
    case 'exam':
      categoryAdvice = generateExamAdvice(originalHexagram, changedHexagram, movingYao);
      break;
    case 'career':
      categoryAdvice = generateCareerAdvice(originalHexagram, changedHexagram, movingYao);
      break;
    case 'decision':
      categoryAdvice = generateDecisionAdvice(originalHexagram, changedHexagram, movingYao);
      break;
    default:
      categoryAdvice = generateGeneralAdvice(originalHexagram, changedHexagram, movingYao);
  }

  return `先說清楚：

*卜卦未必能給出一個絕對肯定的答案，這個結果較適合解讀成「事情發展的趨勢與條件」，而不是「一定會如何」的保證。*

你這個卦是：

${yaoList}

由下而上看，**本卦${originalHexagram.name}** 可以理解為一種「${originalHexagram.description.replace('。', '')}」的狀態；
${hasMoving ? `而${movingYao.map(p => getYaoName(p)).join('、')}變，表示${changePhase}。` : '沒有動爻，表示目前處於相對穩定的狀態。'}

---

## 簡單解讀

這個卦比較像在說：

> *${getMeaning(originalHexagram, category)}*

${hasMoving ? `變化後的**之卦${changedHexagram.name}**，則暗示：\n\n> *${getMeaning(changedHexagram, category)}*` : ''}

---

## 具體建議

${categoryAdvice}

---

## 直接回答你

如果用一句人話總結：

> *${generateFinalSummary(originalHexagram, changedHexagram, movingYao, category, hasMoving)}*

另外也想提醒一句：

這類問題最終往往不是單靠卦象，而是很受 *現實情況、主動程度、時間安排、客觀條件* 影響。卦象提供的是一個「趨勢參考」，真正嘅結果，始終掌握在你自己手中。`;
}

/**
 * 生成感情建議
 */
function generateRelationshipAdvice(original: Hexagram, changed: Hexagram, movingYao: number[]): string {
  const count = movingYao.length;
  if (count === 0) {
    return `這個卦象顯示，你們的關係目前處於一個相對穩定的狀態。\n\n* 沒有明顯的變動跡象\n* 現狀會持續一段時間\n* 如果你想改變關係，需要主動創造條件\n\n建議：不要急於求變，先觀察對方的態度，再決定下一步。`;
  }
  if (count === 1) {
    return `有一個動爻，表示關係正在發生單一的轉變。\n\n* 這個轉變可能是你或對方的主動\n* 轉變是漸進的，不是突然的\n* 關鍵在於「順應」而非「強求」\n\n建議：留意對方近期的態度變化，可能有新的訊號出現。`;
  }
  if (count === 2) {
    return `有兩個動爻，這不是「完全沒機會」，也不是「立刻就會成」。\n\n* 關係中存在一些阻滯或顧慮\n* 但這些狀況「正在改變」\n* 關鍵不是「最後有沒有」，而是「中間卡住的東西能否被打開」\n\n建議：\n* 不是完全不要主動，也不是立刻強攻\n* 先處理阻礙，再用較成熟、自然的方式推進\n* 給彼此一些時間和空間`;
  }
  return `有多個動爻，表示關係正在經歷較大的轉變。\n\n* 舊的局面正在結束，新的局面即將形成\n* 變動較多，需要耐心等待塵埃落定\n* 不要急於做決定\n\n建議：順勢而為，讓關係自然發展，不要強求。`;
}

/**
 * 生成考試建議
 */
function generateExamAdvice(original: Hexagram, changed: Hexagram, movingYao: number[]): string {
  const count = movingYao.length;
  if (count === 0) {
    return `目前考運處於穩定狀態，成績會按你現有的努力程度呈現。\n\n* 沒有意外變動\n* 結果與你的準備程度成正比\n\n建議：保持現有的學習節奏，不要臨時改變策略。`;
  }
  if (count <= 2) {
    return `考試結果會有一些變數，但整體趨勢是好的。\n\n* 可能會遇到一些意想不到的題目或狀況\n* 但只要穩定發揮，結果不會太差\n\n建議：\n* 重點複習核心內容\n* 考試當天保持平常心\n* 不要被突發狀況影響情緒`;
  }
  return `考運變動較大，結果可能與預期有所不同。\n\n* 可能會有臨時變動或意外狀況\n* 但也可能有意想不到的收穫\n\n建議：\n* 做好多手準備\n* 不要只依賴單一策略\n* 保持靈活應對的心態`;
}

/**
 * 生成事業建議
 */
function generateCareerAdvice(original: Hexagram, changed: Hexagram, movingYao: number[]): string {
  const count = movingYao.length;
  if (count === 0) {
    return `事業目前處於平穩期，沒有大的變動。\n\n* 適合鞏固現有成果\n* 不宜冒進或跳槽\n\n建議：專注做好手頭工作，等待更好的時機。`;
  }
  if (count <= 2) {
    return `事業正在發生轉變，有新的機會出現。\n\n* 可能是升遷、轉崗或新項目\n* 轉變是漸進的，需要你主動把握\n\n建議：\n* 留意身邊的機會\n* 適時表現自己的能力\n* 不要錯過貴人提攜`;
  }
  return `事業面臨較大變動，可能是轉折點。\n\n* 舊的工作模式可能不再適用\n* 需要重新規劃職業方向\n\n建議：\n* 保持開放的心態\n* 考慮進修或轉型\n* 不要抗拒變化，順勢而為`;
}

/**
 * 生成決策建議
 */
function generateDecisionAdvice(original: Hexagram, changed: Hexagram, movingYao: number[]): string {
  const count = movingYao.length;
  if (count === 0) {
    return `目前局勢明朗，適合按計劃行事。\n\n* 沒有太大變數\n* 按現有方案執行即可\n\n建議：不要猶豫，果斷執行你的計劃。`;
  }
  if (count <= 2) {
    return `決策時機正在形成，但還需要一些時間。\n\n* 有一些因素正在變化\n* 不宜馬上做決定\n\n建議：\n* 先觀察形勢發展\n* 收集更多資訊\n* 等待最佳時機再行動`;
  }
  return `局勢複雜，決策需要格外謹慎。\n\n* 多個因素同時變化\n* 結果難以預料\n\n建議：\n* 不要急於做決定\n* 諮詢可信賴的人\n* 考慮多個備選方案`;
}

/**
 * 生成通用建議
 */
function generateGeneralAdvice(original: Hexagram, changed: Hexagram, movingYao: number[]): string {
  const count = movingYao.length;
  if (count === 0) {
    return `目前事情處於穩定狀態，沒有明顯變化。\n\n* 現狀會持續一段時間\n* 適合鞏固基礎，不要急於求變\n\n建議：按現有計劃穩步前行。`;
  }
  if (count <= 2) {
    return `事情正在發生轉變，有新的可能性出現。\n\n* 變化是漸進的，不是突然的\n* 需要你順應時勢，調整策略\n\n建議：\n* 保持靈活的心態\n* 留意新的機會\n* 適時調整計劃`;
  }
  return `事情正在經歷較大變動，舊的局面即將結束。\n\n* 變化較多，需要耐心等待\n* 新的局面正在形成\n\n建議：\n* 不要抗拒變化\n* 順勢而為\n* 把握新出現的機會`;
}

/**
 * 生成最終總結
 */
function generateFinalSummary(original: Hexagram, changed: Hexagram, movingYao: number[], category: string, hasMoving: boolean): string {
  const count = movingYao.length;
  
  if (!hasMoving) {
    return '目前局勢穩定，按現有計劃行事即可，不宜急於求變。';
  }
  
  if (count === 1) {
    switch(category) {
      case 'relationship': return '事情正在轉變，順應變化，把握即將出現的機會。';
      case 'exam': return '考運有變數，穩定發揮，結果會比預期好。';
      case 'career': return '事業有轉機，主動把握，不要錯過機會。';
      default: return '順應變化，把握轉機，結果會向好的方向發展。';
    }
  }
  
  if (count === 2) {
    switch(category) {
      case 'relationship': return '有機會，但不是馬上；先化解阻滯，再自然推進。';
      case 'exam': return '有機會達標，但要先處理好準備上的漏洞。';
      case 'career': return '有機會突破，但不宜急攻；先穩固基礎，再求發展。';
      default: return '可以主動，但不宜急攻；先化解卡住的地方，再推進。';
    }
  }
  
  // 3+ moving
  switch(category) {
    case 'relationship': return '變動較大，給彼此時間，順其自然發展。';
    case 'exam': return '結果難料，但變化中蘊含機會，保持靈活應對。';
    case 'career': return '大變在即，順勢而為，把握新出現的機會。';
    default: return '大變在即，順勢而為，把握新機。';
  }
}
