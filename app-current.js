const assessments = {
  drive: {
    kicker: "内在驱动力画像",
    title: "驱动力 3.0 简版自测",
    description: "请根据真实感受评分：1=完全不同意，5=完全同意。该简版自测参考 Daniel Pink 的自主、专精、目的三要素，用来观察你更容易被哪种内在方向持续牵引。",
    maxPerDimension: 25,
    levelLabels: {
      high: "高分",
      medium: "中等",
      low: "偏低"
    },
    sources: [
      {
        label: "Daniel Pink《Drive》",
        text: "将持久内在动机概括为自主、专精、目的三要素。",
        url: "https://www.danpink.com/books/drive/"
      },
      {
        label: "自我决定理论 SDT",
        text: "自主和胜任感是高质量动机的重要心理条件，能帮助解释为什么自主与专精会增强投入。",
        url: "https://selfdeterminationtheory.org/theory/"
      },
      {
        label: "目标设定理论",
        text: "具体、有挑战且能获得反馈的目标，更有助于提升表现、坚持度和自我调节。本报告中的小实验、阶段复盘和具体反馈建议，参考了这一思路。",
        url: "https://psycnet.apa.org/record/2002-17591-001"
      },
      {
        label: "《业务为本》第6章第2节",
        text: "将驱动力2.0解释为外在奖惩系统，驱动力3.0解释为自主、专精、目的，并强调在保障基本物质条件后设计更能激发内在动机的工作体验。"
      }
    ],
    dimensions: [
      {
        id: "autonomy",
        name: "自主驱动力",
        shortName: "自主",
        color: "#0f766e",
        questions: [
          "我希望能自由安排工作/学习的时间和方式。",
          "被严格监管或微观管理会让我效率下降。",
          "我更喜欢自己设定目标，而不是被动接受他人安排。",
          "即使薪水稍低，我也更愿意选择弹性工作制。",
          "在团队中，我倾向于主动提出解决方案，而不是等待指令。"
        ],
        high: "你对选择权和掌控感较敏感，可能更适配目标清晰、过程允许自主安排的工作情境。",
        medium: "你对自主权有一定需求，通常在清晰目标下保留执行方式的选择空间时更容易投入。",
        low: "自主需求当前不突出，明确规则、稳定流程和外部安排可能更有助于你进入状态。",
        advice: "围绕“更多自主”设计一个小实验：在目标清晰的前提下，争取任务认领、参与讨论和决策、弹性安排时间、选择工作方式或基于结果验收中的一项。"
      },
      {
        id: "mastery",
        name: "专精驱动力",
        shortName: "专精",
        color: "#3d74d7",
        questions: [
          "我享受挑战困难任务、不断提升技能的过程。",
          "即使没有外部奖励，我也愿意投入时间钻研感兴趣的事物。",
          "我对“成为某领域专家”有强烈的渴望。",
          "比起职位头衔，我更看重能力成长的机会。",
          "当我掌握一项新技能时，会感到极大的满足感。"
        ],
        high: "你容易被持续学习、能力提升和挑战性任务激励，更适配能提供成长反馈的工作情境。",
        medium: "你会被成长机会激励，但也需要任务难度适中、反馈明确，避免长期高压挑战。",
        low: "专精需求当前不强，可能更看重稳定产出、清楚标准或即时回报。",
        advice: "围绕“持续钻研”设计成长机会：选择一个与能力相匹配但略有挑战的任务，获得反馈，并寻找展示专长的舞台，例如分享、复盘、内部讲堂或项目攻关。"
      },
      {
        id: "purpose",
        name: "目的驱动力",
        shortName: "目的",
        color: "#e46d55",
        questions: [
          "我的工作必须对社会或他人有积极影响。",
          "我愿意为了一项有意义的事业，暂时牺牲短期利益。",
          "公司/组织的价值观必须与我个人信念一致。",
          "我经常思考自己的人生使命或长期目标。",
          "如果工作缺乏意义，即使高薪也难以让我长期坚持。"
        ],
        high: "你更容易被意义感、价值一致性和对他人的积极影响激励，更适配使命感较清晰的工作情境。",
        medium: "意义感会影响你的投入，但不一定需要宏大的使命；看见工作对他人的具体帮助就很重要。",
        low: "目的需求当前不强，可能说明你更关注现实收益、角色稳定，或暂时还没找到意义连接点。",
        advice: "围绕“明确目标和意义”做一次意义映射：写下这项工作服务了谁、解决了什么问题、对团队或客户有什么长期价值，并确认它与你重视的使命或职业方向是否一致。"
      }
    ],
    interpret(scores) {
      const values = Object.values(scores);
      const high = this.dimensions.filter((dimension) => scores[dimension.id] >= 20);
      const lowAll = values.every((score) => score <= 15);
      const highAll = high.length === 3;
      const sorted = topDimensions(scores, this.dimensions);
      const topScore = scores[sorted[0].id];
      const bottomScore = scores[sorted[sorted.length - 1].id];
      const average = values.reduce((sum, score) => sum + score, 0) / values.length;
      const closeTop = sorted.filter((dimension) => topScore - scores[dimension.id] <= 2 && scores[dimension.id] >= 16);
      const balancedMiddle = topScore - bottomScore <= 3 && average > 15 && average < 20;

      if (highAll) {
        return {
          title: "全面内在驱动型",
          copy: "你的自主、专精与目的得分都很高，说明你具备较强的内在动机基础。更适配的环境通常同时具备三件事：能给你选择权，能提供持续变强的挑战，也能让你看见工作对他人或长期价值的贡献。"
        };
      }

      if (balancedMiddle) {
        return {
          title: "均衡型 / 情境驱动型",
          copy: "你的自主、专精和目的得分处于中等到中等偏上的区间，且彼此差距不大。这不代表你缺少内在动机，而是说明目前没有单一维度特别突出。你的动力更可能随任务性质和工作环境变化：有些情境需要更多自主，有些情境需要成长挑战，有些情境则需要更清晰的意义连接。"
        };
      }

      if (lowAll) {
        return {
          title: "3.0 内在驱动信号偏弱",
          copy: "自主、专精和目的三类内在驱动力目前都偏低。驱动力 2.0 主要依靠外在奖惩，例如薪酬、奖金、考核、职位或处罚；驱动力 3.0 更强调自主、专精和目的带来的内在动机。由于本测评只测量 3.0 的三个维度，没有直接测量外在激励，因此更稳妥的理解是：你现阶段的 3.0 信号偏弱，可能更依赖外在激励条件，或当前环境尚未充分激活你的内在动机。"
        };
      }

      if (high.length >= 2 || closeTop.length >= 2) {
        const combo = high.length >= 2 ? high : closeTop;
        const names = combo.map((dimension) => dimension.shortName).join(" + ");
        const comboMap = {
          "自主 + 专精": "常见于创意工作者、设计师、作者、产品创新者等，需要空间，也需要持续打磨能力。",
          "自主 + 目的": "常见于社会创业、公益创新或价值观驱动的项目，需要独立行动，也需要明确使命。",
          "专精 + 目的": "常见于科研、医疗、教育等领域，需要专业深度，也需要确认工作价值。"
        };
        return {
          title: `${names} 组合驱动型`,
          copy: `${comboMap[names] || "你依赖多重内在驱动力，更需要同时满足自主、成长与意义的复杂任务。"} 两类分数接近时，不必强行只选一个主导类型，可以把它们一起作为工作适配的判断标准。`
        };
      }

      const top = sorted[0];
      return {
        title: `${top.shortName}主导型`,
        copy: `${top.high} 这是你当前最突出的内在驱动力。选择任务或岗位时，可以优先观察它是否被充分满足，同时留意其他维度是否被长期压低。`
      };
    }
  },
  needs: {
    kicker: "基础心理需求",
    title: "工作动机需求简版自评",
    description: "请根据真实感受评分：1=完全不同意，5=完全同意。该简版自评参考自我决定理论，观察工作环境中哪些心理条件最能支持你的投入。",
    maxPerDimension: 20,
    levelLabels: {
      veryHigh: "非常突出",
      high: "需求较强",
      medium: "一般水平",
      low: "有待观察"
    },
    sources: [
      {
        label: "自我决定理论 SDT",
        text: "认为自主、胜任、关系/归属是支持高质量动机和心理健康的基本心理需求。",
        url: "https://selfdeterminationtheory.org/theory/"
      },
      {
        label: "工作相关基本需求量表",
        text: "将自主、胜任、关系三类需求用于工作情境中的需求满足评估。",
        url: "https://doi.org/10.1348/096317909X481382"
      },
      {
        label: "工作特征模型",
        text: "强调自主性、反馈和任务意义等工作特征会影响内部工作动机。",
        url: "https://doi.org/10.1016/0030-5073(76)90016-7"
      }
    ],
    dimensions: [
      {
        id: "autonomyNeed",
        name: "自主性需求",
        shortName: "自主性",
        color: "#0f766e",
        questions: [
          "我希望能够自主决定工作任务的执行方式。",
          "当领导详细规定每个步骤时，我会感到烦躁。",
          "选择自己感兴趣的项目对我很重要。",
          "我需要在工作中有表达个人想法的空间。"
        ],
        high: "你对微观管理更敏感，通常在拥有一定决策空间、可参与方法选择的任务中更容易投入。",
        medium: "你需要一定自主空间，但也能接受清晰边界和必要规范。",
        low: "自主性需求当前不突出，明确流程、稳定安排和外部协调可能更能帮你进入状态。",
        advice: "把需要自主权的部分说清楚，例如执行方式、时间安排或项目选择；与管理者约定结果标准，而不只讨论过程控制。"
      },
      {
        id: "competence",
        name: "胜任感需求",
        shortName: "胜任感",
        color: "#3d74d7",
        questions: [
          "解决超出当前能力的难题会让我兴奋。",
          "我经常通过考证/学习来验证专业能力。",
          "如果长时间没有技能提升，我会焦虑。",
          "清晰的能力成长路径对我至关重要。"
        ],
        high: "你对挑战、成长反馈和能力进阶更敏感，清晰的能力路径会明显提升投入感。",
        medium: "成长机会会提升你的投入，但你也需要节奏可控、反馈及时。",
        low: "胜任感需求当前不突出，你可能暂时更需要低阻力启动、清楚标准和稳定完成感。",
        advice: "选择有挑战、有反馈、有成长路径的任务；把大目标拆成可验证的小技能节点。"
      },
      {
        id: "relatedness",
        name: "归属感需求",
        shortName: "归属感",
        color: "#d69e2e",
        questions: [
          "和同事建立私人友谊能提升我的工作动力。",
          "团队归属感比个人成就更重要。",
          "我乐于参与非工作性质的团队活动。",
          "得到同事的认可对我极具激励作用。"
        ],
        high: "你容易受到团队氛围、同伴认可和关系质量影响，也可能更适配导师、连接者或文化共建角色。",
        medium: "团队关系会影响你的状态，但独立空间同样重要。",
        low: "归属感需求当前不突出，你可能更习惯以任务、专业或个人节奏来获得动力。",
        advice: "主动创造稳定协作关系，争取更多同伴反馈；在团队中承担连接、支持或导师类角色。"
      }
    ],
    interpret(scores) {
      const values = Object.values(scores);
      const high = this.dimensions.filter((dimension) => scores[dimension.id] >= 19);
      const strong = this.dimensions.filter((dimension) => scores[dimension.id] >= 16);
      const top = topDimensions(scores, this.dimensions)[0];
      const lowAll = values.every((score) => score < 12);

      if (high.length > 0) {
        const names = high.map((dimension) => dimension.shortName).join("、");
        return {
          title: `${names}是你的核心心理需求线索`,
          copy: `这些维度非常突出，说明它们很可能显著影响你的投入感、满意度和持续动力。如果这些需求长期被满足，你更容易保持稳定投入；如果长期受阻，也更容易出现消耗感、抵触感或动力下降。做工作设计、团队协作或岗位选择时，应优先关注这些需求是否能被稳定满足。`
        };
      }

      if (strong.length > 0) {
        const names = strong.map((dimension) => dimension.shortName).join("、");
        return {
          title: `${names}需求较强`,
          copy: "这些维度对你的投入感已有一定影响，但还不一定是最核心、最不可替代的需求。它们更像当前阶段的关键支持条件：被满足时更容易投入，被忽视时可能降低工作体验。适度调整任务自主度、成长反馈或协作关系，通常会带来可感知的动力提升。"
        };
      }

      if (lowAll) {
        return {
          title: "三类需求满足信号偏弱",
          copy: "自主性、胜任感和归属感目前都低于一般区间。这不一定代表你缺少动力，更可能提示当前任务、团队或阶段尚未充分激活这些心理需求。建议先从低成本调整入手，观察状态是否改善。"
        };
      }

      return {
        title: `${top.shortName}相对更突出`,
        copy: "当前三类需求尚未达到较强或核心需求水平，说明它们暂时不是特别强烈的动力开关。相对最高的维度仍然值得关注，因为它可能是最容易撬动你当前工作状态的入口。可以先做小幅度环境优化，再观察投入感、满意度和持续动力是否回升。"
      };
    }
  },
  external: {
    kicker: "驱动力 2.0 补充",
    title: "驱动力 2.0 补充自评",
    description: "请根据真实感受评分：1=完全不同意，5=完全同意。该补充自评用于观察薪酬回报、外部认可与机会、规则考核等外在条件对你当前动力的影响。",
    maxPerDimension: 20,
    levelLabels: {
      veryHigh: "非常明显",
      high: "影响较强",
      medium: "一般影响",
      low: "影响较弱"
    },
    sources: [
      {
        label: "Daniel Pink《Drive》",
        text: "将驱动力2.0描述为基于外在奖惩的动机系统，常见形式包括奖励、惩罚、考核、职位机会和短期激励。",
        url: "https://www.danpink.com/books/drive/"
      },
      {
        label: "自我决定理论 SDT",
        text: "区分控制性外部激励与支持自主、胜任和关系的反馈。认可如果只是奖赏或地位信号，更偏外在激励；如果是具体、非控制性的能力反馈，则可能支持胜任感和归属感。",
        url: "https://selfdeterminationtheory.org/theory/"
      },
      {
        label: "《业务为本》第6章第2节",
        text: "指出驱动力2.0在简单重复性工作和短期效果上仍有作用，但在知识和创意工作中，需要在保障基本物质条件后进一步设计3.0工作体验。"
      }
    ],
    dimensions: [
      {
        id: "material",
        name: "物质回报",
        shortName: "回报",
        color: "#d69e2e",
        questions: [
          "薪酬、奖金或实际收益会明显影响我的投入程度。",
          "如果回报不够有竞争力，我很难长期保持积极性。",
          "我会优先考虑这件事是否带来明确的经济收益。",
          "当奖励规则清楚时，我更容易投入完成任务。"
        ],
        high: "物质回报对你当前动力影响较明显，合理、透明、有竞争力的回报机制会显著影响投入感。",
        medium: "物质回报对你有一定影响，但通常不是唯一动力来源。",
        low: "物质回报并非你当前最敏感的动力条件，你可能更看重任务本身、成长或意义。",
        advice: "先确认基本回报是否公平、透明、可持续；如果这部分长期不足，单靠内在动机设计很难稳定发挥作用。"
      },
      {
        id: "recognition",
        name: "外部认可与机会",
        shortName: "外部认可",
        color: "#e46d55",
        questions: [
          "来自领导、同事或客户的肯定会明显提升我的投入程度。",
          "晋升机会、头衔、重要项目或更高责任会让我更愿意投入。",
          "如果努力长期没有被看见或没有机会转化为发展，我会明显降低积极性。",
          "公开表扬、关键机会或清晰的贡献确认会让我更有行动动力。"
        ],
        high: "外部认可、机会和身份反馈对你影响较明显。它更偏向 2.0 的外在激励线索，但如果反馈具体、非控制，并能帮助你看见能力进步或关系支持，也可能同时支持胜任感和归属感。",
        medium: "外部认可和机会会影响你的状态，但通常需要与任务价值、成长反馈或团队关系一起发挥作用。",
        low: "外部认可并非你当前最敏感的激励条件，你可能更依赖内在标准、任务本身或真实成长带来的满足感。",
        advice: "为重要任务建立可见的反馈节点，例如阶段复盘、成果展示、明确贡献归属或下一步机会；同时尽量把认可落到具体贡献和能力进步上，避免只依赖头衔或表扬。"
      },
      {
        id: "structure",
        name: "规则考核",
        shortName: "规则",
        color: "#667085",
        questions: [
          "明确的指标、排名或考核结果会推动我行动。",
          "有截止日期和责任追踪时，我更容易完成任务。",
          "如果没有外部要求或监督，我容易拖延。",
          "清楚的奖惩机制会让我更有方向感。"
        ],
        high: "规则、指标和外部约束对你当前行动有较强推动作用。清晰边界和反馈节奏会帮助你保持执行。",
        medium: "规则和考核能帮助你启动或坚持，但过强控制也可能削弱自主感。",
        low: "规则考核并非你当前最敏感的动力条件，过度控制反而可能降低投入。",
        advice: "把外部要求转化为清晰目标和节奏管理，同时保留一定自主空间，避免只靠压力驱动。"
      }
    ],
    interpret(scores) {
      const values = Object.values(scores);
      const strong = this.dimensions.filter((dimension) => scores[dimension.id] >= 16);
      const lowAll = values.every((score) => score < 12);
      const sorted = topDimensions(scores, this.dimensions);
      const top = sorted[0];
      const topScore = scores[top.id];
      const bottomScore = scores[sorted[sorted.length - 1].id];

      if (strong.length >= 2) {
        const names = strong.map((dimension) => dimension.shortName).join("、");
        return {
          title: `${names}外在激励较明显`,
          copy: "你的多个外在激励维度较强，说明薪酬回报、外部认可与机会、规则考核等条件会影响当前动力。这不代表你缺少内在动机，而是提示：在设计工作体验前，需要先确认外在基础条件是否足够公平、清晰和稳定。"
        };
      }

      if (topScore >= 16) {
        return {
          title: `${top.shortName}是主要外在激励线索`,
          copy: `${top.high} 建议把它作为理解当前动力状态的补充线索，再结合工作动机需求和驱动力 3.0 的结果一起判断。`
        };
      }

      if (lowAll) {
        return {
          title: "外在激励敏感度偏低",
          copy: "物质回报、外部认可与机会、规则考核当前都不算特别突出。你可能更容易被任务本身、成长、意义、关系或自主空间影响，也可能处在一个外在条件相对稳定、暂时不是主要矛盾的阶段。"
        };
      }

      if (topScore - bottomScore <= 3) {
        return {
          title: "外在激励影响较均衡",
          copy: "三类外在激励得分接近，说明你没有特别单一的外在激励来源。它们可能作为基础条件共同影响你的状态，但不一定构成最主要的动力来源。"
        };
      }

      return {
        title: `${top.shortName}相对更突出`,
        copy: `${top.medium} 可以把它作为补充观察点：当内在驱动不明显时，看看这个外在条件是否正在影响你的投入。`
      };
    }
  }
};

const form = document.querySelector("#quiz-form");
const tabs = document.querySelectorAll(".assessment-tab");
const resetButton = document.querySelector("#reset-button");
const resultButton = document.querySelector("#result-button");
const printButton = document.querySelector("#print-button");
const actionStatus = document.querySelector("#action-status");
const resultSection = document.querySelector("#result-section");
const storageKey = "motivation-assessment-state-v3";
const assessmentFlow = ["needs", "drive", "external"];

let currentAssessment = "needs";
const answers = {
  drive: {},
  needs: {},
  external: {}
};

loadSavedState();

function renderAssessment() {
  const assessment = assessments[currentAssessment];
  document.querySelector("#question-count").textContent = assessment.dimensions.reduce(
    (sum, dimension) => sum + dimension.questions.length,
    0
  );
  document.querySelector("#assessment-kicker").textContent = assessment.kicker;
  document.querySelector("#assessment-title").textContent = assessment.title;
  document.querySelector("#assessment-description").textContent = assessment.description;

  form.innerHTML = "";
  let questionNumber = 1;
  assessment.dimensions.forEach((dimension) => {
    const group = document.createElement("section");
    group.className = "dimension-group";

    const heading = document.createElement("div");
    heading.className = "dimension-heading";
    heading.innerHTML = `<h3>${dimension.name}</h3><span>${dimension.questions.length} 题</span>`;
    group.appendChild(heading);

    dimension.questions.forEach((question, index) => {
      const key = `${dimension.id}-${index}`;
      const card = document.createElement("article");
      card.className = "question-card";
      card.innerHTML = `
        <p class="question-text">
          <span class="question-number">${questionNumber}</span>
          <span>${question}</span>
        </p>
        <div class="scale" role="radiogroup" aria-label="第 ${questionNumber} 题评分">
          ${[1, 2, 3, 4, 5]
            .map(
              (value) => `
                <label>
                  <input type="radio" name="${key}" value="${value}" ${
                    answers[currentAssessment][key] === value ? "checked" : ""
                  } />
                  ${value}
                </label>
              `
            )
            .join("")}
        </div>
      `;
      group.appendChild(card);
      questionNumber += 1;
    });

    form.appendChild(group);
  });

  updateProgress();
  updateActionArea();
  resultSection.hidden = true;
  saveState();
}

function updateProgress() {
  const assessment = assessments[currentAssessment];
  const total = assessment.dimensions.reduce((sum, dimension) => sum + dimension.questions.length, 0);
  const completed = Object.keys(answers[currentAssessment]).length;
  const percent = Math.round((completed / total) * 100);
  document.querySelector("#progress-text").textContent = `${percent}%`;
  document.querySelector("#progress-bar").style.width = `${percent}%`;
  updateActionArea();
}

function updateActionArea() {
  const currentComplete = isAssessmentCompleteFor(currentAssessment);
  const nextKey = getNextIncompleteAssessmentKey();
  const completedCount = getCompletedAssessmentCount();
  const totalCount = assessmentFlow.length;

  printButton.hidden = !allAssessmentsComplete();

  if (allAssessmentsComplete()) {
    resultButton.textContent = "生成完整报告";
    actionStatus.textContent = "三项测评已完成，可以查看综合动力画像和完整解读。";
    return;
  }

  if (currentComplete && nextKey && nextKey !== currentAssessment) {
    resultButton.textContent = `进入下一项：${assessments[nextKey].title}`;
    actionStatus.textContent = `已完成 ${completedCount}/${totalCount} 项，继续完成后再统一生成结果。`;
    return;
  }

  resultButton.textContent = "保存并继续";
  actionStatus.textContent = `已完成 ${completedCount}/${totalCount} 项。请先完成当前测评，完整结果会在三项结束后生成。`;
}

function calculateScores() {
  return calculateScoresFor(currentAssessment);
}

function calculateScoresFor(assessmentKey) {
  const assessment = assessments[assessmentKey];
  const answerSet = answers[assessmentKey];
  const scores = {};
  assessment.dimensions.forEach((dimension) => {
    scores[dimension.id] = dimension.questions.reduce((sum, _, index) => {
      return sum + (answerSet[`${dimension.id}-${index}`] || 0);
    }, 0);
  });
  return scores;
}

function topDimensions(scores, dimensions) {
  return [...dimensions].sort((a, b) => scores[b.id] - scores[a.id]);
}

function findFirstMissingAnswer(assessment) {
  for (const dimension of assessment.dimensions) {
    for (let index = 0; index < dimension.questions.length; index += 1) {
      const key = `${dimension.id}-${index}`;
      if (!answers[currentAssessment][key]) return key;
    }
  }
  return "";
}

function getLevel(score, assessment) {
  if (assessment.maxPerDimension === 25) {
    if (score >= 20) return assessment.levelLabels.high;
    if (score <= 15) return assessment.levelLabels.low;
    return assessment.levelLabels.medium;
  }
  if (score >= 19) return assessment.levelLabels.veryHigh;
  if (score >= 16) return assessment.levelLabels.high;
  if (score >= 12) return assessment.levelLabels.medium;
  return assessment.levelLabels.low;
}

function handlePrimaryAction() {
  const assessment = assessments[currentAssessment];
  if (!isAssessmentComplete(assessment)) {
    alert("当前测评还有题目未完成，请全部作答后再继续。");
    const firstMissing = findFirstMissingAnswer(assessment);
    form
      .querySelector(`input[name="${firstMissing}"]`)
      ?.closest(".question-card")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }

  if (!allAssessmentsComplete()) {
    const nextKey = getNextIncompleteAssessmentKey();
    if (nextKey) switchAssessment(nextKey);
    return;
  }

  showFullResults();
}

function showFullResults() {
  if (!allAssessmentsComplete()) {
    const nextKey = getNextIncompleteAssessmentKey();
    if (nextKey) switchAssessment(nextKey);
    return;
  }

  resultSection.innerHTML = buildFullResultsHtml();
  resultSection.hidden = false;
  assessmentFlow.forEach((assessmentKey) => {
    drawRadar(calculateScoresFor(assessmentKey), assessments[assessmentKey], `#radar-chart-${assessmentKey}`);
  });
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  actionStatus.textContent = "完整测评结果已生成。";
}

function isAssessmentComplete(assessment) {
  return isAssessmentCompleteFor(currentAssessment);
}

function isAssessmentCompleteFor(assessmentKey) {
  const assessment = assessments[assessmentKey];
  const total = assessment.dimensions.reduce((sum, dimension) => sum + dimension.questions.length, 0);
  return Object.keys(answers[assessmentKey]).length >= total;
}

function allAssessmentsComplete() {
  return assessmentFlow.every((assessmentKey) => isAssessmentCompleteFor(assessmentKey));
}

function getCompletedAssessmentCount() {
  return assessmentFlow.filter((assessmentKey) => isAssessmentCompleteFor(assessmentKey)).length;
}

function getNextIncompleteAssessmentKey() {
  const currentIndex = assessmentFlow.indexOf(currentAssessment);
  const afterCurrent = assessmentFlow.slice(currentIndex + 1).find((assessmentKey) => !isAssessmentCompleteFor(assessmentKey));
  return afterCurrent || assessmentFlow.find((assessmentKey) => !isAssessmentCompleteFor(assessmentKey)) || "";
}

function switchAssessment(assessmentKey) {
  currentAssessment = assessmentKey;
  tabs.forEach((item) => item.classList.toggle("active", item.dataset.assessment === currentAssessment));
  renderAssessment();
  document.querySelector(".assessment-panel").scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderCompositeReport() {
  document.querySelector("#overall-report").innerHTML = buildCompositeReportHtml();
}

function buildCompositeReportHtml() {
  const assessmentNames = {
    needs: "工作动机需求",
    drive: "驱动力 3.0",
    external: "驱动力 2.0 补充自评"
  };
  const missing = Object.keys(assessments).filter((key) => !isAssessmentCompleteFor(key));

  if (missing.length > 0) {
    return `
      <p class="section-kicker">综合动力画像</p>
      <h2>完成三项后生成总体解读</h2>
      <p>这三项测评分别回答不同问题：心理条件说明“什么环境更支持你投入”，驱动力 3.0 说明“你更容易被哪种内在方向牵引”，驱动力 2.0 补充自评说明“哪些外部条件会影响当前动力”。</p>
      <div class="overall-missing">
        ${missing.map((key) => `<span>还差：${assessmentNames[key]}</span>`).join("")}
      </div>
    `;
  }

  const needsScores = calculateScoresFor("needs");
  const driveScores = calculateScoresFor("drive");
  const externalScores = calculateScoresFor("external");
  const topNeed = topDimensions(needsScores, assessments.needs.dimensions)[0];
  const topDrive = topDimensions(driveScores, assessments.drive.dimensions)[0];
  const topExternal = topDimensions(externalScores, assessments.external.dimensions)[0];
  const strongNeeds = assessments.needs.dimensions.filter((dimension) => needsScores[dimension.id] >= 16);
  const strongExternal = assessments.external.dimensions.filter((dimension) => externalScores[dimension.id] >= 16);
  const lowDrive = Object.values(driveScores).every((score) => score <= 15);
  const balancedDrive = Math.max(...Object.values(driveScores)) - Math.min(...Object.values(driveScores)) <= 3;
  const autonomyAligned = topNeed.id === "autonomyNeed" && topDrive.id === "autonomy";
  const competenceAligned = topNeed.id === "competence" && topDrive.id === "mastery";

  let title = "综合动力画像";
  let copy = "你的结果需要从三层一起看：基础心理需求是投入的支持条件，驱动力 3.0 是更深层的内在牵引，外在激励则是当前环境是否公平、清晰、稳定的补充线索。";

  if (lowDrive && strongExternal.length > 0) {
    title = "外在条件更敏感，内在驱动待激活";
    copy = "你的 3.0 内在驱动信号暂时不强，同时外在激励中存在较明显线索。这更适合解释为：当前阶段可能需要先确认回报、外部认可与机会、规则或资源是否足够公平清晰，再进一步设计自主、成长和意义感。";
  } else if (strongNeeds.length > 0 && !lowDrive) {
    title = "心理条件与内在方向可以联动设计";
    copy = "你的基础心理需求已经有较清晰线索，同时 3.0 内在方向也不是低信号状态。更有效的做法不是只看一个最高分，而是把“需要被满足的心理条件”和“真正牵引你的内在方向”合起来设计任务。";
  } else if (autonomyAligned || competenceAligned) {
    title = "需求与驱动力出现一致信号";
    copy = "你的心理需求和 3.0 驱动力之间出现了方向一致的线索，说明某类条件既会影响你的工作体验，也可能成为持续投入的内在来源。它值得作为下一阶段工作设计或岗位选择的优先观察点。";
  } else if (balancedDrive) {
    title = "动力来源较均衡，建议看具体情境";
    copy = "你的 3.0 维度差距不大，说明不一定存在单一主导驱动力。此时更重要的是看任务情境：哪些任务让你更有选择权，哪些任务让你成长更快，哪些任务让你更能看见意义。";
  }

  return `
    <p class="section-kicker">综合动力画像</p>
    <h2>${title}</h2>
    <div class="overall-copy">${renderParagraphs(copy)}</div>
    <div class="overall-cards">
      <article class="overall-card">
        <small>心理条件</small>
        <strong>${topNeed.shortName}</strong>
        <span>${needsScores[topNeed.id]} / ${assessments.needs.maxPerDimension}，优先观察它是否被稳定满足。</span>
      </article>
      <article class="overall-card">
        <small>内在方向</small>
        <strong>${topDrive.shortName}</strong>
        <span>${driveScores[topDrive.id]} / ${assessments.drive.maxPerDimension}，代表当前更突出的 3.0 牵引线索。</span>
      </article>
      <article class="overall-card">
        <small>外在条件</small>
        <strong>${topExternal.shortName}</strong>
        <span>${externalScores[topExternal.id]} / ${assessments.external.maxPerDimension}，用于判断外部环境的影响。</span>
      </article>
    </div>
  `;
}

function buildFullResultsHtml() {
  return `
    <div class="overall-report" id="overall-report">
      ${buildCompositeReportHtml()}
    </div>
    <div class="manual-panel">
      <p class="section-kicker">你的动力使用说明书</p>
      ${buildMotivationManualHtml()}
    </div>
    <div class="integrated-panel advice-panel">
      <p class="section-kicker">整体行动建议</p>
      ${buildIntegratedAdviceHtml()}
    </div>
    <div class="integrated-panel theory-panel">
      <p class="section-kicker">参考来源</p>
      <ul>${renderSourceItems(getCombinedSources())}</ul>
    </div>
    <div class="full-report-heading">
      <p class="section-kicker">完整测评结果</p>
      <h2>三项测评解读</h2>
      <p>下面依次呈现心理条件、内在方向和外在条件三项结果。建议先看综合动力画像和整体行动建议，再把各项维度分数作为补充线索。</p>
    </div>
    ${assessmentFlow.map((assessmentKey) => buildAssessmentResultHtml(assessmentKey)).join("")}
  `;
}

function getReportContext() {
  const needsScores = calculateScoresFor("needs");
  const driveScores = calculateScoresFor("drive");
  const externalScores = calculateScoresFor("external");
  const topNeed = topDimensions(needsScores, assessments.needs.dimensions)[0];
  const topDrive = topDimensions(driveScores, assessments.drive.dimensions)[0];
  const secondDrive = topDimensions(driveScores, assessments.drive.dimensions)[1];
  const topExternal = topDimensions(externalScores, assessments.external.dimensions)[0];
  const lowDrive = Object.values(driveScores).every((score) => score <= 15);
  const highExternal = externalScores[topExternal.id] >= 16;
  const highNeed = needsScores[topNeed.id] >= 16;
  const driveGap = driveScores[topDrive.id] - driveScores[secondDrive.id];
  const drivePair = driveGap <= 2 ? `${topDrive.shortName} + ${secondDrive.shortName}` : topDrive.shortName;

  return {
    needsScores,
    driveScores,
    externalScores,
    topNeed,
    topDrive,
    secondDrive,
    topExternal,
    lowDrive,
    highExternal,
    highNeed,
    drivePair
  };
}

function buildMotivationManualHtml() {
  const context = getReportContext();
  const profile = getProfileInsight(context);
  const fit = getFitEnvironment(context);
  const risk = getRiskInsight(context);
  const communication = getCommunicationSuggestion(context);

  return `
    <div class="manual-summary">
      <h2>${profile.title}</h2>
      <p>${profile.copy}</p>
    </div>
    <div class="manual-grid">
      <article class="manual-card">
        <small>更适配的工作环境</small>
        <p>${fit}</p>
      </article>
      <article class="manual-card">
        <small>容易消耗你的情境</small>
        <p>${risk}</p>
      </article>
      <article class="manual-card">
        <small>可以这样对外沟通</small>
        <p>${communication}</p>
      </article>
    </div>
  `;
}

function getProfileInsight({ topNeed, topDrive, secondDrive, topExternal, lowDrive, highExternal, drivePair }) {
  if (lowDrive && highExternal) {
    return {
      title: "你当前更需要先修复外部条件，再谈内在激发",
      copy: `你的 3.0 内在驱动信号暂时不强，但“${topExternal.shortName}”对行动意愿影响较明显。这不等于你没有内驱力，更像是当前阶段外部条件、资源或反馈质量正在占据更高优先级。`
    };
  }

  if (topNeed.id === "autonomyNeed" && topDrive.id === "autonomy") {
    return {
      title: "你需要的不只是自由，而是有边界的自主权",
      copy: `你的“${topNeed.shortName}”和“${topDrive.shortName}”同时突出，说明你对选择权、掌控感和参与决策比较敏感。最能激活你的不是完全放任，而是目标清楚、边界明确，同时允许你选择路径。`
    };
  }

  if (topNeed.id === "competence" && topDrive.id === "mastery") {
    return {
      title: "你容易被“变强”激活，也需要看见进步证据",
      copy: `你的“${topNeed.shortName}”和“${topDrive.shortName}”形成一致信号。你更可能在有挑战、有反馈、有成长路径的任务里持续投入；如果长期做重复任务，动力会被慢慢磨低。`
    };
  }

  if (topExternal.id === "recognition" && topDrive.id === "mastery") {
    return {
      title: "你不是单纯想被表扬，而是希望专业贡献被看见",
      copy: `你的 3.0 方向偏“${drivePair}”，外在条件中“${topExternal.shortName}”也较突出。这种组合常见的真实需求是：有空间把事情做好、持续提升能力，同时希望自己的专业投入被具体看见和确认。`
    };
  }

  return {
    title: `你的动力组合是“${topNeed.shortName}支持 + ${drivePair}牵引 + ${topExternal.shortName}补充”`,
    copy: `这说明你的动力不是单一来源。心理条件决定你是否容易进入状态，3.0 方向决定什么更能长期牵引你，2.0 补充项则提示哪些外部条件会影响你的行动意愿。`
  };
}

function getFitEnvironment({ topNeed, topDrive, topExternal }) {
  const needMap = {
    autonomyNeed: "给你参与方法选择、节奏安排和决策讨论的空间",
    competence: "提供清晰标准、及时反馈和略高于当前能力的挑战",
    relatedness: "有稳定协作关系、同伴支持和被团队接纳的氛围"
  };
  const driveMap = {
    autonomy: "允许你在目标明确的前提下自己设计路径",
    mastery: "能持续学习、复盘、打磨专业能力",
    purpose: "能看见工作服务了谁、解决了什么问题"
  };
  const externalMap = {
    material: "同时确保回报规则透明、投入产出相对公平",
    recognition: "同时让贡献被具体看见，而不只是笼统表扬",
    structure: "同时有清楚的目标、截止时间和责任边界"
  };

  return `更适合你的环境通常具备三点：${needMap[topNeed.id]}；${driveMap[topDrive.id]}；${externalMap[topExternal.id]}。`;
}

function getRiskInsight({ topNeed, topDrive, topExternal }) {
  const risks = [];
  if (topNeed.id === "autonomyNeed" || topDrive.id === "autonomy") {
    risks.push("被过度管控、频繁打断或只被要求照步骤执行");
  }
  if (topNeed.id === "competence" || topDrive.id === "mastery") {
    risks.push("长期没有挑战、没有反馈，或者努力看不到能力进阶");
  }
  if (topDrive.id === "purpose") {
    risks.push("只谈任务和指标，却看不见工作背后的价值");
  }
  if (topExternal.id === "recognition") {
    risks.push("贡献长期不可见，或者认可停留在空泛表扬而没有具体机会");
  }
  if (topExternal.id === "structure") {
    risks.push("目标频繁变化、规则模糊，或反馈只在最后一刻出现");
  }
  if (topExternal.id === "material") {
    risks.push("回报明显不公平，或投入产出长期失衡");
  }

  return `需要留意的消耗点是：${[...new Set(risks)].slice(0, 3).join("；")}。这些情境不一定立刻让你失去动力，但长期存在会让投入感下降。`;
}

function getCommunicationSuggestion({ topNeed, topDrive, topExternal }) {
  const needAsk = {
    autonomyNeed: "我希望在目标明确后，有一些选择执行方式的空间",
    competence: "我希望任务有清楚标准，也能获得具体反馈，知道自己哪里进步了",
    relatedness: "我希望协作关系更稳定，也能知道自己的工作如何支持团队"
  };
  const driveAsk = {
    autonomy: "这样我会更主动承担结果",
    mastery: "这样我会更愿意持续钻研并把能力沉淀下来",
    purpose: "这样我会更容易把任务和长期价值连接起来"
  };
  const externalAsk = {
    material: "同时也希望回报和规则保持透明",
    recognition: "如果有阶段性成果，也希望能得到具体确认或下一步机会",
    structure: "同时希望目标、截止时间和优先级更清楚"
  };

  return `可以这样表达：“${needAsk[topNeed.id]}，${driveAsk[topDrive.id]}；${externalAsk[topExternal.id]}。”`;
}

function buildIntegratedAdviceHtml() {
  const { topNeed, topDrive, topExternal, lowDrive, highExternal, highNeed } = getReportContext();

  const advice = [];

  if (highExternal && lowDrive) {
    advice.push("先处理外在基础条件：列出当前最影响状态的 1 个外部条件，例如回报、机会、规则或资源。把它具体化成一个可沟通的问题，而不是笼统归因为“我没有动力”。");
  } else {
    advice.push("先做基础检查：确认薪酬回报、资源支持、规则边界和关键机会没有明显不公平或不清晰。若这些条件基本稳定，再把重点放到心理需求和 3.0 工作体验设计上。");
  }

  if (highNeed) {
    advice.push(`围绕“${topNeed.shortName}”做一个环境微调：本周只改一个变量，例如任务选择权、反馈频率、协作方式或标准清晰度。不要同时改太多，否则很难判断什么真正有效。`);
  } else {
    advice.push("从低成本环境调整开始：三类心理需求如果都不算特别强烈，先不要急着贴标签。可以分别尝试多一点选择权、一次具体反馈、一次稳定协作，再观察哪一类最能改善状态。");
  }

  if (!lowDrive) {
    advice.push(`把“${topDrive.shortName}”转成任务设计：选择一个正在做的任务，写下怎样让它更符合这个方向。比如更多自主、更有挑战，或更能看见服务对象和长期价值。`);
  } else {
    advice.push("如果 3.0 三项都偏低，不要直接判断自己没有内驱力。更稳妥的做法是回看外在条件和当前工作情境，确认是不是任务过于消耗、反馈不足，或意义连接还没有被建立。");
  }

  advice.push(`把“${topExternal.shortName}”作为外在补充线索：观察它是否正在影响你的行动意愿。若是“外部认可”，重点看具体贡献是否被看见；若是“规则”，重点看目标和反馈是否清楚；若是“回报”，重点看投入产出是否公平。`);
  advice.push("做一个 7 天小实验：每天用 1 分钟记录“今天最有动力的时刻”和“今天最消耗的时刻”。一周后回看，它们更像是自主、成长、意义、关系，还是外部条件造成的。");
  advice.push("建议 1-3 个月后复测一次，并记录这段时间工作内容、管理方式、反馈质量和外部条件的变化。分数变化通常比单次分数更有解释价值。");

  return `<ol>${advice.map((item) => `<li>${item}</li>`).join("")}</ol>`;
}

function getCombinedSources() {
  const map = new Map();
  assessmentFlow.forEach((assessmentKey) => {
    assessments[assessmentKey].sources.forEach((source) => {
      const key = source.label;
      if (!map.has(key)) {
        map.set(key, { ...source });
        return;
      }
      const existing = map.get(key);
      if (!existing.text.includes(source.text)) {
        existing.text = `${existing.text} ${source.text}`;
      }
    });
  });
  return [...map.values()];
}

function buildAssessmentResultHtml(assessmentKey) {
  const assessment = assessments[assessmentKey];
  const scores = calculateScoresFor(assessmentKey);
  const result = assessment.interpret(scores);
  const sorted = topDimensions(scores, assessment.dimensions);

  return `
    <article class="assessment-report-block">
      <div class="result-summary">
        <div>
          <p class="section-kicker">${assessment.kicker}</p>
          <h2>${assessment.title}</h2>
          <h3>${result.title}</h3>
          <div class="result-copy">${renderParagraphs(result.copy)}</div>
          <div class="score-explain">${renderParagraphs(getScoreExplanation(assessment), 2)}</div>
        </div>
        <div class="score-badge">
          <strong>${sorted[0].name}</strong>
          <span>${scores[sorted[0].id]}</span>
          <small>最高维度总分</small>
        </div>
      </div>
      <div class="result-grid">
        <div class="chart-card">
          <canvas id="radar-chart-${assessmentKey}" width="420" height="420" aria-label="${assessment.title}得分图"></canvas>
        </div>
        <div class="dimension-list">
          ${buildDimensionListHtml(scores, assessment)}
        </div>
      </div>
    </article>
  `;
}

function buildDimensionListHtml(scores, assessment) {
  return assessment.dimensions
    .map((dimension) => {
      const score = scores[dimension.id];
      const average = getAverageScore(score, dimension.questions.length);
      const percent = Math.round((score / assessment.maxPerDimension) * 100);
      return `
        <article class="dimension-result">
          <header>
            <span>${dimension.name}</span>
            <span>${score} / ${assessment.maxPerDimension} · ${getLevel(score, assessment)}</span>
          </header>
          <div class="mini-track"><span style="width:${percent}%; background:${dimension.color}"></span></div>
          <div class="score-meta">
            <span>维度总分 ${score}</span>
            <span>单题平均 ${average}</span>
          </div>
          <p>${getDimensionInsight(dimension, score, assessment.maxPerDimension)}</p>
        </article>
      `;
    })
    .join("");
}

function renderDimensionList(scores, assessment) {
  const container = document.querySelector("#dimension-list");
  if (!container) return;
  container.innerHTML = "";
  assessment.dimensions.forEach((dimension) => {
    const score = scores[dimension.id];
    const average = getAverageScore(score, dimension.questions.length);
    const percent = Math.round((score / assessment.maxPerDimension) * 100);
    const item = document.createElement("article");
    item.className = "dimension-result";
    item.innerHTML = `
      <header>
        <span>${dimension.name}</span>
        <span>${score} / ${assessment.maxPerDimension} · ${getLevel(score, assessment)}</span>
      </header>
      <div class="mini-track"><span style="width:${percent}%; background:${dimension.color}"></span></div>
      <div class="score-meta">
        <span>维度总分 ${score}</span>
        <span>单题平均 ${average}</span>
      </div>
      <p>${getDimensionInsight(dimension, score, assessment.maxPerDimension)}</p>
    `;
    container.appendChild(item);
  });
}

function buildAdviceHtml(sorted, scores, assessment) {
  const isDrive = assessment === assessments.drive;
  const isNeeds = assessment === assessments.needs;
  const isExternal = assessment === assessments.external;
  const lowAll = isDrive && Object.values(scores).every((score) => score <= 15);
  const lowNeeds = isNeeds && Object.values(scores).every((score) => score < 12);
  const lowExternal = isExternal && Object.values(scores).every((score) => score < 12);
  const selected = sorted.filter((dimension, index) => index < 2 || scores[dimension.id] >= scores[sorted[0].id] - 2).slice(0, 3);

  if (lowAll) {
    return `
      <ul>
        <li><strong>先看基础条件：</strong>如果薪酬、外部认可与机会、资源或安全感明显不足，先处理这些外在条件；3.0 的内在动机通常建立在基本物质条件被保障的前提上。</li>
        <li><strong>明确目标：</strong>把当前任务重新表述成一个清晰、可判断结果的目标，减少“为什么做、做到什么程度”的模糊感。</li>
        <li><strong>增加一点自主：</strong>先争取一个很小的选择权，例如任务顺序、工作方式、时间安排或参与决策。</li>
        <li><strong>连接成长和意义：</strong>选择一个与能力匹配的小挑战，并写下它服务了谁、解决了什么问题，观察内在动力是否回升。</li>
      </ul>
    `;
  }

  if (lowNeeds) {
    return `
      <ul>
        <li><strong>先看环境：</strong>回顾近期任务是否过于重复、边界过窄、反馈不足，避免把环境问题简单归因于个人动力不足。</li>
        <li><strong>恢复胜任感：</strong>选择一个低阻力任务，设定清晰完成标准，先重新获得“能完成”的稳定体验。</li>
        <li><strong>增加连接：</strong>找一位同伴或上级做一次简短复盘，确认你的工作被谁使用、如何产生价值。</li>
        <li><strong>小步验证：</strong>每次只调整一个条件，例如多一点选择权、一次具体反馈或一次协作支持，再观察状态变化。</li>
      </ul>
    `;
  }

  if (lowExternal) {
    return `
      <ul>
        <li><strong>不用急着加奖励：</strong>外在条件不是当前最敏感的动力入口，可以优先回看任务意义、成长挑战、自主空间和关系支持。</li>
        <li><strong>保留基础公平：</strong>低敏感不等于不需要回报，仍要保证薪酬、外部认可与机会、规则的基本公平与清晰。</li>
        <li><strong>结合前两项：</strong>把它作为补充线索，再结合工作动机需求和驱动力 3.0 的结果，寻找更能激活你的条件。</li>
      </ul>
    `;
  }

  return `
    <ul>
      ${isDrive ? "<li><strong>前提检查：</strong>先确认基本物质条件、资源和外部认可与机会是否足够稳定；在此基础上，再通过明确目标、增加自主、匹配挑战和连接意义来设计工作体验。</li>" : ""}
      ${isExternal ? "<li><strong>使用方式：</strong>把外在激励作为补充线索，不要单独用它定义自己；它更适合帮助判断当前环境是否公平、清晰、稳定。</li>" : ""}
      ${selected
        .map((dimension) => `<li><strong>${dimension.shortName}：</strong>${dimension.advice}</li>`)
        .join("")}
      <li><strong>复盘：</strong>建议 3 个月后重新测评一次，对比工作环境变化与分数变化。</li>
    </ul>
  `;
}

function renderAdvice(sorted, scores, assessment) {
  const container = document.querySelector("#advice-list");
  if (container) container.innerHTML = buildAdviceHtml(sorted, scores, assessment);
}

function renderTheoryBasis(assessment) {
  const container = document.querySelector("#theory-list");
  if (!container) return;
  container.innerHTML = `
    <ul>
      ${renderSourceItems(assessment.sources)}
    </ul>
  `;
}

function renderSourceItems(sources) {
  return sources
    .map(
      (source) =>
        `<li><strong>${source.label}：</strong>${source.text}</li>`
    )
    .join("");
}

function downloadReport() {
  if (!allAssessmentsComplete()) {
    alert("请先完成三项测评，再下载完整结果解读。");
    const nextKey = getNextIncompleteAssessmentKey();
    if (nextKey) switchAssessment(nextKey);
    return;
  }

  showFullResults();
  const fileName = "自驱力完整测评结果解读.txt";
  const reportText = buildReportText();
  const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  actionStatus.textContent = "文本版报告已生成。手机上可直接打开、转发或复制保存。";
}

function buildReportText() {
  const createdAt = new Date().toLocaleString("zh-CN", { hour12: false });
  const text = resultSection.innerText
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .trim();

  return [
    "自驱力完整测评结果解读",
    `生成时间：${createdAt}`,
    "",
    text,
    "",
    "说明：本工具用于自我觉察与工作设计讨论，不等同于标准化心理测验常模。"
  ].join("\n");
}

function buildReportHtml() {
  const reportClone = resultSection.cloneNode(true);
  reportClone.querySelectorAll("canvas").forEach((canvas) => {
    const sourceCanvas = document.querySelector(`#${canvas.id}`);
    const image = document.createElement("img");
    image.className = "chart-image";
    image.alt = canvas.getAttribute("aria-label") || "测评得分图";
    image.src = sourceCanvas.toDataURL("image/png");
    canvas.replaceWith(image);
  });
  const createdAt = new Date().toLocaleString("zh-CN", { hour12: false });

  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>自驱力完整测评结果解读</title>
  <style>
    body { margin: 0; color: #18212f; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif; background: #f5f7fb; }
    main { width: min(920px, calc(100% - 32px)); margin: 0 auto; padding: 34px 0 48px; }
    .result-section { padding: 0; border: 0; background: transparent; }
    .print-header, .overall-report, .manual-panel, .full-report-heading, .assessment-report-block { margin-top: 18px; padding: 24px; border: 1px solid #dde4ee; border-radius: 8px; background: #fff; }
    .overall-report { background: linear-gradient(135deg, #eef7f5, #f8fafc); }
    .manual-panel { background: #f5f8ff; }
    .assessment-report-block { break-inside: avoid; }
    h1 { margin: 0 0 10px; font-size: 34px; line-height: 1.2; }
    h2 { margin: 0 0 14px; font-size: 22px; }
    h3 { margin: 0 0 10px; font-size: 18px; }
    p { line-height: 1.75; }
    .section-kicker { margin: 0 0 8px; color: #0f766e; font-size: 12px; font-weight: 800; letter-spacing: .12em; text-transform: uppercase; }
    .hero { color: #fff; background: linear-gradient(135deg, #0f766e, #3d74d7); }
    .result-summary { display: grid; grid-template-columns: 1fr 150px; gap: 20px; align-items: center; margin-bottom: 22px; }
    .score-badge { display: grid; place-items: center; min-height: 120px; padding: 18px; border-radius: 8px; color: #fff; background: linear-gradient(145deg, #e46d55, #d69e2e); text-align: center; }
    .score-badge span { display: block; font-size: 44px; font-weight: 900; }
    .score-badge strong { display: block; font-size: 17px; }
    .overall-cards { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
    .overall-card { padding: 16px; border: 1px solid #dde4ee; border-radius: 8px; background: #fff; }
    .overall-card small { display: block; margin-bottom: 8px; color: #667085; font-weight: 800; }
    .overall-card strong { display: block; margin-bottom: 6px; font-size: 19px; }
    .overall-card span { color: #667085; font-size: 14px; line-height: 1.5; }
    .manual-summary p { color: #667085; line-height: 1.75; }
    .manual-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 18px; }
    .manual-card { padding: 16px; border: 1px solid #dde4ee; border-radius: 8px; background: #fff; }
    .manual-card small { display: block; margin-bottom: 8px; color: #3d74d7; font-weight: 850; }
    .manual-card p { margin: 0; color: #667085; line-height: 1.65; }
    .result-grid { display: grid; grid-template-columns: 320px 1fr; gap: 18px; align-items: start; }
    .chart-image { width: 100%; max-width: 320px; }
    .chart-card { display: grid; place-items: center; padding: 14px; border: 1px solid #dde4ee; border-radius: 8px; background: #fbfcfe; }
    .dimension-list { display: grid; gap: 12px; }
    .dimension-result { margin-bottom: 12px; padding: 16px; border: 1px solid #dde4ee; border-radius: 8px; background: #fff; }
    .dimension-result header { display: flex; justify-content: space-between; gap: 12px; font-weight: 850; }
    .mini-track { height: 8px; margin: 10px 0; overflow: hidden; border-radius: 999px; background: #f5f7fb; }
    .mini-track span { display: block; height: 100%; border-radius: inherit; }
    .score-meta { display: flex; flex-wrap: wrap; gap: 8px; margin: 10px 0; }
    .score-meta span { padding: 5px 8px; border-radius: 999px; background: #f5f7fb; color: #667085; font-size: 12px; font-weight: 800; }
    .score-explain { display: grid; gap: 8px; padding: 12px 14px; border-left: 4px solid #0f766e; border-radius: 0 8px 8px 0; background: #eef7f5; font-weight: 650; }
    .advice-panel, .theory-panel { margin-top: 18px; padding: 20px; border-radius: 8px; background: #f7f3ea; }
    .theory-panel { background: #eef5f8; }
    li { margin-bottom: 8px; line-height: 1.65; }
    .print-button { min-height: 42px; margin-top: 18px; padding: 0 16px; border: 0; border-radius: 8px; color: #fff; background: #0f766e; font-weight: 850; }
    @media (max-width: 720px) { .result-summary, .result-grid, .overall-cards, .manual-grid { grid-template-columns: 1fr; } }
    @media print { body { background: #fff; } main { width: 100%; padding: 0; } .print-button { display: none; } }
  </style>
</head>
<body>
  <main>
    <section class="print-header hero">
      <p class="section-kicker">Assessment Report</p>
      <h1>自驱力完整测评结果解读</h1>
      <p>生成时间：${createdAt}</p>
    </section>
    ${reportClone.innerHTML}
    <button class="print-button" onclick="window.print()">打印或另存为 PDF</button>
  </main>
</body>
</html>`;
}

function getAverageScore(score, questionCount) {
  return (score / questionCount).toFixed(1);
}

function renderParagraphs(text, breakAfter) {
  return splitResultCopy(text, breakAfter)
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function splitResultCopy(text, breakAfter) {
  const sentences = text.match(/[^。！？]+[。！？]?/g)?.map((item) => item.trim()).filter(Boolean) || [text];
  if (sentences.length <= 2) return sentences;
  const firstBreak = breakAfter || Math.ceil(sentences.length / 2);
  return [
    sentences.slice(0, firstBreak).join(""),
    sentences.slice(firstBreak).join("")
  ].filter(Boolean);
}

function getScoreExplanation(assessment) {
  if (assessment === assessments.external) {
    return "驱动力 2.0 补充自评看的是各维度总分：每个维度 4 题，满分 20 分。它用于补充观察薪酬回报、外部认可与机会、规则考核等外在条件对当前动力的影响。其中，认可若表现为奖赏、头衔或机会分配，更偏外在激励；若表现为具体、非控制性的能力反馈，也可能支持胜任感和归属感。因此它需要结合前两项结果一起理解。";
  }
  if (assessment === assessments.needs) {
    return "工作动机需求看的是各维度总分：每个维度 4 题，满分 20 分。以下分段为本工具的解释规则，用于自我觉察和工作坊讨论，不等同于标准化心理测验常模：16-18 分表示该需求较强，19-20 分表示该需求非常突出，可作为核心心理需求线索。";
  }
  return "驱动力 3.0 看的是各维度总分：每个维度 5 题，满分 25 分。最高维度代表你最突出的内在驱动力；若两个维度分数接近，说明你可能同时受这两种动力影响。2.0 主要依靠外在奖惩，3.0 更强调自主、专精和目的；若三类得分都偏低，只能说明 3.0 内在驱动信号偏弱，不能直接推断你的外在激励水平。";
}

function saveState() {
  try {
    localStorage.setItem(storageKey, JSON.stringify({ currentAssessment, answers }));
  } catch (error) {
    // Local file privacy settings may block storage; the assessment still works without persistence.
  }
}

function loadSavedState() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "{}");
    if (saved.currentAssessment && assessments[saved.currentAssessment]) {
      currentAssessment = saved.currentAssessment;
    }
    if (saved.answers) {
      Object.assign(answers.drive, saved.answers.drive || {});
      Object.assign(answers.needs, saved.answers.needs || {});
      Object.assign(answers.external, saved.answers.external || {});
    }
  } catch (error) {
    localStorage.removeItem(storageKey);
  }
}

function getDimensionInsight(dimension, score, max) {
  if (max === 25) {
    if (score >= 20) return dimension.high;
    if (score <= 15) return dimension.low;
    return dimension.medium;
  }
  if (score >= 16) return dimension.high;
  if (score < 12) return dimension.low;
  return dimension.medium;
}

function drawRadar(scores, assessment, canvasSelector = "#radar-chart") {
  const canvas = document.querySelector(canvasSelector);
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const center = width / 2;
  const radius = 142;
  const dimensions = assessment.dimensions;

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = 1;
  ctx.font = "15px -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif";

  [0.25, 0.5, 0.75, 1].forEach((scale) => {
    ctx.beginPath();
    dimensions.forEach((_, index) => {
      const point = radarPoint(index, dimensions.length, radius * scale, center);
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.closePath();
    ctx.strokeStyle = "#d9e2ed";
    ctx.stroke();
  });

  dimensions.forEach((dimension, index) => {
    const edge = radarPoint(index, dimensions.length, radius, center);
    ctx.beginPath();
    ctx.moveTo(center, center);
    ctx.lineTo(edge.x, edge.y);
    ctx.strokeStyle = "#d9e2ed";
    ctx.stroke();

    const label = radarPoint(index, dimensions.length, radius + 36, center);
    ctx.fillStyle = dimension.color;
    ctx.textAlign = label.x < center - 10 ? "right" : label.x > center + 10 ? "left" : "center";
    ctx.textBaseline = label.y < center ? "bottom" : "top";
    ctx.fillText(dimension.shortName, label.x, label.y);
  });

  ctx.beginPath();
  dimensions.forEach((dimension, index) => {
    const scoreRadius = (scores[dimension.id] / assessment.maxPerDimension) * radius;
    const point = radarPoint(index, dimensions.length, scoreRadius, center);
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(15, 118, 110, 0.18)";
  ctx.strokeStyle = "#0f766e";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();

  dimensions.forEach((dimension, index) => {
    const scoreRadius = (scores[dimension.id] / assessment.maxPerDimension) * radius;
    const point = radarPoint(index, dimensions.length, scoreRadius, center);
    ctx.beginPath();
    ctx.arc(point.x, point.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = dimension.color;
    ctx.fill();
  });
}

function radarPoint(index, total, radius, center) {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / total;
  return {
    x: center + Math.cos(angle) * radius,
    y: center + Math.sin(angle) * radius
  };
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    switchAssessment(tab.dataset.assessment);
  });
});

form.addEventListener("change", (event) => {
  if (event.target.matches('input[type="radio"]')) {
    answers[currentAssessment][event.target.name] = Number(event.target.value);
    updateProgress();
    saveState();
  }
});

resetButton.addEventListener("click", () => {
  answers[currentAssessment] = {};
  saveState();
  renderAssessment();
});

resultButton.addEventListener("click", handlePrimaryAction);
printButton.addEventListener("click", downloadReport);

tabs.forEach((item) => item.classList.toggle("active", item.dataset.assessment === currentAssessment));
renderAssessment();
