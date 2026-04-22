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
  // 生成原始卦的模式
  const originalPattern = yaoInputs
    .map(y => y.value.toString())
    .join('');
  
  // 查找本卦
  const originalHexagram = hexagramMap[originalPattern];
  if (!originalHexagram) {
    return null;
  }

  // 生成之卦（動爻翻轉）
  const changedPattern = yaoInputs
    .map(y => y.isMoving ? (y.value === 1 ? '0' : '1') : y.value.toString())
    .join('');
  
  // 查找之卦
  const changedHexagram = hexagramMap[changedPattern];
  if (!changedHexagram) {
    return null;
  }

  // 找出動爻位置
  const movingYao = yaoInputs
    .filter(y => y.isMoving)
    .map(y => y.position);

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
  if (q.includes('考') || q.includes('試') || q.includes('學') || q.includes('成績')) {
    return 'exam';
  }
  if (q.includes('感情') || q.includes('愛') || q.includes('戀') || q.includes('結婚') || q.includes('分手')) {
    return 'relationship';
  }
  if (q.includes('工作') || q.includes('事業') || q.includes('職') || q.includes('升遷') || q.includes('面試')) {
    return 'career';
  }
  if (q.includes('怎麼做') || q.includes('選擇') || q.includes('決定') || q.includes('該不該')) {
    return 'decision';
  }
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
 * 生成詳細結論
 */
export function generateConclusion(
  originalHexagram: Hexagram,
  changedHexagram: Hexagram,
  movingYao: number[],
  category: string,
  question: string
): string {
  const originalMeaning = getMeaning(originalHexagram, category);
  const changedMeaning = getMeaning(changedHexagram, category);
  
  // 根據動爻數量生成不同結論
  if (movingYao.length === 0) {
    return `這個結果給你的訊息是：\n\n${originalMeaning}\n\n目前局面穩定，沒有明顯變動。這表示當前狀態會持續一段時間，你可以按現有計劃行事。\n\n一句話總結：\n保持現狀，穩步前行。`;
  }
  
  if (movingYao.length === 1) {
    return `這個結果給你的訊息是：\n\n目前狀態：${originalMeaning}\n\n變化趨勢：${changedMeaning}\n\n有一個動爻，表示局面正在發生單一而明確的轉變。這個轉變是漸進的，你可以順應這個變化，調整自己的方向。\n\n一句話總結：\n順應變化，把握轉機。`;
  }
  
  if (movingYao.length === 2) {
    return `這個結果給你的訊息是：\n\n目前狀態：${originalMeaning}\n\n變化趨勢：${changedMeaning}\n\n有兩個動爻，代表局面其實正在改變。這不是「完全不要動」，也不是「立刻強攻」。轉變是雙方面的，需要同時處理兩個層面的問題。\n\n一句話總結：\n可以主動，但不宜急攻；先化解卡住的地方，再推進。`;
  }
  
  if (movingYao.length >= 3) {
    return `這個結果給你的訊息是：\n\n目前狀態：${originalMeaning}\n\n變化趨勢：${changedMeaning}\n\n有多個動爻，表示局面複雜，變動劇烈。這代表事情正在大幅轉變，舊的局面即將結束，新的局面正在形成。\n\n一句話總結：\n大變在即，順勢而為，把握新機。`;
  }
  
  return `${originalMeaning}\n\n變化趨勢：${changedMeaning}`;
}
