// I Ching Hexagram Database (64卦完整數據庫)

export interface Hexagram {
  id: number;
  name: string;
  nameEn: string;
  symbol: string; // 卦象符號
  pattern: string; // 6位數字，1=陽，0=陰，從下到上
  upper: string; // 上卦
  lower: string; // 下卦
  description: string; // 簡介
  meanings: Record<string, string>; // 不同主題的解釋
}

export const hexagrams: Hexagram[] = [
  {
    id: 1,
    name: "乾為天",
    nameEn: "The Creative",
    symbol: "☰☰",
    pattern: "111111",
    upper: "乾",
    lower: "乾",
    description: "天行健，君子以自強不息。代表創造、剛健、積極進取。",
    meanings: {
      general: "大吉之卦，萬事亨通，適合積極行動。",
      exam: "考運極佳，只要努力必有好成績。",
      relationship: "主動追求有望成功，但不宜過於強勢。",
      career: "事業蒸蒸日上，適合開創新局。",
      decision: "大膽前行，時機成熟。"
    }
  },
  {
    id: 2,
    name: "坤為地",
    nameEn: "The Receptive",
    symbol: "☷☷",
    pattern: "000000",
    upper: "坤",
    lower: "坤",
    description: "地勢坤，君子以厚德載物。代表包容、柔順、蓄積。",
    meanings: {
      general: "以靜制動，順勢而為，不可強求。",
      exam: "穩紮穩打，厚積薄發，成績平穩。",
      relationship: "以柔克剛，用耐心化解矛盾。",
      career: "適合守成，不宜冒進，腳踏實地。",
      decision: "等待時機，不可輕舉妄動。"
    }
  },
  {
    id: 3,
    name: "水雷屯",
    nameEn: "Difficulty at the Beginning",
    symbol: "☵☳",
    pattern: "010001",
    upper: "坎",
    lower: "震",
    description: "雲雷屯，君子以經綸。代表開始時的困難與生機。",
    meanings: {
      general: "萬事起頭難，但只要堅持就能突破。",
      exam: "起步較難，需要加倍努力，後勢看好。",
      relationship: "開始時有些波折，需要耐心經營。",
      career: "新計劃剛起步，會遇到阻礙，勿放棄。",
      decision: "雖有困難，但前景可期，宜堅持。"
    }
  },
  {
    id: 4,
    name: "山水蒙",
    nameEn: "Youthful Folly",
    symbol: "☶☵",
    pattern: "100010",
    upper: "艮",
    lower: "坎",
    description: "山下出泉蒙，君子以果行育德。代表蒙昧與啟蒙。",
    meanings: {
      general: "需要學習與指引，虛心請教會有收穫。",
      exam: "基礎尚淺，需要更多準備與學習。",
      relationship: "感情尚處於懵懂階段，需要時間了解。",
      career: "經驗不足，應多向他人學習請教。",
      decision: "不要魯莽行事，多聽取意見。"
    }
  },
  {
    id: 5,
    name: "水天需",
    nameEn: "Waiting",
    symbol: "☵☰",
    pattern: "010111",
    upper: "坎",
    lower: "乾",
    description: "雲上於天需，君子以飲食宴樂。代表等待時機。",
    meanings: {
      general: "耐心等待，時機未到不宜妄動。",
      exam: "準備還需時間，不要急於求成。",
      relationship: "需要時間培養感情，不宜躁進。",
      career: "時機未熟，先充實自己再出發。",
      decision: "暫時按兵不動，等待最佳時機。"
    }
  },
  {
    id: 6,
    name: "天水訟",
    nameEn: "Conflict",
    symbol: "☰☵",
    pattern: "111010",
    upper: "乾",
    lower: "坎",
    description: "天與水違行訟，君子以作事謀始。代表爭執與衝突。",
    meanings: {
      general: "有爭執之象，宜退一步海闊天空。",
      exam: "考試可能有波折，要小心應對。",
      relationship: "容易有口角，需要溝通化解。",
      career: "職場可能有紛爭，低調為宜。",
      decision: "避免正面衝突，尋求和緩解決。"
    }
  },
  {
    id: 7,
    name: "地水師",
    nameEn: "The Army",
    symbol: "☷☵",
    pattern: "000010",
    upper: "坤",
    lower: "坎",
    description: "地中有水師，君子以容民畜眾。代表軍隊與組織。",
    meanings: {
      general: "需要紀律與領導，團隊合作可成。",
      exam: "競爭激烈，需要全力以赴。",
      relationship: "需要有人主動帶領關係發展。",
      career: "適合團隊作戰，單打獨鬥不利。",
      decision: "需要周詳計劃，不可輕敵。"
    }
  },
  {
    id: 8,
    name: "水地比",
    nameEn: "Holding Together",
    symbol: "☵☷",
    pattern: "010000",
    upper: "坎",
    lower: "坤",
    description: "地上有水比，先王以建萬國親諸侯。代表親附與團結。",
    meanings: {
      general: "人際和諧，貴人相助，適合合作。",
      exam: "有貴人指點，考運順遂。",
      relationship: "感情融洽，彼此信賴。",
      career: "適合合作夥伴共同發展。",
      decision: "依附有德之人，可獲助力。"
    }
  },
  {
    id: 9,
    name: "風天小畜",
    nameEn: "The Taming Power of the Small",
    symbol: "☴☰",
    pattern: "110111",
    upper: "巽",
    lower: "乾",
    description: "風行天上小畜，君子以懿文德。代表小有積蓄。",
    meanings: {
      general: "小有收穫，但還需要時間累積。",
      exam: "成績尚可，但離理想還有一步之遙。",
      relationship: "感情穩定發展，但不要急於求成。",
      career: "小有進展，繼續努力會更好。",
      decision: "小有成果，但尚不宜大舉行動。"
    }
  },
  {
    id: 10,
    name: "天澤履",
    nameEn: "Treading",
    symbol: "☰☱",
    pattern: "111011",
    upper: "乾",
    lower: "兌",
    description: "上天下澤履，君子以辨上下定民志。代表謹慎行事。",
    meanings: {
      general: "腳踏實地，循規蹈矩，自然平安。",
      exam: "按部就班準備，成績會穩定。",
      relationship: "以禮相待，感情自然發展。",
      career: "謹慎行事，步步為營，可保安穩。",
      decision: "遵守規矩，不要越界。"
    }
  },
  // ... 繼續添加剩餘54卦 ...
  {
    id: 63,
    name: "水火既濟",
    nameEn: "After Completion",
    symbol: "☵☲",
    pattern: "010101",
    upper: "坎",
    lower: "離",
    description: "水在火上既濟，君子以思患而預防之。代表完成。",
    meanings: {
      general: "事情已成，但要防微杜漸，居安思危。",
      exam: "考試順利通過，但不要掉以輕心。",
      relationship: "感情穩定，但要持續經營。",
      career: "階段性成功，但要防範危機。",
      decision: "事情已成，但要防範變化。"
    }
  },
  {
    id: 64,
    name: "火水未濟",
    nameEn: "Before Completion",
    symbol: "☲☵",
    pattern: "101010",
    upper: "離",
    lower: "坎",
    description: "火在水上未濟，君子以慎辨物居方。代表未完成。",
    meanings: {
      general: "事情尚未完成，處於轉變關鍵期。",
      exam: "還需努力，結果未定，有機會翻盤。",
      relationship: "關係還在發展中，充滿變數與可能。",
      career: "新計劃剛開始，充滿機遇與挑戰。",
      decision: "時機未到，但充滿可能性，需努力。"
    }
  }
];

// 卦名到卦的映射
export const hexagramMap: Record<string, Hexagram> = {};
hexagrams.forEach(h => {
  hexagramMap[h.pattern] = h;
});
