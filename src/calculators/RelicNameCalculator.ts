// NameConverter.ts
export const convertToChineseName = (
  setName: string,
  position: string
): string => {
  const nameMappings: Record<string, string[]> = {
    PasserbyofWanderingCloud: [
      '过客的逢春木簪',
      '过客的游龙臂鞲',
      '过客的残绣风衣',
      '过客的冥途游履',
    ],
    MusketeerofWildWheat: [
      '快枪手的野穗毡帽',
      '快枪手的粗革手套',
      '快枪手的猎风披肩',
      '快枪手的铆钉马靴',
    ],
    KnightofPurityPalace: [
      '圣骑的宽恕盔面',
      '圣骑的沉默誓环',
      '圣骑的肃穆胸甲',
      '圣骑的秩序铁靴',
    ],
    HunterofGlacialForest: [
      '雪猎的荒神兜帽',
      '雪猎的巨蜥手套',
      '雪猎的冰龙披风',
      '雪猎的鹿皮软靴',
    ],
    ChampionofStreetwiseBoxing: [
      '拳王的冠军护头',
      '拳王的重炮拳套',
      '拳王的贴身护胸',
      '拳王的弧步战靴',
    ],
    GuardofWutheringSnow: [
      '铁卫的铸铁面盔',
      '铁卫的银鳞手甲',
      '铁卫的旧制军服',
      '铁卫的白银护胫',
    ],
    FiresmithofLavaForging: [
      '火匠的黑耀目镜',
      '火匠的御火戒指',
      '火匠的阻燃围裙',
      '火匠的合金义肢',
    ],
    GeniusofBrilliantStars: [
      '天才的超距遥感',
      '天才的频变捕手',
      '天才的元域深潜',
      '天才的引力漫步',
    ],
    BandofSizzlingThunder: [
      '乐队的偏光墨镜',
      '乐队的巡演手绳',
      '乐队的钉刺皮衣',
      '乐队的铆钉短靴',
    ],
    EagleofTwilightLine: [
      '翔鹰的长喙头盔',
      '翔鹰的鹰击指环',
      '翔鹰的翼装束带',
      '翔鹰的绒羽绑带',
    ],
    ThiefofShootingMeteor: [
      '怪盗的千人假面',
      '怪盗的绘纹手套',
      '怪盗的纤钢爪钩',
      '怪盗的流星快靴',
    ],
    WastelanderofBanditryDesert: [
      '废土客的呼吸面罩',
      '废土客的荒漠终端',
      '废土客的修士长袍',
      '废土客的动力腿甲',
    ],
    SpaceSealingStation: ['「黑塔」的空间站点', '「黑塔」的漫历轨迹'],
    FleetoftheAgeless: ['罗浮仙舟的天外楼船', '罗浮仙舟的建木枝蔓'],
    SprightlyVonwacq: ['翁瓦克的诞生之岛', '翁瓦克的环岛海岸'],
    PanCosmicCommercialEnterprise: ['公司的巨构总部', '公司的贸易航道'],
    BelobogoftheArchitects: ['贝洛伯格的存护堡垒', '贝洛伯格的铁卫防线'],
    TaliaKingdomofBanditry: ['塔利亚的钉壳小镇', '塔利亚的裸皮电线'],
    CelestialDifferentiator: ['螺丝星的机械烈阳', '螺丝星的环星孔带'],
    InertSalsotto: ['萨尔索图的移动城市', '萨尔索图的晨昏界线'],
    RutilantArena: ['泰科铵的镭射球场', '泰科铵的弧光赛道'],
    BrokenKeel: ['伊须磨洲的残船鲸落', '伊须磨洲的坼裂缆索'],
    LongevousDisciple: [
      '莳者的复明义眼',
      '莳者的机巧木手',
      '莳者的承露羽衣',
      '莳者的天人丝履',
    ],
    MessengerTraversingHackerspace: [
      '信使的全息目镜',
      '信使的百变义手',
      '信使的密信挎包',
      '信使的酷跑板鞋',
    ],
    WatchmakerMasterofDreamMachinations: [
      '钟表匠的极目透镜',
      '钟表匠的交运腕表',
      '钟表匠的空幻礼服',
      '钟表匠的隐梦革履',
    ],
    TheAshblazingGrandDuke: [
      '大公的冥焰冠冕',
      '大公的绒火指套',
      '大公的蒙恩长袍',
      '大公的绅雅礼靴',
    ],
    PioneerDiverofDeadWaters: [
      '先驱的绝热围壳',
      '先驱的虚极罗盘',
      '先驱的密合铅衣',
      '先驱的泊星桩锚',
    ],
    PenaconyLandoftheDreams: ['匹诺康尼的堂皇酒店', '匹诺康尼的逐梦轨道'],
    FirmamentFrontlineGlamoth: ['格拉默的铁骑兵团', '格拉默的寂静坟碑'],
    PrisonerinDeepConfinement: [
      '系囚的合啮拘笼',
      '系囚的铅石梏铐',
      '系囚的幽闭缚束',
      '系囚的绝足锁桎',
    ],

    // 其他set名与对应的中文名映射
  }

  // 根据setName获取对应的中文名数组
  const chineseNames = nameMappings[setName] || []

  // 根据position获取对应的中文名
  const chineseName = chineseNames[getPositionIndex(position)] || '未知中文名称'

  return chineseName
}

// 辅助函数，根据position获取对应的索引
const getPositionIndex = (position: string): number => {
  const positionMappings: Record<string, number> = {
    head: 0,
    hands: 1,
    body: 2,
    feet: 3,
    planarSphere: 0,
    linkRope: 1,
    // 添加更多position的映射关系
  }

  return positionMappings[position] || 0
}
