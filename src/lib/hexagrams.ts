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
  {
    id: 11,
    name: "地天泰",
    nameEn: "Peace",
    symbol: "☷☰",
    pattern: "000111",
    upper: "坤",
    lower: "乾",
    description: "天地交泰，君子以財成天地之道。代表安泰亨通。",
    meanings: {
      general: "天地交泰，萬事順遂，百事亨通。",
      exam: "考運極佳，順利通過。",
      relationship: "感情和諧，彼此扶持。",
      career: "事業順利，適合擴展。",
      decision: "時機極佳，大膽行動。"
    }
  },
  {
    id: 12,
    name: "天地否",
    nameEn: "Standstill",
    symbol: "☰☷",
    pattern: "111000",
    upper: "乾",
    lower: "坤",
    description: "天地不交否，君子以儉德辟難。代表閉塞不通。",
    meanings: {
      general: "時運不濟，宜保守謹慎，韜光養晦。",
      exam: "考試運勢不佳，需要加倍努力。",
      relationship: "感情遇到阻礙，需要耐心溝通。",
      career: "事業受阻，不宜冒進，宜守不宜攻。",
      decision: "暫時不宜行動，等待時機轉好。"
    }
  },
  {
    id: 13,
    name: "天火同人",
    nameEn: "Fellowship with Men",
    symbol: "☰☲",
    pattern: "111101",
    upper: "乾",
    lower: "離",
    description: "天與火同人，君子以類族辨物。代表志同道合。",
    meanings: {
      general: "人際和諧，志同道合，適合合作。",
      exam: "適合組織讀書會，共同進步。",
      relationship: "志趣相投，感情融洽。",
      career: "團隊合作順利，共同達成目標。",
      decision: "尋求志同道合者，一起行動。"
    }
  },
  {
    id: 14,
    name: "火天大有",
    nameEn: "Possession in Great Measure",
    symbol: "☲☰",
    pattern: "101111",
    upper: "離",
    lower: "乾",
    description: "火在天上大有，君子以遏惡揚善。代表大有收穫。",
    meanings: {
      general: "豐收之卦，萬事如意，但要知足常樂。",
      exam: "成績優異，收穫滿滿。",
      relationship: "感情美滿，但要珍惜。",
      career: "事業大有成就，但要防範驕傲。",
      decision: "時機大好，但不可貪心。"
    }
  },
  {
    id: 15,
    name: "地山謙",
    nameEn: "Modesty",
    symbol: "☷☶",
    pattern: "000100",
    upper: "坤",
    lower: "艮",
    description: "地中有山謙，君子以裒多益寡。代表謙虛受益。",
    meanings: {
      general: "謙虛受益，滿招損，謙受益，大吉。",
      exam: "保持謙虛，虛心學習，成績會更好。",
      relationship: "謙虛待人，感情會更融洽。",
      career: "謙虛處事，易得貴人相助。",
      decision: "放低姿態，會得到更多支持。"
    }
  },
  {
    id: 16,
    name: "雷地豫",
    nameEn: "Enthusiasm",
    symbol: "☳☷",
    pattern: "001000",
    upper: "震",
    lower: "坤",
    description: "雷出地奮豫，先王以作樂崇德。代表喜悅安樂。",
    meanings: {
      general: "喜氣洋洋，萬事順心，享受生活。",
      exam: "考試順利，心情愉快。",
      relationship: "感情甜蜜，充滿歡樂。",
      career: "事業順利，可以慶祝成果。",
      decision: "心情愉快，適合做決定。"
    }
  },
  {
    id: 17,
    name: "澤雷隨",
    nameEn: "Following",
    symbol: "☱☳",
    pattern: "011001",
    upper: "兌",
    lower: "震",
    description: "澤中有雷隨，君子以嚮晦入宴息。代表隨順時勢。",
    meanings: {
      general: "隨順時勢，見機而作，不宜固執。",
      exam: "順應考試趨勢，靈活應對。",
      relationship: "順其自然，不要強求。",
      career: "跟隨大勢，不要逆勢而行。",
      decision: "觀察形勢，順勢而為。"
    }
  },
  {
    id: 18,
    name: "山風蠱",
    nameEn: "Work on the Decayed",
    symbol: "☶☴",
    pattern: "100110",
    upper: "艮",
    lower: "巽",
    description: "山下有風蠱，君子以振民育德。代表腐敗與革新。",
    meanings: {
      general: "事物腐敗，需要革新，大刀闊斧改革。",
      exam: "學習方法需要改變，打破舊有模式。",
      relationship: "關係出現問題，需要正視並改善。",
      career: "事業需要改革，淘汰舊有做法。",
      decision: "需要改變現狀，不要因循守舊。"
    }
  },
  {
    id: 19,
    name: "地澤臨",
    nameEn: "Approach",
    symbol: "☷☱",
    pattern: "000011",
    upper: "坤",
    lower: "兌",
    description: "澤上有地臨，君子以教思無窮。代表親臨督導。",
    meanings: {
      general: "親臨現場，了解實情，才能做出正確決策。",
      exam: "親自努力，不要依賴他人。",
      relationship: "親近對方，了解真實想法。",
      career: "親臨指導，帶領團隊前進。",
      decision: "親自去了解，不要道聽途說。"
    }
  },
  {
    id: 20,
    name: "風地觀",
    nameEn: "Contemplation",
    symbol: "☴☷",
    pattern: "110000",
    upper: "巽",
    lower: "坤",
    description: "風行地上觀，先王以省方觀民設教。代表觀察學習。",
    meanings: {
      general: "觀察學習，了解情況後再行動。",
      exam: "觀察考試趨勢，學習他人經驗。",
      relationship: "觀察對方，了解真實性情。",
      career: "觀察市場，學習競爭對手。",
      decision: "多觀察，了解全貌後再做決定。"
    }
  },
  {
    id: 21,
    name: "火雷噬嗑",
    nameEn: "Biting Through",
    symbol: "☲☳",
    pattern: "101001",
    upper: "離",
    lower: "震",
    description: "雷電噬嗑，先王以明罰勅法。代表果斷執行。",
    meanings: {
      general: "果斷執行，排除障礙，才能成功。",
      exam: "果斷取捨，專注重點。",
      relationship: "果斷處理問題，不要拖延。",
      career: "果斷決策，排除干擾。",
      decision: "下定決心，果斷執行。"
    }
  },
  {
    id: 22,
    name: "山火賁",
    nameEn: "Grace",
    symbol: "☶☲",
    pattern: "100101",
    upper: "艮",
    lower: "離",
    description: "山下有火賁，君子以明庶政。代表裝飾美化。",
    meanings: {
      general: "適度裝飾，內外兼修，但不要過度。",
      exam: "注意表達方式，內容與形式並重。",
      relationship: "注重儀式感，但不要流於表面。",
      career: "提升形象，但實力才是根本。",
      decision: "注重外在條件，但不要忽略內涵。"
    }
  },
  {
    id: 23,
    name: "山地剝",
    nameEn: "Splitting Apart",
    symbol: "☶☷",
    pattern: "100000",
    upper: "艮",
    lower: "坤",
    description: "山附於地剝，上足以厚下安宅。代表剝落衰敗。",
    meanings: {
      general: "運勢下滑，宜保守，等待時機。",
      exam: "考運不佳，需要加倍努力。",
      relationship: "感情轉淡，需要經營。",
      career: "事業衰退，不宜冒進。",
      decision: "不宜行動，等待時機轉好。"
    }
  },
  {
    id: 24,
    name: "地雷復",
    nameEn: "Return",
    symbol: "☷☳",
    pattern: "000001",
    upper: "坤",
    lower: "震",
    description: "雷在地中復，先王以至日閉關。代表回復轉機。",
    meanings: {
      general: "運勢回升，否極泰來，充滿希望。",
      exam: "考運好轉，努力會有回報。",
      relationship: "感情回暖，重修舊好。",
      career: "事業回升，適合重新開始。",
      decision: "時機好轉，可以行動。"
    }
  },
  {
    id: 25,
    name: "天雷无妄",
    nameEn: "Innocence",
    symbol: "☰☳",
    pattern: "111001",
    upper: "乾",
    lower: "震",
    description: "天下雷行物與无妄，先王以茂對時育萬物。代表真誠無妄。",
    meanings: {
      general: "真誠待人，不要欺騙，自然吉祥。",
      exam: "誠實應考，不要作弊。",
      relationship: "真誠相待，不要虛偽。",
      career: "誠實經營，不要投機取巧。",
      decision: "以誠待人，自然獲得支持。"
    }
  },
  {
    id: 26,
    name: "山天大畜",
    nameEn: "The Taming Power of the Great",
    symbol: "☶☰",
    pattern: "100111",
    upper: "艮",
    lower: "乾",
    description: "天在山中大畜，君子以多識前言往行。代表蓄積大能。",
    meanings: {
      general: "蓄積力量，等待時機，厚積薄發。",
      exam: "蓄積知識，準備充分再應考。",
      relationship: "蓄積感情，等待最佳時機表白。",
      career: "蓄積實力，等待大展身手的機會。",
      decision: "蓄積能量，等待最佳時機。"
    }
  },
  {
    id: 27,
    name: "山雷頤",
    nameEn: "The Corners of the Mouth",
    symbol: "☶☳",
    pattern: "100001",
    upper: "艮",
    lower: "震",
    description: "山下有雷頤，君子以慎言語節飲食。代表養生自守。",
    meanings: {
      general: "注重養生，言語謹慎，節制飲食。",
      exam: "注意休息，不要過度疲勞。",
      relationship: "言語謹慎，不要傷害對方。",
      career: "注重健康，才能長久發展。",
      decision: "謹慎言語，不要輕易承諾。"
    }
  },
  {
    id: 28,
    name: "澤風大過",
    nameEn: "Preponderance of the Great",
    symbol: "☱☴",
    pattern: "011110",
    upper: "兌",
    lower: "巽",
    description: "澤滅木大過，君子以獨立不懼。代表過度極端。",
    meanings: {
      general: "事情過度，需要調整，否則會有危險。",
      exam: "準備過度或不足，需要調整節奏。",
      relationship: "感情過度，需要給彼此空間。",
      career: "事業過度擴張，需要調整步伐。",
      decision: "不要走極端，尋求平衡。"
    }
  },
  {
    id: 29,
    name: "坎為水",
    nameEn: "The Abysmal",
    symbol: "☵☵",
    pattern: "010010",
    upper: "坎",
    lower: "坎",
    description: "水洊至習坎，君子以常德行習教事。代表險陷重重。",
    meanings: {
      general: "險象環生，需要智慧與勇氣才能突破。",
      exam: "考試困難，需要加倍努力與智慧。",
      relationship: "感情多波折，需要堅持與智慧。",
      career: "事業多險阻，需要謹慎應對。",
      decision: "處境險峻，需要智慧化解。"
    }
  },
  {
    id: 30,
    name: "離為火",
    nameEn: "The Clinging",
    symbol: "☲☲",
    pattern: "101101",
    upper: "離",
    lower: "離",
    description: "明兩作離，大人以繼明照于四方。代表光明依附。",
    meanings: {
      general: "光明普照，但需要依附正道才能持久。",
      exam: "考運光明，但要依附正確方法。",
      relationship: "感情熱烈，但要依附真誠。",
      career: "事業光明，但要依附正道。",
      decision: "方向正確，但要堅持到底。"
    }
  },
  {
    id: 31,
    name: "澤山咸",
    nameEn: "Influence",
    symbol: "☱☶",
    pattern: "011100",
    upper: "兌",
    lower: "艮",
    description: "山上有澤咸，君子以虛受人。代表感應交流。",
    meanings: {
      general: "心靈感應，真誠交流，自然和諧。",
      exam: "與老師同學交流，會有收穫。",
      relationship: "心靈感應，感情自然發展。",
      career: "與同事感應交流，合作愉快。",
      decision: "用心感受，自然知道答案。"
    }
  },
  {
    id: 32,
    name: "雷風恆",
    nameEn: "Duration",
    symbol: "☳☴",
    pattern: "001110",
    upper: "震",
    lower: "巽",
    description: "雷風恆，君子以立不易方。代表恆久不變。",
    meanings: {
      general: "恆久不變，堅持到底，終會成功。",
      exam: "持之以恆，成績會穩定提升。",
      relationship: "恆久不變，感情會越來越深。",
      career: "堅持方向，事業會有成就是。",
      decision: "堅持到底，不要輕易改變。"
    }
  },
  {
    id: 33,
    name: "天山遯",
    nameEn: "Retreat",
    symbol: "☰☶",
    pattern: "111100",
    upper: "乾",
    lower: "艮",
    description: "天下有山遯，君子以遠小人。代表退避隱藏。",
    meanings: {
      general: "時機不利，宜退避三舍，保存實力。",
      exam: "考試運勢不佳，宜暫時退讓。",
      relationship: "感情遇阻，宜暫時退讓。",
      career: "事業遇阻，宜暫時退讓。",
      decision: "時機不利，宜暫時退讓。"
    }
  },
  {
    id: 34,
    name: "雷天大壯",
    nameEn: "The Power of the Great",
    symbol: "☳☰",
    pattern: "001111",
    upper: "震",
    lower: "乾",
    description: "雷在天上大壯，君子以非禮弗履。代表強盛有力。",
    meanings: {
      general: "力量強盛，但要遵守正道，不可蠻橫。",
      exam: "實力強盛，考試順利。",
      relationship: "感情強勢，但要尊重對方。",
      career: "事業強盛，但要遵守規則。",
      decision: "力量充足，可以行動，但要守禮。"
    }
  },
  {
    id: 35,
    name: "火地晉",
    nameEn: "Progress",
    symbol: "☲☷",
    pattern: "101000",
    upper: "離",
    lower: "坤",
    description: "明出地上晉，君子以自昭明德。代表晉升進步。",
    meanings: {
      general: "如日東升，前途光明，適合進取。",
      exam: "考試進步，成績提升。",
      relationship: "感情升溫，關係進步。",
      career: "事業晉升，前途光明。",
      decision: "前途光明，可以進取。"
    }
  },
  {
    id: 36,
    name: "地火明夷",
    nameEn: "Darkening of the Light",
    symbol: "☷☲",
    pattern: "000101",
    upper: "坤",
    lower: "離",
    description: "明入地中明夷，君子以蒞眾用晦而明。代表光明受損。",
    meanings: {
      general: "光明受損，處境艱難，需要韜光養晦。",
      exam: "考試遇阻，需要韜光養晦。",
      relationship: "感情受損，需要韜光養晦。",
      career: "事業受損，需要韜光養晦。",
      decision: "處境艱難，需要韜光養晦。"
    }
  },
  {
    id: 37,
    name: "風火家人",
    nameEn: "The Family",
    symbol: "☴☲",
    pattern: "110101",
    upper: "巽",
    lower: "離",
    description: "風自火出家人，君子以言有物而行有恆。代表家庭和睦。",
    meanings: {
      general: "家庭和睦，萬事興旺，注重家庭關係。",
      exam: "家庭支持，考試順利。",
      relationship: "家庭和睦，感情穩定。",
      career: "家庭支持，事業順利。",
      decision: "以家庭為重，家人支持你的決定。"
    }
  },
  {
    id: 38,
    name: "火澤睽",
    nameEn: "Opposition",
    symbol: "☲☱",
    pattern: "101011",
    upper: "離",
    lower: "兌",
    description: "上火下澤睽，君子以同而異。代表矛盾對立。",
    meanings: {
      general: "矛盾對立，需要溝通化解差異。",
      exam: "與老師同學意見不同，需要溝通。",
      relationship: "與對方有分歧，需要溝通。",
      career: "與同事有分歧，需要溝通。",
      decision: "意見不同，需要溝通達成共識。"
    }
  },
  {
    id: 39,
    name: "水山蹇",
    nameEn: "Obstruction",
    symbol: "☵☶",
    pattern: "010100",
    upper: "坎",
    lower: "艮",
    description: "山上有水蹇，君子以反身修德。代表艱難險阻。",
    meanings: {
      general: "艱難險阻，需要反省自身，修養德性。",
      exam: "考試困難，需要反省學習方法。",
      relationship: "感情遇阻，需要反省自身。",
      career: "事業遇阻，需要反省改進。",
      decision: "處境艱難，需要反省再決定。"
    }
  },
  {
    id: 40,
    name: "雷水解",
    nameEn: "Deliverance",
    symbol: "☳☵",
    pattern: "001010",
    upper: "震",
    lower: "坎",
    description: "雷雨作解，君子以赦過宥罪。代表解除困難。",
    meanings: {
      general: "困難解除，雨過天晴，重獲自由。",
      exam: "考試困難解除，成績好轉。",
      relationship: "感情困難解除，重修舊好。",
      career: "事業困難解除，重新出發。",
      decision: "困難已過，可以行動。"
    }
  },
  {
    id: 41,
    name: "山澤損",
    nameEn: "Decrease",
    symbol: "☶☱",
    pattern: "100011",
    upper: "艮",
    lower: "兌",
    description: "山下有澤損，君子以懲忿窒欲。代表減損節制。",
    meanings: {
      general: "需要減損，節制慾望，才能獲益。",
      exam: "減少娛樂，專注學習。",
      relationship: "減少要求，多為對方著想。",
      career: "減少開支，節約資源。",
      decision: "需要犧牲一些，才能獲得更多。"
    }
  },
  {
    id: 42,
    name: "風雷益",
    nameEn: "Increase",
    symbol: "☴☳",
    pattern: "110001",
    upper: "巽",
    lower: "震",
    description: "風雷益，君子以見善則遷。代表增益受益。",
    meanings: {
      general: "增益受益，積極進取，會有收穫。",
      exam: "學習有益，成績提升。",
      relationship: "感情增進，關係更好。",
      career: "事業增益，收入增加。",
      decision: "積極進取，會有收益。"
    }
  },
  {
    id: 43,
    name: "澤天夬",
    nameEn: "Break-through",
    symbol: "☱☰",
    pattern: "011111",
    upper: "兌",
    lower: "乾",
    description: "澤上於天夬，君子以施祿及下。代表果斷決策。",
    meanings: {
      general: "果斷決策，排除障礙，但要謹慎。",
      exam: "果斷取捨，專注重點。",
      relationship: "果斷處理問題，不要拖延。",
      career: "果斷決策，把握機會。",
      decision: "果斷行動，但要考慮後果。"
    }
  },
  {
    id: 44,
    name: "天風姤",
    nameEn: "Coming to Meet",
    symbol: "☰☴",
    pattern: "111110",
    upper: "乾",
    lower: "巽",
    description: "天下有風姤，后以施命誥四方。代表意外相遇。",
    meanings: {
      general: "意外相遇，機會來臨，但要謹慎應對。",
      exam: "意外收穫，但要謹慎應對。",
      relationship: "意外邂逅，但要謹慎發展。",
      career: "意外機會，但要謹慎把握。",
      decision: "意外轉機，但要謹慎決定。"
    }
  },
  {
    id: 45,
    name: "澤地萃",
    nameEn: "Gathering Together",
    symbol: "☱☷",
    pattern: "011000",
    upper: "兌",
    lower: "坤",
    description: "澤上於地萃，君子以除戎器戒不虞。代表聚合團結。",
    meanings: {
      general: "聚合團結，人際和諧，適合聚會。",
      exam: "團隊學習，共同進步。",
      relationship: "感情聚合，關係穩定。",
      career: "團隊合作，共同發展。",
      decision: "聚眾人之力，共同決策。"
    }
  },
  {
    id: 46,
    name: "地風升",
    nameEn: "Pushing Upward",
    symbol: "☷☴",
    pattern: "000110",
    upper: "坤",
    lower: "巽",
    description: "地中生木升，君子以順德積小以高大。代表上升進步。",
    meanings: {
      general: "上升進步，循序漸進，終會成功。",
      exam: "成績上升，循序漸進。",
      relationship: "感情升溫，循序漸進。",
      career: "事業上升，循序漸進。",
      decision: "循序漸進，終會成功。"
    }
  },
  {
    id: 47,
    name: "澤水困",
    nameEn: "Oppression",
    symbol: "☱☵",
    pattern: "011010",
    upper: "兌",
    lower: "坎",
    description: "澤無水困，君子以致命遂志。代表困難重重。",
    meanings: {
      general: "困難重重，需要堅持，終會突破。",
      exam: "考試困難，需要堅持。",
      relationship: "感情困難，需要堅持。",
      career: "事業困難，需要堅持。",
      decision: "處境困難，需要堅持。"
    }
  },
  {
    id: 48,
    name: "水風井",
    nameEn: "The Well",
    symbol: "☵☴",
    pattern: "010110",
    upper: "坎",
    lower: "巽",
    description: "木上有水井，君子以勞民勸相。代表井養不息。",
    meanings: {
      general: "井養不息，持之以恆，終會有成。",
      exam: "持之以恆，終會有成。",
      relationship: "持之以恆，終會有成。",
      career: "持之以恆，終會有成。",
      decision: "持之以恆，終會有成。"
    }
  },
  {
    id: 49,
    name: "澤火革",
    nameEn: "Revolution",
    symbol: "☱☲",
    pattern: "011101",
    upper: "兌",
    lower: "離",
    description: "澤中有火革，君子以治曆明時。代表變革革新。",
    meanings: {
      general: "變革革新，打破舊有，開創新局。",
      exam: "改變學習方法，會有突破。",
      relationship: "改變相處模式，會有新意。",
      career: "變革創新，開創新局。",
      decision: "需要變革，打破舊有模式。"
    }
  },
  {
    id: 50,
    name: "火風鼎",
    nameEn: "The Cauldron",
    symbol: "☲☴",
    pattern: "101110",
    upper: "離",
    lower: "巽",
    description: "木上有火鼎，君子以正位凝命。代表鼎新革故。",
    meanings: {
      general: "鼎新革故，建立新秩序，大吉。",
      exam: "建立新學習方法，成績提升。",
      relationship: "建立新相處模式，感情升溫。",
      career: "建立新事業基礎，前途光明。",
      decision: "創新變革，建立新秩序。"
    }
  },
  {
    id: 51,
    name: "震為雷",
    nameEn: "The Arousing",
    symbol: "☳☳",
    pattern: "001001",
    upper: "震",
    lower: "震",
    description: "洊雷震，君子以恐懼修省。代表震動驚醒。",
    meanings: {
      general: "震動驚醒，需要反省，修養德性。",
      exam: "考試震驚，需要反省改進。",
      relationship: "感情震動，需要反省。",
      career: "事業震動，需要反省改進。",
      decision: "受到震動，需要重新考慮。"
    }
  },
  {
    id: 52,
    name: "艮為山",
    nameEn: "Keeping Still",
    symbol: "☶☶",
    pattern: "100100",
    upper: "艮",
    lower: "艮",
    description: "兼山艮，君子以思不出其位。代表靜止不動。",
    meanings: {
      general: "靜止不動，思考清楚再行動。",
      exam: "靜心學習，不要浮躁。",
      relationship: "靜觀其變，不要急躁。",
      career: "靜止觀望，等待時機。",
      decision: "靜止思考，不要急於行動。"
    }
  },
  {
    id: 53,
    name: "風山漸",
    nameEn: "Development",
    symbol: "☴☶",
    pattern: "110100",
    upper: "巽",
    lower: "艮",
    description: "山上有木漸，君子以居賢德善俗。代表循序漸進。",
    meanings: {
      general: "循序漸進，穩步前進，終會成功。",
      exam: "循序漸進，成績穩定提升。",
      relationship: "循序漸進，感情穩定發展。",
      career: "循序漸進，事業穩定發展。",
      decision: "循序漸進，不要急躁。"
    }
  },
  {
    id: 54,
    name: "雷澤歸妹",
    nameEn: "The Marrying Maiden",
    symbol: "☳☱",
    pattern: "001011",
    upper: "震",
    lower: "兌",
    description: "澤上有雷歸妹，君子以永終知敝。代表婚姻嫁娶。",
    meanings: {
      general: "婚姻嫁娶，感情發展，但要謹慎。",
      exam: "考試結果尚可，但要繼續努力。",
      relationship: "感情發展，但要謹慎選擇。",
      career: "事業發展，但要謹慎決策。",
      decision: "感情相關決定，要謹慎考慮。"
    }
  },
  {
    id: 55,
    name: "雷火豐",
    nameEn: "Abundance",
    symbol: "☳☲",
    pattern: "001101",
    upper: "震",
    lower: "離",
    description: "雷電皆至豐，君子以折獄致刑。代表豐盛富足。",
    meanings: {
      general: "豐盛富足，萬事亨通，但要防範驕傲。",
      exam: "考試豐收，成績優異。",
      relationship: "感情豐盛，美滿幸福。",
      career: "事業豐盛，收入豐厚。",
      decision: "時機大好，可以大膽行動。"
    }
  },
  {
    id: 56,
    name: "火山旅",
    nameEn: "The Wanderer",
    symbol: "☲☶",
    pattern: "101100",
    upper: "離",
    lower: "艮",
    description: "山上有火旅，君子以明慎用刑而不留獄。代表旅行漂泊。",
    meanings: {
      general: "旅行漂泊，奔波勞碌，但要保持正道。",
      exam: "考試奔波，需要努力。",
      relationship: "感情漂泊，需要穩定。",
      career: "事業奔波，需要堅持。",
      decision: "漂泊不定，需要謹慎決定。"
    }
  },
  {
    id: 57,
    name: "巽為風",
    nameEn: "The Gentle",
    symbol: "☴☴",
    pattern: "110110",
    upper: "巽",
    lower: "巽",
    description: "隨風巽，君子以申命行事。代表順從滲透。",
    meanings: {
      general: "順從滲透，以柔克剛，無往不利。",
      exam: "順應考試趨勢，靈活應對。",
      relationship: "順從對方，感情和諧。",
      career: "順應上司，事業順利。",
      decision: "順勢而為，不要逆勢。"
    }
  },
  {
    id: 58,
    name: "兌為澤",
    nameEn: "The Joyous",
    symbol: "☱☱",
    pattern: "011011",
    upper: "兌",
    lower: "兌",
    description: "麗澤兌，君子以朋友講習。代表喜悅和樂。",
    meanings: {
      general: "喜悅和樂，人際和諧，適合社交。",
      exam: "心情愉快，考試順利。",
      relationship: "感情喜悅，和樂融融。",
      career: "事業順利，人際和諧。",
      decision: "心情愉快，適合做決定。"
    }
  },
  {
    id: 59,
    name: "風水渙",
    nameEn: "Dispersion",
    symbol: "☴☵",
    pattern: "110010",
    upper: "巽",
    lower: "坎",
    description: "風行水上渙，先王以享于帝立廟。代表渙散離散。",
    meanings: {
      general: "渙散離散，需要凝聚，重新團結。",
      exam: "學習渙散，需要集中精力。",
      relationship: "感情渙散，需要溝通。",
      career: "團隊渙散，需要凝聚。",
      decision: "人心渙散，需要凝聚共識。"
    }
  },
  {
    id: 60,
    name: "水澤節",
    nameEn: "Limitation",
    symbol: "☵☱",
    pattern: "010011",
    upper: "坎",
    lower: "兌",
    description: "澤上有水節，君子以制數度議德行。代表節制有度。",
    meanings: {
      general: "節制有度，不可過度，適可而止。",
      exam: "節制娛樂，專注學習。",
      relationship: "節制慾望，珍惜感情。",
      career: "節制開支，穩健發展。",
      decision: "節制欲望，適可而止。"
    }
  },
  {
    id: 61,
    name: "風澤中孚",
    nameEn: "Inner Truth",
    symbol: "☴☱",
    pattern: "110011",
    upper: "巽",
    lower: "兌",
    description: "澤上有風中孚，君子以議獄緩死。代表誠信有感。",
    meanings: {
      general: "誠信有感，真心待人，自然吉祥。",
      exam: "誠實應考，不要作弊。",
      relationship: "誠信相待，感情真摯。",
      career: "誠信經營，贏得信任。",
      decision: "以誠信為本，自然獲得支持。"
    }
  },
  {
    id: 62,
    name: "雷山小過",
    nameEn: "Preponderance of the Small",
    symbol: "☳☶",
    pattern: "001100",
    upper: "震",
    lower: "艮",
    description: "山上有雷小過，君子以行過乎恭喪過乎哀。代表小過越度。",
    meanings: {
      general: "小過越度，需要謹慎，不要大意。",
      exam: "考試小有波折，需要謹慎。",
      relationship: "感情小有波折，需要謹慎。",
      career: "事業小有波折，需要謹慎。",
      decision: "小有風險，需要謹慎決定。"
    }
  },
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
