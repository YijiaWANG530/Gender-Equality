const probA = document.getElementById('probA');
const probB = document.getElementById('probB');
const stages = document.getElementById('stages');
const salary = document.getElementById('salary');
const growth = document.getElementById('growth');

const probAValue = document.getElementById('probAValue');
const probBValue = document.getElementById('probBValue');
const stagesValue = document.getElementById('stagesValue');
const salaryValue = document.getElementById('salaryValue');
const growthValue = document.getElementById('growthValue');

const groupAResult = document.getElementById('groupAResult');
const groupBResult = document.getElementById('groupBResult');
const ratioResult = document.getElementById('ratioResult');
const ratioSentence = document.getElementById('ratioSentence');

const salaryTable = document.getElementById('salaryTable');
const salarySummaryResult = document.getElementById('salarySummaryResult');
const salarySummarySentence = document.getElementById('salarySummarySentence');
const dynamicResultSentence = document.getElementById('dynamicResultSentence');
const promotionTrendChartCanvas = document.getElementById('promotionTrendChart');
const probAMinus = document.getElementById('probAMinus');
const probAPlus = document.getElementById('probAPlus');

const probBMinus = document.getElementById('probBMinus');
const probBPlus = document.getElementById('probBPlus');

const stagesMinus = document.getElementById('stagesMinus');
const stagesPlus = document.getElementById('stagesPlus');

const comparisonResults = document.getElementById('comparisonResults');
const originalBFinalResult = document.getElementById('originalBFinalResult');
const adjustedBFinalResult = document.getElementById('adjustedBFinalResult');
const comparisonRatioSentence = document.getElementById('comparisonRatioSentence');

const chartError = document.getElementById('chartError');

const resCheck = document.getElementById('resCheck');
const kmkm = document.getElementById('kmkm');
const comparisonNote = document.getElementById('comparisonNote');
let km = 0;
let comparisonInitialized = false;

resCheck.addEventListener('change', () => {
  const comparisonStageControl = document.getElementById('comparisonStageControl');
  if (resCheck.checked) {
    comparisonStageControl.style.display = 'block';
    comparisonNote.style.display = 'block';
    if (!comparisonInitialized) {
      const k = Number(stages.value);
      km = Math.floor(k / 2);
      kmkm.value = km;
      kmkm.max = k;
      comparisonInitialized = true;
    }
  } else {
    comparisonStageControl.style.display = 'none';

    comparisonNote.style.display = 'none';
  }
  calculatePromotion();
});

function calculateAdjustedB(pA, pB, k, m, startingPopulation) {
  if (k <= m) {
    return startingPopulation * Math.pow(pB, k);
  }

  return startingPopulation * Math.pow(pB, m) * Math.pow(pA, k - m);
}

let promotionTrendChart;
let currentLanguage = 'en';

const translations = {
  en: {
    eyebrow: 'INTERACTIVE MODEL',
    title: 'The Compounding Gap',
    subtitle: 'How small differences in opportunity can create larger inequalities over time.',
    intro:
      'This interactive model explores how repeated differences in promotion opportunity can affect representation and salary growth across a career.',
    researchEyebrow: 'RESEARCH BASIS',
    researchTitle: 'Why model a small repeated gap?',
    researchParagraphOne:
      "Research on gender inequality at work suggests that disadvantages can accumulate across multiple stages of an employee's career, including evaluation, promotion, and compensation (Son Hing et al., 2023).",
    researchParagraphTwo:
      'Studies have also documented gender differences in promotion outcomes in particular workplace samples. However, the size of these differences varies across occupations, organizations, and populations (Blau & DeVaro, 2007; Xu, 2024).',
    assumptionTitle: 'About the numbers in this model',
    assumptionText:
      'The default 50% and 45% promotion probabilities are illustrative, not estimates of the true promotion rates of men and women. They are chosen to demonstrate how a small repeated difference can compound across several stages. All parameters can be adjusted.',
    promotionTitle: 'Promotion Pipeline',
    promotionDescription:
      'Adjust the promotion probabilities and see how the expected number of people in each group changes across multiple career stages.',
    modelFormulaTitle: 'Mathematical model',
    modelRationaleTitle: 'Why this model?',
    promotionModelRationale:
      "Let <span class='math-inline'>X<sub>k</sub></span> represent the number of people who reach stage <span class='math-inline'>k</span>. The model uses the expected headcount <span class='math-inline'>N<sub>k</sub> = E[X<sub>k</sub>]</span>. If each person has the same promotion probability <span class='math-inline'>p</span> at every stage, then <span class='math-inline'>N<sub>k+1</sub> = pN<sub>k</sub></span>. Starting from 1,000 people, repeating this transition gives <span class='math-inline'>N<sub>k</sub> = 1000p<sup>k</sup></span>. These values are expected outcomes under the model, not exact predictions of how many people will be promoted in a real organization.",
    ratioModelRationale:
      "Both groups follow the same expected-value promotion structure: <span class='math-inline'>N<sub>A,k</sub> = N<sub>0</sub>p<sub>A</sub><sup>k</sup></span> and <span class='math-inline'>N<sub>B,k</sub> = N<sub>0</sub>p<sub>B</sub><sup>k</sup></span>. Dividing the Group B expected population by the Group A expected population cancels the common starting value <span class='math-inline'>N<sub>0</sub></span>, leaving <span class='math-inline'>R<sub>k</sub> = (p<sub>B</sub>/p<sub>A</sub>)<sup>k</sup></span>. The ratio therefore isolates the cumulative effect of the difference in promotion probabilities.",
    salaryModelRationale:
      "The model assumes that each promotion increases salary by the same proportional rate <span class='math-inline'>g</span>. Each promotion therefore multiplies the previous salary by <span class='math-inline'>(1 + g)</span>, giving <span class='math-inline'>S<sub>j+1</sub> = (1 + g)S<sub>j</sub></span>. After <span class='math-inline'>j</span> promotions, repeated multiplication gives <span class='math-inline'>S<sub>j</sub> = S<sub>0</sub>(1 + g)<sup>j</sup></span>. This is a proportional-growth model rather than a curve fitted to salary data.",
    groupAProbability: 'Group A promotion probability',
    groupBProbability: 'Group B promotion probability',
    stages: 'Number of promotion stages',
    groupA: 'Group A',
    groupB: 'Group B',
    peopleRemaining: 'Expected headcount reaching this stage',
    symbolsTitle: 'Symbols',
    howToReadTitle: 'How to read this',
    symbolN0: 'Starting population',
    symbolP: 'Promotion probability at each stage',
    symbolK: 'Number of promotion stages',
    symbolNk: 'Expected headcount reaching stage k',
    promotionReadingNote:
      'Both groups start from the same population. The model focuses on how repeated differences in promotion probability change the expected relative size of the two groups over time.',
    trendChartTitle: 'How the gap develops across stages',
    trendChartDescription:
      'Change the promotion probabilities above and compare how the two groups change across repeated stages. The relative gap may widen even when the absolute difference in expected headcount does not.',
    ratioTitle: 'Representation Ratio',
    ratioDescription:
      'Repeated differences in promotion probability can produce a larger relative gap between the two groups across stages.',
    finalRatio: 'Final representation ratio',
    symbolNA: 'Expected Group A population after k stages',
    symbolNB: 'Expected Group B population after k stages',
    symbolPAB: 'Promotion probabilities for the two groups',
    symbolRk: 'Expected Group B population relative to Group A after k stages',
    ratioReadingNote:
      "If <span class='math-inline'>R<sub>k</sub> = 0.59</span>, this means that Group B's expected headcount is 59% of Group A's expected headcount. It is calculated as Group B divided by Group A, not as Group B's share of the combined total.",
    ratioSentence: (ratio) =>
      `For every 100 people expected to remain in Group A, approximately ${ratio} are expected to remain in Group B.`,
    salaryTitle: 'Salary Growth',
    salaryDescription:
      'This section uses illustrative currency values to show how access to higher career levels can correspond to higher salary levels in the model.',
    symbolS0: 'Starting salary',
    symbolG: 'Salary growth per promotion',
    symbolJ: 'Number of promotions',
    symbolSj: 'Salary after j promotions',
    salaryReadingNote:
      'The currency values in this section are illustrative model values rather than annual or cumulative income. The model does not assume unequal pay for the same role. It shows how differences in access to promotion can affect access to higher salary levels.',
    salarySummaryTitle: 'Final salary after selected promotions',
    salarySummarySentence: (start, finalSalary, stages) =>
      `Starting from $${start}, salary grows to $${finalSalary} after ${stages} promotions.`,
    startingSalary: 'Starting salary',
    salaryIncrease: 'Salary increase per promotion',
    modelAssumptionsEyebrow: 'MODEL ASSUMPTIONS',
    modelAssumptionsTitle: 'What does this simplified model assume?',
    modelAssumptionOne:
      'Both groups begin with the same normalized starting population of 1,000 people. This value is used for illustration and does not represent the size of a real organization.',
    modelAssumptionTwo:
      'Each group is assigned a constant promotion probability across all stages. The default probabilities are illustrative values rather than estimates from a specific organization or population. In real workplaces, promotion rates may vary across job levels and career stages.',
    modelAssumptionThree:
      'Population values represent expected outcomes under the model rather than predictions of the exact number of people promoted in a real workforce.',
    modelAssumptionFour:
      'In the salary model, each transition to the next career stage is treated as one promotion, and every promotion is assumed to produce the same proportional salary increase. The model illustrates access to higher salary levels rather than unequal pay for the same role.',
    modelAssumptionFive:
      'The model does not include competition for a fixed number of promotion positions, new entrants, or repeated attempts to gain promotion.',
    modelAssumptionSix:
      'Not advancing to the next stage in this model does not mean that a person is fired or leaves the organization. It only means that they do not move to the next modeled career stage.',
    whyTitle: 'Why This Matters',
    whyParagraphOne:
      'Gender inequality does not always emerge from one dramatic act of discrimination. Small differences in access to opportunities can accumulate across multiple stages of a career (Son Hing et al., 2023).',
    whyParagraphTwo:
      'This idea is sometimes described as cumulative disadvantage: repeated small differences can eventually produce substantial differences in representation and income (Son Hing et al., 2023).',
    actionOneTitle: 'Transparent criteria',
    actionOneText: 'Make promotion standards clear and consistent.',
    actionTwoTitle: 'Monitor opportunities',
    actionTwoText: 'Examine whether access to career opportunities is distributed fairly.',
    actionThreeTitle: 'Act early',
    actionThreeText: 'Address small differences before they compound over time.',
    referencesEyebrow: 'REFERENCES',
    referencesTitle: 'Research behind the model',
    referencesIntro:
      'The model is illustrative, but its structure is motivated by research on cumulative disadvantage, promotion inequality, and career progression.',
    disclaimer:
      'This is a simplified hypothetical model designed to demonstrate cumulative effects. It does not represent data from any specific company or population.',
    stage: 'Stage',
    salaryAtStage: 'Salary',
    promotionStage: 'Promotion Stage',
    expectedHeadcount: 'Expected Headcount',
    errorText: 'Failed to load',
    headcount: ' Headcount',
    tableTip:
      'The salary is the same at the same level, but the expected number of people who can reach that level may differ. Each row represents the same group of people at different stages, so the numbers should not be added together.',
    projectTip:
      'The project uses a simplified model to show the cumulative impact of differences in promotion opportunities. It is intended to help explain the mechanism, rather than predict outcomes in real companies or directly prove discrimination.',
    changedB: 'Adjusted Group B',
    afterEqual: 'Compare the outcomes after equalizing opportunities',
    cannotCalculate: 'Unable to calculate',
    dynamicResultSentence: (gap, ratio) => {
      if (gap < 0) {
        return `Group B's promotion probability is ${Math.abs(gap)} percentage points lower than Group A's. After the selected stages, Group B's expected population is ${ratio.toFixed(2)}% of Group A's.`;
      }

      if (gap > 0) {
        return `Group B's promotion probability is ${Math.abs(gap)} percentage points higher than Group A's. After the selected stages, Group B's expected population is ${ratio.toFixed(2)}% of Group A's.`;
      }

      return `Group A and Group B have the same promotion probability. After the selected stages, Group B's expected population is ${ratio.toFixed(2)}% of Group A's.`;
    },
    originalBFinal: 'Original Group B final expected headcount',
    adjustedBFinal: 'Adjusted Group B final expected headcount',
    comparisonDisclaimer:
      'Changing later opportunities does not restore people who did not continue through earlier stages. This scenario is not a prediction of real policy effects.',
    comparisonRatioSentence: (originalRatio, adjustedRatio) =>
      `Original B/A: ${originalRatio.toFixed(2)}%. Adjusted B/A: ${adjustedRatio.toFixed(2)}%.`,
    dynamicResultCannotCalculate:
      'The final B/A ratio cannot be calculated because the expected Group A population is zero.',
    salaryAtLevel: 'Salary at Level',
    equalizeAfterStage: 'Equalize opportunities after completing stage',
    comparisonNote:
      'Equalizing opportunities at a later stage does not restore people who did not advance in earlier stages. This scenario is a simplified model comparison, not a prediction of the effect of a real policy.',
  },

  zhCN: {
    eyebrow: '互动模型',
    title: '累积差距',
    subtitle: '微小的机会差异，如何随着时间累积成更大的不平等。',
    intro: '这个互动模型展示了晋升机会中反复出现的小差异，如何影响职业发展中的群体代表性与薪资增长。',
    researchEyebrow: '研究依据',
    researchTitle: '为什么要模拟反复出现的小差距？',
    researchParagraphOne:
      '关于职场性别不平等的研究表明，不平等可能在员工职业发展的多个环节中逐渐累积，包括绩效评估、晋升和薪酬等过程（Son Hing et al., 2023）。',
    researchParagraphTwo:
      '一些研究也在特定职场样本中观察到不同性别之间的晋升结果差异。但这种差异的大小会随着职业、组织和研究人群的不同而变化（Blau & DeVaro, 2007; Xu, 2024）。',
    assumptionTitle: '关于模型中的数值',
    assumptionText:
      '模型默认使用 50% 和 45% 的晋升概率作为演示参数，并不代表男性与女性真实的晋升概率。这组数值只是为了展示一个较小的差异在多个阶段反复出现后，如何产生累积效应。所有参数都可以由使用者调整。',
    promotionTitle: '晋升路径',
    promotionDescription: '调整两组的晋升概率，观察在多个职业晋升阶段后，各组预计人数如何变化。',
    modelFormulaTitle: '数学模型',
    modelRationaleTitle: '为什么采用这个模型？',
    promotionModelRationale:
      "设 <span class='math-inline'>X<sub>k</sub></span> 表示到达第 <span class='math-inline'>k</span> 个阶段的人数，模型使用其期望人数 <span class='math-inline'>N<sub>k</sub> = E[X<sub>k</sub>]</span>。如果每个人在每个阶段都有相同的晋升概率 <span class='math-inline'>p</span>，那么 <span class='math-inline'>N<sub>k+1</sub> = pN<sub>k</sub></span>。从 1,000 人开始，重复这一过程后得到 <span class='math-inline'>N<sub>k</sub> = 1000p<sup>k</sup></span>。这些数值表示模型假设下的预期结果，而不是对真实组织实际晋升人数的精确预测。",
    ratioModelRationale:
      "两组都遵循相同的期望值晋升结构：<span class='math-inline'>N<sub>A,k</sub> = N<sub>0</sub>p<sub>A</sub><sup>k</sup></span>，<span class='math-inline'>N<sub>B,k</sub> = N<sub>0</sub>p<sub>B</sub><sup>k</sup></span>。用 B 组预计人数除以 A 组预计人数后，共同的初始人数 <span class='math-inline'>N<sub>0</sub></span> 会被约掉，得到 <span class='math-inline'>R<sub>k</sub> = (p<sub>B</sub>/p<sub>A</sub>)<sup>k</sup></span>。因此，这个比例能够单独反映两组晋升概率差异经过多阶段重复后产生的累积效应。",
    salaryModelRationale:
      "模型假设每次晋升都会使薪资按照相同比例 <span class='math-inline'>g</span> 增长，因此每次晋升都会将上一阶段的薪资乘以 <span class='math-inline'>(1 + g)</span>，即 <span class='math-inline'>S<sub>j+1</sub> = (1 + g)S<sub>j</sub></span>。重复 <span class='math-inline'>j</span> 次后得到 <span class='math-inline'>S<sub>j</sub> = S<sub>0</sub>(1 + g)<sup>j</sup></span>。因此，这里采用的是按比例增长模型，而不是根据真实薪资数据拟合出的曲线。",
    groupAProbability: 'A 组晋升概率',
    groupBProbability: 'B 组晋升概率',
    stages: '晋升阶段数量',
    groupA: 'A 组',
    groupB: 'B 组',
    peopleRemaining: '到達該階段的預期人數',
    symbolsTitle: '符号说明',
    howToReadTitle: '怎么看这一部分',
    symbolN0: '初始人数',
    symbolP: '每一阶段的晋升概率',
    symbolK: '晋升阶段数量',
    symbolNk: '到达第 k 阶段的预计人数',
    promotionReadingNote:
      '两组都从相同人数开始。这里重点不是预测真实公司最后会剩多少人，而是观察晋升概率中的小差异如何改变两组预计人数之间的相对关系。',
    trendChartTitle: '差距如何在多个阶段中逐渐形成',
    trendChartDescription:
      '调整上方的晋升概率，比较两组预计人数在多个阶段中的变化。即使预计人数的绝对差值不一定持续扩大，两组之间的相对差距仍可能扩大。',
    ratioTitle: '代表比例',
    ratioDescription: '晋升概率中的差异在多个阶段重复后，可能使两组之间的相对差距扩大。',
    finalRatio: '最终代表比例',
    symbolNA: '经过 k 个阶段后 A 组的预计人数',
    symbolNB: '经过 k 个阶段后 B 组的预计人数',
    symbolPAB: 'A 组与 B 组各自的晋升概率',
    symbolRk: '经过 k 个阶段后，B 组预计人数相对于 A 组预计人数的比例',
    ratioReadingNote:
      "如果 <span class='math-inline'>R<sub>k</sub> = 0.59</span>，表示 B 组预期人数是 A 组预期人数的 59%。这个比例的计算方式是 B 组除以 A 组，不是 B 组占 A、B 两组合计人数的比例。",
    ratioSentence: (ratio) => `当 A 组预计剩余 100 人时，B 组预计大约剩余 ${ratio} 人。`,
    salaryTitle: '薪资增长',
    salaryDescription: '这一部分使用演示性的货币数值，展示在模型中进入更高职业层级如何对应更高的薪资层级。',
    symbolS0: '起始薪资',
    symbolG: '每次晋升带来的薪资增长比例',
    symbolJ: '晋升次数',
    symbolSj: '经过 j 次晋升后的薪资',
    salaryReadingNote:
      '这一部分中的货币数值仅用于模型演示，不代表年收入或累计收入。模型也不假设同一职位存在同工不同酬，而是展示晋升机会差异如何影响进入更高薪资层级的机会。',
    salarySummaryTitle: '所选晋升次数后的最终薪资',
    salarySummarySentence: (start, finalSalary, stages) =>
      `从 $${start} 起始，经过 ${stages} 次晋升后，薪资增长至 $${finalSalary}。`,
    startingSalary: '起始薪资',
    salaryIncrease: '每次晋升的薪资增长',
    modelAssumptionsEyebrow: '模型假设',
    modelAssumptionsTitle: '这个简化模型做出了哪些假设？',
    modelAssumptionOne: '两组都从相同的标准化初始人数 1,000 人开始。这个数值仅用于演示，并不代表真实组织的实际规模。',
    modelAssumptionTwo:
      '模型为每一组设置一个在所有阶段保持不变的晋升概率。默认晋升概率仅用于演示，并不是对某个特定组织或群体实际晋升率的估计。现实职场中，不同职位层级和职业阶段的晋升率可能并不相同。',
    modelAssumptionThree: '模型中的人数表示在这些假设下的期望结果，而不是对真实职场中实际晋升人数的精确预测。',
    modelAssumptionFour:
      '在薪资模型中，每进入下一个职业阶段都被视为完成一次晋升，并假设每次晋升都会带来相同比例的薪资增长。这个模型用于展示进入更高薪资层级的机会，而不是假设同一职位存在同工不同酬。',
    modelAssumptionFive: '模型不考虑固定晋升名额之间的竞争、新加入者，也不考虑未晋升者之后再次尝试晋升。',

    modelAssumptionSix:
      '在这个模型中，没有进入下一阶段并不表示一个人被解雇或离开组织，只表示其没有进入模型中的下一个职业阶段。',
    whyTitle: '为什么这很重要',
    whyParagraphOne:
      '性别不平等并不总是来自一次明显的歧视行为。获取机会方面的微小差异，可能在职业发展的多个阶段中不断累积（Son Hing et al., 2023）。',
    whyParagraphTwo:
      '这种现象有时被称为“累积劣势”：反复出现的小差异，最终可能形成显著的代表性与收入差距（Son Hing et al., 2023）。',
    actionOneTitle: '透明的标准',
    actionOneText: '让晋升标准清晰、一致且可被理解。',
    actionTwoTitle: '监测机会分配',
    actionTwoText: '观察职业机会是否在不同群体之间得到公平分配。',
    actionThreeTitle: '尽早行动',
    actionThreeText: '在微小差异不断累积之前及时发现并处理。',
    referencesEyebrow: '参考文献',
    referencesTitle: '模型背后的研究依据',
    referencesIntro: '这个模型本身是演示性的，但其结构受到有关累积劣势、晋升不平等和职业发展的研究启发。',
    disclaimer: '这是一个用于展示累积效应的简化假设模型，并不代表任何特定公司或群体的真实数据。',
    stage: '阶段',
    salaryAtStage: '薪资',
    promotionStage: '晋升阶段',
    expectedHeadcount: '预期人数',
    errorText: '加载失败',
    headcount: '人数',
    tableTip: '同一层级薪资相同，但能够到达该层级的预期人数可能不同。各行表示同一批人在不同阶段的情况，人数不能相加。',
    projectTip: '项目通过简化模型展示晋升机会差异的累积影响，用于理解机制，不预测真实企业，也不直接证明歧视',
    changedB: '调整后的B组',
    afterEqual: '比较机会相同后的结果',
    cannotCalculate: '无法计算',
    dynamicResultSentence: (gap, ratio) => {
      if (gap < 0) {
        return `B 组的晋升概率比 A 组低 ${Math.abs(gap)} 个百分点。经过所选晋升阶段后，B 组预期人数为 A 组的 ${ratio.toFixed(2)}%。`;
      }

      if (gap > 0) {
        return `B 组的晋升概率比 A 组高 ${Math.abs(gap)} 个百分点。经过所选晋升阶段后，B 组预期人数为 A 组的 ${ratio.toFixed(2)}%。`;
      }

      return `A 组和 B 组的晋升概率相同。经过所选晋升阶段后，B 组预期人数为 A 组的 ${ratio.toFixed(2)}%。`;
    },
    originalBFinal: '原 B 组最终预期人数',
    adjustedBFinal: '调整后 B 组最终预期人数',
    comparisonDisclaimer: '改变后续机会不会补回此前未继续晋升的人；此情景不代表真实政策效果的预测。',
    comparisonRatioSentence: (originalRatio, adjustedRatio) =>
      `原 B/A：${originalRatio.toFixed(2)}%；调整后 B/A：${adjustedRatio.toFixed(2)}%。`,
    dynamicResultCannotCalculate: '由于 A 组预期人数为 0，最终 B/A 比值无法计算。',
    salaryAtLevel: '层级薪资',
    equalizeAfterStage: '完成第几个阶段后使晋升机会相同',
    comparisonNote:
      '在后面的阶段使晋升机会相同，并不会补回前面阶段中没有晋升的人。这个情景只是简化模型中的比较，并不是对真实政策效果的预测。',
  },

  zhTW: {
    eyebrow: '互動模型',
    title: '累積差距',
    subtitle: '微小的機會差異，如何隨著時間累積成更大的不平等。',
    intro: '這個互動模型展示了晉升機會中反覆出現的小差異，如何影響職涯發展中的群體代表性與薪資成長。',
    researchEyebrow: '研究依據',
    researchTitle: '為什麼要模擬反覆出現的小差距？',
    researchParagraphOne:
      '關於職場性別不平等的研究顯示，不平等可能在員工職涯發展的多個環節中逐漸累積，包括績效評估、晉升和薪酬等過程（Son Hing et al., 2023）。',
    researchParagraphTwo:
      '一些研究也在特定職場樣本中觀察到不同性別之間的晉升結果差異。但這種差異的大小會隨著職業、組織和研究人群的不同而變化（Blau & DeVaro, 2007; Xu, 2024）。',
    assumptionTitle: '關於模型中的數值',

    assumptionText:
      '模型預設使用 50% 和 45% 的晉升機率作為示範參數，並不代表男性與女性真實的晉升機率。這組數值只是為了展示一個較小的差異在多個階段反覆出現後，如何產生累積效應。所有參數都可以由使用者調整。',
    promotionTitle: '晉升路徑',
    promotionDescription: '調整兩組的晉升機率，觀察在多個職涯晉升階段後，各組預期人數如何變化。',
    modelFormulaTitle: '數學模型',
    modelRationaleTitle: '為什麼採用這個模型？',
    promotionModelRationale:
      "設 <span class='math-inline'>X<sub>k</sub></span> 表示到達第 <span class='math-inline'>k</span> 個階段的人數，模型使用其期望人數 <span class='math-inline'>N<sub>k</sub> = E[X<sub>k</sub>]</span>。如果每個人在每個階段都有相同的晉升概率 <span class='math-inline'>p</span>，那麼 <span class='math-inline'>N<sub>k+1</sub> = pN<sub>k</sub></span>。從 1,000 人開始，重複這一過程後得到 <span class='math-inline'>N<sub>k</sub> = 1000p<sup>k</sup></span>。這些數值表示模型假設下的預期結果，而不是對真實組織實際晉升人數的精確預測。",
    ratioModelRationale:
      "兩組都遵循相同的期望值晉升結構：<span class='math-inline'>N<sub>A,k</sub> = N<sub>0</sub>p<sub>A</sub><sup>k</sup></span>，<span class='math-inline'>N<sub>B,k</sub> = N<sub>0</sub>p<sub>B</sub><sup>k</sup></span>。用 B 組預期人數除以 A 組預期人數後，共同的起始人數 <span class='math-inline'>N<sub>0</sub></span> 會被約掉，得到 <span class='math-inline'>R<sub>k</sub> = (p<sub>B</sub>/p<sub>A</sub>)<sup>k</sup></span>。因此，這個比例能夠單獨反映兩組晉升機率差異經過多階段重複後產生的累積效應。",
    salaryModelRationale:
      "模型假設每次晉升都會使薪資按照相同比例 <span class='math-inline'>g</span> 成長，因此每次晉升都會將上一階段的薪資乘以 <span class='math-inline'>(1 + g)</span>，即 <span class='math-inline'>S<sub>j+1</sub> = (1 + g)S<sub>j</sub></span>。重複 <span class='math-inline'>j</span> 次後得到 <span class='math-inline'>S<sub>j</sub> = S<sub>0</sub>(1 + g)<sup>j</sup></span>。因此，這裡採用的是按比例成長模型，而不是根據真實薪資資料擬合出的曲線。",
    groupAProbability: 'A 組晉升機率',
    groupBProbability: 'B 組晉升機率',
    stages: '晉升階段數量',
    groupA: 'A 組',
    groupB: 'B 組',
    peopleRemaining: '預期剩餘人數',
    symbolsTitle: '符號說明',
    howToReadTitle: '怎麼看這一部分',
    symbolN0: '起始人數',
    symbolP: '每一階段的晉升機率',
    symbolK: '晉升階段數量',
    symbolNk: '到達第 k 階段的預期人數',
    promotionReadingNote:
      '兩組都從相同人數開始。這裡的重點不是預測真實企業最後會剩多少人，而是觀察晉升機率中的小差異如何改變兩組預期人數之間的相對關係。',
    trendChartTitle: '差距如何在多個階段中逐漸形成',
    trendChartDescription:
      '調整上方的晉升概率，比較兩組預計人數在多個階段中的變化。即使預計人數的絕對差值不一定持續擴大，兩組之間的相對差距仍可能擴大。',
    ratioTitle: '代表比例',
    ratioDescription: '晉升概率中的差異在多個階段重複後，可能使兩組之間的相對差距擴大。',
    finalRatio: '最終代表比例',
    symbolNA: '經過 k 個階段後 A 組的預期人數',
    symbolNB: '經過 k 個階段後 B 組的預期人數',
    symbolPAB: 'A 組與 B 組各自的晉升機率',
    symbolRk: '經過 k 個階段後，B 組預期人數相對於 A 組預期人數的比例',
    ratioReadingNote:
      "如果 <span class='math-inline'>R<sub>k</sub> = 0.59</span>，表示 B 組預期人數是 A 組預期人數的 59%。這個比例的計算方式是 B 組除以 A 組，不是 B 組占 A、B 兩組合計人數的比例。",
    ratioSentence: (ratio) => `當 A 組預期剩餘 100 人時，B 組預期大約剩餘 ${ratio} 人。`,
    salaryTitle: '薪資成長',
    salaryDescription: '這一部分使用演示性的貨幣數值，展示在模型中進入更高職業層級如何對應更高的薪資層級。',
    symbolS0: '起始薪資',
    symbolG: '每次晉升帶來的薪資成長比例',
    symbolJ: '晉升次數',
    symbolSj: '經過 j 次晉升後的薪資',
    salaryReadingNote:
      '這一部分中的貨幣數值僅用於模型演示，不代表年收入或累計收入。模型也不假設同一職位存在同工不同酬，而是展示晉升機會差異如何影響進入更高薪資層級的機會。',
    salarySummaryTitle: '所選晉升次數後的最終薪資',
    salarySummarySentence: (start, finalSalary, stages) =>
      `從 $${start} 起始，經過 ${stages} 次晉升後，薪資成長至 $${finalSalary}。`,
    startingSalary: '起始薪資',
    salaryIncrease: '每次晉升的薪資成長',
    modelAssumptionsEyebrow: '模型假設',
    modelAssumptionsTitle: '這個簡化模型做出了哪些假設？',
    modelAssumptionOne: '兩組都從相同的標準化起始人數 1,000 人開始。這個數值僅用於示範，並不代表真實組織的實際規模。',
    modelAssumptionTwo:
      '模型為每一組設定一個在所有階段保持不變的晉升機率。預設晉升機率僅用於示範，並不是對某個特定組織或群體實際晉升率的估計。現實職場中，不同職位層級和職涯階段的晉升率可能並不相同。',
    modelAssumptionThree: '模型中的人數表示在這些假設下的期望結果，而不是對真實職場中實際晉升人數的精確預測。',
    modelAssumptionFour:
      '在薪資模型中，每進入下一個職涯階段都被視為完成一次晉升，並假設每次晉升都會帶來相同比例的薪資成長。這個模型用於展示進入較高薪資層級的機會，而不是假設同一職位存在同工不同酬。',
    modelAssumptionFive: '模型不考慮固定晉升名額之間的競爭、新加入者，也不考慮未晉升者之後再次嘗試晉升。',

    modelAssumptionSix:
      '在這個模型中，沒有進入下一階段並不表示一個人被解僱或離開組織，只表示其沒有進入模型中的下一個職涯階段。',
    whyTitle: '為什麼這很重要',
    whyParagraphOne:
      '性別不平等並不總是來自一次明顯的歧視行為。取得機會方面的微小差異，可能在職涯發展的多個階段中不斷累積（Son Hing et al., 2023）。',
    whyParagraphTwo:
      '這種現象有時被稱為「累積劣勢」：反覆出現的小差異，最終可能形成顯著的代表性與收入差距（Son Hing et al., 2023）。',
    actionOneTitle: '透明的標準',
    actionOneText: '讓晉升標準清晰、一致且容易理解。',
    actionTwoTitle: '監測機會分配',
    actionTwoText: '觀察職涯機會是否在不同群體之間得到公平分配。',
    actionThreeTitle: '儘早行動',
    actionThreeText: '在微小差異不斷累積之前及時發現並處理。',
    referencesEyebrow: '參考文獻',
    referencesTitle: '模型背後的研究依據',
    referencesIntro: '這個模型本身是示範性的，但其結構受到有關累積劣勢、晉升不平等和職涯發展研究的啟發。',
    disclaimer: '這是一個用於展示累積效應的簡化假設模型，並不代表任何特定公司或群體的真實數據。',
    stage: '階段',
    salaryAtStage: '薪資',
    promotionStage: '晉升階段',
    expectedHeadcount: '預期人數',
    errorText: '加載失敗',
    headcount: '人數',
    tableTip: '同一層級薪資相同，但能夠到達該層級的預期人數可能不同。各行表示同一批人在不同階段的情況，人數不能相加。',
    projectTip: '項目通過簡化模型展示晉升機會差異的累積影響，用於理解機制，不預測真實企業，也不直接證明歧視',
    changedB: '調整後的B組',
    afterEqual: '比較機會相同後的結果',
    cannotCalculate: '無法計算',
    dynamicResultSentence: (gap, ratio) => {
      if (gap < 0) {
        return `B 組的晉升概率比 A 組低 ${Math.abs(gap)} 個百分點。經過所選晉升階段後，B 組預期人數為 A 組的 ${ratio.toFixed(2)}%。`;
      }

      if (gap > 0) {
        return `B 組的晉升概率比 A 組高 ${Math.abs(gap)} 個百分點。經過所選晉升階段後，B 組預期人數為 A 組的 ${ratio.toFixed(2)}%。`;
      }

      return `A 組和 B 組的晉升概率相同。經過所選晉升階段後，B 組預期人數為 A 組的 ${ratio.toFixed(2)}%。`;
    },
    originalBFinal: '原 B 組最終預期人數',
    adjustedBFinal: '調整後 B 組最終預期人數',
    comparisonDisclaimer: '改變後續機會不會補回此前未繼續晉升的人；此情景不代表真實政策效果的預測。',
    comparisonRatioSentence: (originalRatio, adjustedRatio) =>
      `原 B/A：${originalRatio.toFixed(2)}%；調整後 B/A：${adjustedRatio.toFixed(2)}%。`,
    dynamicResultCannotCalculate: '由於 A 組預期人數為 0，最終 B/A 比值無法計算。',
    salaryAtLevel: '層級薪資',
    equalizeAfterStage: '完成第幾個階段後使晉升機會相同',
    comparisonNote:
      '在後面的階段使晉升機會相同，並不會補回前面階段中沒有晉升的人。這個情境只是簡化模型中的比較，並不是對真實政策效果的預測。',
  },
};

function fixNum(num) {
  if (num < 0.01 && num !== 0 && num > 0) {
    return `< 0.01`;
  }
  return num.toFixed(2);
}

function formatRatio(numerator, denominator) {
  if (denominator === 0) {
    return null;
  }
  return (numerator / denominator) * 100;
}

let finalA;
let finalB;

function calculatePromotion() {
  const pA = Number(probA.value) / 100;
  const pB = Number(probB.value) / 100;
  const k = Number(stages.value);

  const startingPopulation = 1000;

  finalA = startingPopulation * Math.pow(pA, k);
  finalB = startingPopulation * Math.pow(pB, k);

  const ratio = formatRatio(finalB, finalA);
  if (ratio === null) {
    ratioResult.textContent = translations[currentLanguage].cannotCalculate;
  } else {
    ratioResult.textContent = `${ratio.toFixed(2)}%`;
  }

  updateTrendChart(pA, pB, k, startingPopulation);
  probAValue.textContent = `${probA.value}%`;
  probBValue.textContent = `${probB.value}%`;
  stagesValue.textContent = stages.value;

  groupAResult.textContent = fixNum(finalA);
  groupBResult.textContent = fixNum(finalB);

  const probabilityGap = Number(probB.value) - Number(probA.value);
  if (ratio === null) {
    ratioSentence.textContent = translations[currentLanguage].cannotCalculate;
    dynamicResultSentence.textContent = translations[currentLanguage].dynamicResultCannotCalculate;
  } else {
    ratioSentence.textContent = translations[currentLanguage].ratioSentence(ratio.toFixed(2));

    dynamicResultSentence.textContent = translations[currentLanguage].dynamicResultSentence(probabilityGap, ratio);
  }

  if (resCheck.checked) {
    const m = Number(km);

    const adjustedB = calculateAdjustedB(pA, pB, k, m, startingPopulation);

    const originalRatio = formatRatio(finalB, finalA);
    const adjustedRatio = formatRatio(adjustedB, finalA);

    originalBFinalResult.textContent = fixNum(finalB);

    adjustedBFinalResult.textContent = fixNum(adjustedB);

    comparisonRatioSentence.textContent = translations[currentLanguage].comparisonRatioSentence(
      originalRatio,
      adjustedRatio,
    );

    comparisonResults.style.display = 'block';
  } else {
    comparisonResults.style.display = 'none';
  }
}

function updateTrendChart(pA, pB, k, startingPopulation) {
  const m = Number(km);
  const labels = [];
  const groupAData = [];
  const groupBData = [];

  for (let stage = 0; stage <= k; stage++) {
    labels.push(`${translations[currentLanguage].stage} ${stage}`);

    groupAData.push(startingPopulation * Math.pow(pA, stage));

    groupBData.push(startingPopulation * Math.pow(pB, stage));
  }
  let datasets = [
    {
      label: translations[currentLanguage].groupA,
      data: groupAData,
      borderColor: '#111827',
      backgroundColor: '#111827',
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 6,
      tension: 0.25,
      fill: false,
    },
    {
      label: translations[currentLanguage].groupB,
      data: groupBData,
      borderColor: '#9ca3af',
      backgroundColor: '#9ca3af',
      borderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 6,
      tension: 0.25,
      fill: false,
    },
  ];
  if (!promotionTrendChart) {
    if (typeof Chart === 'undefined') {
      promotionTrendChartCanvas.style.display = 'none';
      chartError.hidden = false;
      chartError.textContent = translations[currentLanguage].errorText;
      return;
    }
    promotionTrendChartCanvas.style.display = 'block';
    chartError.hidden = true;
    promotionTrendChart = new Chart(promotionTrendChartCanvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: datasets,
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,

        animation: {
          duration: 180,
          easing: 'linear',
        },

        interaction: {
          mode: 'index',
          intersect: false,
        },

        plugins: {
          legend: {
            display: true,
            position: 'top',
          },

          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.parsed.y;
                const formattedValue = fixNum(value);
                return `${context.dataset.label}: ${formattedValue}`;
              },
            },
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: translations[currentLanguage].promotionStage,
            },
            grid: {
              display: true,
            },
          },

          y: {
            display: true,
            title: {
              display: true,
              text: translations[currentLanguage].expectedHeadcount,
            },
            beginAtZero: true,
            grid: {
              display: true,
            },
          },
        },
      },
    });
  } else {
    promotionTrendChart.data.labels = labels;

    promotionTrendChart.data.datasets[0].label = translations[currentLanguage].groupA;

    promotionTrendChart.data.datasets[0].data = groupAData;

    promotionTrendChart.data.datasets[1].label = translations[currentLanguage].groupB;

    promotionTrendChart.data.datasets[1].data = groupBData;

    promotionTrendChart.options.scales.x.title.text = translations[currentLanguage].promotionStage;
    promotionTrendChart.options.scales.y.title.text = translations[currentLanguage].expectedHeadcount;

    if (resCheck.checked) {
      const dataForNewB = [];
      for (let stage = 0; stage <= k; stage++) {
        if (stage <= m) {
          dataForNewB.push(startingPopulation * Math.pow(pB, stage));
        } else {
          dataForNewB.push(startingPopulation * Math.pow(pB, m) * Math.pow(pA, stage - m));
        }
      }
      promotionTrendChart.data.datasets[2] = {
        label: translations[currentLanguage].changedB,
        data: dataForNewB,
        borderColor: '#409EFF',
        backgroundColor: '#409EFF',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 6,
        tension: 0.25,
        fill: false,
      };
    } else {
      promotionTrendChart.data.datasets = [promotionTrendChart.data.datasets[0], promotionTrendChart.data.datasets[1]];
    }
    promotionTrendChart.update();
  }
}

function calculateSalary() {
  const startingSalary = Number(salary.value);
  const growthRate = Number(growth.value) / 100;
  const pA = Number(probA.value) / 100;
  const pB = Number(probB.value) / 100;
  const k = Number(stages.value);

  salaryValue.textContent = `$${startingSalary.toLocaleString()}`;
  growthValue.textContent = `${growth.value}%`;

  salaryTable.innerHTML = `
    <div class="salary-row salary-header">
      <span>${translations[currentLanguage].stage}</span>
      <span>${translations[currentLanguage].groupA}${translations[currentLanguage].headcount} </span>
      <span>${translations[currentLanguage].groupB}${translations[currentLanguage].headcount} </span>
      <span>${translations[currentLanguage].salaryAtLevel}</span>
    </div>
  `;

  for (let stage = 0; stage <= k; stage++) {
    const currentSalary = startingSalary * Math.pow(1 + growthRate, stage);

    // 根据每个stage单独计算
    const groupAAtStage = 1000 * Math.pow(pA, stage);
    const groupBAtStage = 1000 * Math.pow(pB, stage);

    const row = document.createElement('div');
    row.className = 'salary-row';

    row.innerHTML = `
            <span>${stage}</span>
            <span>${fixNum(groupAAtStage)}</span>
            <span>${fixNum(groupBAtStage)}</span>
            <strong>$${Math.round(currentSalary).toLocaleString()}</strong>
        `;

    salaryTable.appendChild(row);
  }

  const finalSalary = startingSalary * Math.pow(1 + growthRate, k);

  const formattedStartSalary = startingSalary.toLocaleString();

  const formattedFinalSalary = Math.round(finalSalary).toLocaleString();

  salarySummaryResult.textContent = `$${formattedFinalSalary}`;

  const sentenceFunction = translations[currentLanguage].salarySummarySentence;

  if (typeof sentenceFunction === 'function') {
    salarySummarySentence.textContent = sentenceFunction(formattedStartSalary, formattedFinalSalary, k);
  }
}

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language === 'en' ? 'en' : language === 'zhCN' ? 'zh-CN' : 'zh-TW';

  const htmlKeys = [
    'promotionModelRationale',
    'ratioModelRationale',
    'salaryModelRationale',
    'promotionReadingNote',
    'ratioReadingNote',
    'salaryReadingNote',
  ];

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    const translation = translations[language][key];

    if (typeof translation === 'string') {
      if (htmlKeys.includes(key)) {
        element.innerHTML = translation;
      } else {
        element.textContent = translation;
      }
    }
  });

  document.querySelectorAll('.language-switcher button').forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === language);
  });

  calculatePromotion();
  calculateSalary();

  const startingSalary = Number(salary.value);
  const growthRate = Number(growth.value) / 100;
  const k = Number(stages.value);

  const finalSalary = startingSalary * Math.pow(1 + growthRate, k);

  const formattedStartSalary = startingSalary.toLocaleString();

  const formattedFinalSalary = Math.round(finalSalary).toLocaleString();

  document.getElementById('salarySummarySentence').textContent = translations[language].salarySummarySentence(
    formattedStartSalary,
    formattedFinalSalary,
    k,
  );
}

probA.addEventListener('input', () => {
  calculatePromotion();
  calculateSalary();
});
probB.addEventListener('input', () => {
  calculatePromotion();
  calculateSalary();
});

kmkm.addEventListener('input', (event) => {
  const k = Number(stages.value);
  let numericValue = Number(event.target.value);

  if (!Number.isFinite(numericValue)) {
    numericValue = 0;
  }

  numericValue = Math.floor(numericValue);
  numericValue = Math.max(0, Math.min(k, numericValue));

  event.target.value = numericValue;
  km = numericValue;

  calculatePromotion();
});

stages.addEventListener('input', () => {
  const k = Number(stages.value);
  kmkm.max = k;

  if (Number(kmkm.value) > k) {
    kmkm.value = k;
    km = k;
  }

  calculatePromotion();
  calculateSalary();
});

salary.addEventListener('input', calculateSalary);
growth.addEventListener('input', calculateSalary);

function changeRangeValue(input, amount) {
  const min = Number(input.min);
  const max = Number(input.max);

  let newValue = Number(input.value) + amount;

  newValue = Math.max(min, Math.min(max, newValue));

  input.value = newValue;

  input.dispatchEvent(new Event('input'));
}
function addHoldButton(button, input, amount) {
  let holdTimer = null;
  let repeatTimer = null;

  const stopHold = () => {
    clearTimeout(holdTimer);
    clearInterval(repeatTimer);

    holdTimer = null;
    repeatTimer = null;
  };

  button.addEventListener('pointerdown', (event) => {
    event.preventDefault();

    changeRangeValue(input, amount);

    holdTimer = setTimeout(() => {
      repeatTimer = setInterval(() => {
        changeRangeValue(input, amount);
      }, 120);
    }, 350);
  });

  button.addEventListener('pointerup', stopHold);
  button.addEventListener('pointerleave', stopHold);
  button.addEventListener('pointercancel', stopHold);
}

addHoldButton(probAMinus, probA, -1);
addHoldButton(probAPlus, probA, 1);

addHoldButton(probBMinus, probB, -1);
addHoldButton(probBPlus, probB, 1);

addHoldButton(stagesMinus, stages, -1);
addHoldButton(stagesPlus, stages, 1);

document.querySelectorAll('.language-switcher button').forEach((button) => {
  button.addEventListener('click', () => {
    changeLanguage(button.dataset.lang);
  });
});

changeLanguage('en');
