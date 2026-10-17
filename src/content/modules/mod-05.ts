import type { Module } from '../types';

const module: Module = {
  id: 'social',
  order: 5,
  code: 'M-05',
  title: {
    zh: '社会工程学',
    en: 'Social Engineering',
    fr: 'Ingénierie sociale'
  },
  subtitle: {
    zh: '攻击者不一定攻破系统，他们可能先说服你。',
    en: 'Attackers don’t always break the system — sometimes they persuade you.',
    fr: 'L’attaquant ne casse pas toujours le système : parfois, il vous convainc.'
  },
  description: {
    zh: '这一模块讲「骗人」的技术：权威、紧迫、好奇、求助四类钩子，收集信息、建立信任、提出要求的攻击链，以及遇到可疑来电和私信时的反制动作。学完你能拆解一段陌生消息，并知道该挂断还是该回拨。',
    en: 'This module is about the human side of attacks: the four hooks — authority, urgency, curiosity and a plea for help — the chain of collecting information, building trust and making a request, and what to do when a call or message feels off. By the end you can break down a suspicious message and decide whether to hang up or call back.',
    fr: 'Ce module porte sur le facteur humain : les quatre accroches — autorité, urgence, curiosité et appel à l’aide —, la chaîne « collecter l’information, gagner la confiance, formuler une demande », et les bons réflexes face à un appel ou un message suspect. À la fin, vous saurez décomposer un message douteux et décider s’il faut raccrocher ou rappeler.'
  },
  outcomes: [
    {
      zh: '认出权威、紧迫、好奇、求助四类社工钩子。',
      en: 'Recognise the four social-engineering hooks: authority, urgency, curiosity and a plea for help.',
      fr: 'Reconnaître les quatre accroches d’ingénierie sociale : autorité, urgence, curiosité et appel à l’aide.'
    },
    {
      zh: '按「收集信息 → 建立信任 → 提要求」拆解一段可疑消息。',
      en: 'Break down a suspicious message using “collect information → build trust → make a request”.',
      fr: 'Décomposer un message suspect selon « collecter l’information → gagner la confiance → formuler une demande ».'
    },
    {
      zh: '用挂断、回拨官方号码、不透露验证码三步反制。',
      en: 'Respond with three moves: hang up, call back on an official number, and never share a verification code.',
      fr: 'Réagir en trois gestes : raccrocher, rappeler un numéro officiel et ne jamais communiquer un code de vérification.'
    }
  ],
  estimatedMinutes: 35,
  icon: 'social',
  lessons: [
    {
      type: 'concept',
      id: 'concept',
      title: {
        zh: '攻击者先拿到你的信任',
        en: 'Attackers go for your trust first',
        fr: 'L’attaquant vise d’abord votre confiance'
      },
      minutes: 8,
      objectives: [
        {
          zh: '说出社会工程学为什么比技术攻击成本更低。',
          en: 'Explain why social engineering costs an attacker less than a technical attack.',
          fr: 'Expliquer pourquoi l’ingénierie sociale coûte moins cher qu’une attaque technique.'
        },
        {
          zh: '辨认权威、紧迫、好奇、求助四类钩子。',
          en: 'Identify the four hooks: authority, urgency, curiosity and a plea for help.',
          fr: 'Identifier les quatre accroches : autorité, urgence, curiosité et appel à l’aide.'
        },
        {
          zh: '记住遇到可疑消息时的三个反制动作。',
          en: 'Remember the three counter-moves for a suspicious message.',
          fr: 'Retenir les trois gestes de riposte face à un message suspect.'
        }
      ],
      blocks: [
        {
          kind: 'lead',
          text: {
            zh: '社会工程学不攻击服务器，它攻击人：用一条看起来合理的消息，让你自己交出信息或权限。',
            en: 'Social engineering does not attack servers; it attacks people. A message that looks reasonable makes you hand over information or access yourself.',
            fr: 'L’ingénierie sociale n’attaque pas les serveurs : elle attaque les personnes. Un message plausible vous amène à livrer vous-même des informations ou des accès.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '它的成本比写一个漏洞利用低得多。查一查你的院系、社团和社交账号，就能编出一个可信的身份。',
            en: 'It costs far less than writing an exploit. A quick look at your department, clubs and social accounts is enough to invent a credible identity.',
            fr: 'Son coût est bien inférieur à celui d’un exploit. Un coup d’œil à votre filière, vos associations et vos réseaux suffit à inventer une identité crédible.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '权威：冒充导师、IT 部门、银行或平台客服。',
              en: 'Authority: posing as a lecturer, the IT department, a bank or platform support.',
              fr: 'Autorité : se faire passer pour un enseignant, le service informatique, une banque ou le support d’une plateforme.'
            },
            {
              zh: '紧迫：把处理时间压到几分钟，让你来不及核实。',
              en: 'Urgency: shrinking the deadline to minutes so you have no time to verify.',
              fr: 'Urgence : réduire le délai à quelques minutes pour vous empêcher de vérifier.'
            },
            {
              zh: '好奇：发一个「你看看这个」的链接或附件。',
              en: 'Curiosity: sending a “you should see this” link or attachment.',
              fr: 'Curiosité : envoyer un lien ou une pièce jointe « à voir absolument ».'
            },
            {
              zh: '求助：装成遇到麻烦的同学，向你借账号或验证码。',
              en: 'A plea for help: pretending to be a classmate in trouble and asking for your account or verification code.',
              fr: 'Appel à l’aide : se faire passer pour un camarade en difficulté et demander votre compte ou un code de vérification.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'note',
          title: {
            zh: '知道你的名字，不等于知道他是谁',
            en: 'Knowing your name does not prove who they are',
            fr: 'Connaître votre nom ne prouve pas son identité'
          },
          text: {
            zh: '对方能说出你的姓名和课表，并不证明他是老师——这些信息可能来自公开资料，正是社工收集的第一批素材。',
            en: 'A caller who knows your name and timetable is not necessarily a lecturer: that information may be public, and it is exactly what social engineers collect first.',
            fr: 'Quelqu’un qui connaît votre nom et votre emploi du temps n’est pas forcément enseignant : ces informations peuvent être publiques, et c’est précisément ce que collecte d’abord l’ingénieur social.'
          }
        },
        {
          kind: 'compare',
          leftTitle: {
            zh: '可疑消息常见特征',
            en: 'Common signs of a suspicious message',
            fr: 'Signes fréquents d’un message suspect'
          },
          leftItems: [
            {
              zh: '要求立刻操作，不给你核实时间',
              en: 'Demands immediate action and leaves no time to verify',
              fr: 'Exige une action immédiate et ne laisse pas le temps de vérifier'
            },
            {
              zh: '索要验证码、口令或远程控制权限',
              en: 'Asks for a verification code, password or remote-control access',
              fr: 'Demande un code de vérification, un mot de passe ou un accès à distance'
            },
            {
              zh: '让你换到私人聊天或私下转账',
              en: 'Pushes you into a private chat or a direct transfer',
              fr: 'Vous pousse vers une messagerie privée ou un virement direct'
            }
          ],
          rightTitle: {
            zh: '正常通知常见特征',
            en: 'Common signs of a legitimate notice',
            fr: 'Signes fréquents d’un avis légitime'
          },
          rightItems: [
            {
              zh: '给出可以独立核实的官方渠道',
              en: 'Points to an official channel you can check independently',
              fr: 'Indique un canal officiel que vous pouvez vérifier vous-même'
            },
            {
              zh: '从不索要验证码和口令',
              en: 'Never asks for verification codes or passwords',
              fr: 'Ne demande jamais de code ni de mot de passe'
            },
            {
              zh: '允许你按自己的节奏处理',
              en: 'Lets you deal with it at your own pace',
              fr: 'Vous laisse traiter la demande à votre rythme'
            }
          ]
        },
        {
          kind: 'p',
          text: {
            zh: '很多社工消息都走同一条链：先收集信息，再建立信任，最后提出要求。链条上任意一步被核实打断，攻击就进行不下去。',
            en: 'Most social-engineering messages follow one chain: collect information, build trust, then make the request. Break any link with a verification, and the attack stops.',
            fr: 'La plupart des messages d’ingénierie sociale suivent une même chaîne : collecter l’information, gagner la confiance, puis formuler la demande. Cassez un maillon par une vérification et l’attaque s’arrête.'
          }
        },
        {
          kind: 'list',
          ordered: true,
          items: [
            {
              zh: '先离开对方设定的节奏：挂断或暂不回复。',
              en: 'Step out of the pace they set: hang up or wait before replying.',
              fr: 'Sortez du rythme imposé : raccrochez ou attendez avant de répondre.'
            },
            {
              zh: '用官网或官方 App 公布的号码回拨核实，不用对方给的号码。',
              en: 'Call back on the number published on the official website or app, never the one they gave you.',
              fr: 'Rappelez le numéro publié sur le site ou l’application officielle, jamais celui qu’on vous donne.'
            },
            {
              zh: '验证码、口令、远程控制授权一律不给，对方再急也不例外。',
              en: 'Never share a verification code, password or remote-control access, however urgent they sound.',
              fr: 'Ne communiquez jamais un code, un mot de passe ou un accès à distance, même si l’urgence est invoquée.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: {
            zh: '越紧急越要慢',
            en: 'The more urgent it sounds, the slower you go',
            fr: 'Plus c’est urgent, plus il faut ralentir'
          },
          text: {
            zh: '可以直说「我先核实一下再回你」，然后走官方渠道。这句话本身就是一道很好的防线。',
            en: 'Say “let me verify first and get back to you”, then use an official channel. That sentence alone is a solid line of defence.',
            fr: 'Dites simplement « je vérifie d’abord et je vous rappelle », puis passez par un canal officiel. Cette phrase est déjà une bonne défense.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '下一课我们拆解一段新的可疑来电与私信，看四类钩子和三步攻击链怎样一步步浮出来。',
            en: 'Next we break down a new suspicious call and private message, and watch the four hooks and the three-step chain surface step by step.',
            fr: 'Ensuite, nous décomposons un nouvel appel et un message privé suspects, pour voir apparaître pas à pas les quatre accroches et la chaîne en trois étapes.'
          }
        }
      ]
    },
    {
      type: 'example',
      id: 'example',
      title: {
        zh: '拆解一段新的可疑消息',
        en: 'Break down a new suspicious message',
        fr: 'Analyser un nouveau message suspect'
      },
      minutes: 6,
      intro: {
        zh: '下面是一段虚构的来电与私信组合。我们按「背景 → 钩子 → 要求 → 核实」四步走。',
        en: 'Here is a fictional combination of a phone call and a private message. We go through four steps: background, hook, request, verification.',
        fr: 'Voici une combinaison fictive d’un appel et d’un message privé. Nous suivons quatre étapes : contexte, accroche, demande, vérification.'
      },
      steps: [
        {
          title: { zh: '看背景', en: 'Read the background', fr: 'Lire le contexte' },
          body: {
            zh: '来电者自称「学院教务」，一开口就能说出你的姓名、专业和刚选的课。这些信息可能来自公开资料，不能证明身份。',
            en: 'The caller claims to be from the faculty office and immediately knows your name, your major and the course you just picked. That information may be public and does not prove identity.',
            fr: 'L’appelant se présente comme le service de scolarité et connaît d’emblée votre nom, votre filière et le cours que vous venez de choisir. Ces informations peuvent être publiques et ne prouvent pas son identité.'
          }
        },
        {
          title: { zh: '找钩子', en: 'Spot the hooks', fr: 'Repérer les accroches' },
          body: {
            zh: '紧接着是压力：「奖学金材料下午 5 点前不确认就作废。」这是紧迫加权威的组合，目的就是让你没时间核实。',
            en: 'Then comes the pressure: “your scholarship file is cancelled unless you confirm before 5 p.m.” That is urgency plus authority, designed to leave you no time to verify.',
            fr: 'Vient ensuite la pression : « votre dossier de bourse est annulé si vous ne confirmez pas avant 17 h ». C’est de l’urgence combinée à de l’autorité, faite pour vous empêcher de vérifier.'
          }
        },
        {
          title: { zh: '看要求', en: 'Look at the request', fr: 'Examiner la demande' },
          body: {
            zh: '对方要求加私人微信，并把手机刚收到的验证码发过去「帮忙确认」。验证码等于一次性钥匙，这一步必须停。',
            en: 'The caller asks you to add a private messaging account and forward the verification code that just arrived, “to help confirm”. A code is a one-time key: this is where you stop.',
            fr: 'L’appelant demande d’ajouter une messagerie privée et de transmettre le code de vérification qui vient d’arriver, « pour aider à confirmer ». Un code est une clé à usage unique : c’est ici qu’il faut s’arrêter.'
          }
        },
        {
          title: { zh: '独立核实', en: 'Verify independently', fr: 'Vérifier soi-même' },
          body: {
            zh: '挂断，用学院官网公布的教务电话回拨，再登录学校系统查看是否有待办。结果：系统里没有这条通知，确认是诈骗。',
            en: 'Hang up, call the faculty office back on the number published on its official site, and log into the university system to check for pending tasks. Result: no such notice exists — it was a scam.',
            fr: 'Raccrochez, rappelez le service de scolarité au numéro publié sur son site officiel, puis connectez-vous au système de l’université pour vérifier les tâches en attente. Résultat : aucun avis de ce type — c’était une arnaque.'
          }
        }
      ],
      closing: {
        zh: '四步就是一条检查线：他用了哪类钩子？他在要什么？我能不能用独立渠道核实？',
        en: 'The four steps form a checklist: which hook did they use? What are they asking for? Can I verify it through an independent channel?',
        fr: 'Les quatre étapes forment une liste de contrôle : quelle accroche a-t-il utilisée ? Que demande-t-il ? Puis-je vérifier par un canal indépendant ?'
      }
    },
    {
      type: 'practice',
      id: 'practice',
      title: {
        zh: '练习：识别三类社工手法',
        en: 'Practice: spotting three social-engineering moves',
        fr: 'Exercices : repérer trois procédés d’ingénierie sociale'
      },
      minutes: 8,
      intro: {
        zh: '三题都是场景判断；答错时先回看题目里的线索。',
        en: 'All three are scenario judgements; if you miss one, re-read the clues in the prompt.',
        fr: 'Les trois questions sont des jugements de situation ; en cas d’erreur, relisez les indices de l’énoncé.'
      },
      questions: [
        {
          kind: 'choice',
          id: 'm5-q1',
          prompt: {
            zh: '一封邮件自称「图书馆管理员」，说你的借阅权限即将冻结，要求你点链接登录并确认学号和口令。这最先触发哪类社工钩子？',
            en: 'An email claims to be from the “library administrator”: your borrowing rights are about to be frozen, and you should follow a link, log in and confirm your student ID and password. Which hooks does it use first?',
            fr: 'Un courriel prétend venir de « l’administration de la bibliothèque » : votre droit d’emprunt va être suspendu, il faut suivre un lien, se connecter et confirmer votre identifiant et votre mot de passe. Quelles accroches sont utilisées en premier ?'
          },
          options: [
            {
              id: 'a',
              label: { zh: '好奇', en: 'Curiosity', fr: 'Curiosité' }
            },
            {
              id: 'b',
              label: { zh: '求助', en: 'A plea for help', fr: 'Appel à l’aide' }
            },
            {
              id: 'c',
              label: { zh: '紧迫 + 权威', en: 'Urgency + authority', fr: 'Urgence + autorité' }
            },
            {
              id: 'd',
              label: { zh: '好奇 + 求助', en: 'Curiosity + a plea for help', fr: 'Curiosité + appel à l’aide' }
            }
          ],
          correct: 'c',
          explanation: {
            zh: '「即将冻结」制造时间压力（紧迫），「图书馆管理员」借用身份（权威）；索要口令更说明它不是正常流程。',
            en: '“About to be frozen” creates time pressure (urgency), and “library administrator” borrows authority. Asking for a password shows it is not a normal process.',
            fr: '« Va être suspendu » crée une pression de temps (urgence), et « administration de la bibliothèque » emprunte l’autorité. Demander un mot de passe prouve que le processus n’est pas normal.'
          }
        },
        {
          kind: 'choice',
          id: 'm5-q2',
          prompt: {
            zh: '同学在群里私聊你：「我手机丢了，帮我收个验证码发我，急！」下面哪种回应最安全？',
            en: 'A classmate messages you privately: “I lost my phone — receive the code for me and send it over, it’s urgent!” Which reply is safest?',
            fr: 'Un camarade vous écrit en privé : « J’ai perdu mon téléphone, reçois le code et envoie-le moi, c’est urgent ! » Quelle réponse est la plus sûre ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '不转发验证码，换一个独立渠道联系本人核实',
                en: 'Do not forward the code; contact the person through an independent channel to verify',
                fr: 'Ne pas transmettre le code ; joindre la personne par un canal indépendant pour vérifier'
              }
            },
            {
              id: 'b',
              label: {
                zh: '立刻转发，同学有急事',
                en: 'Forward it right away — your classmate is in trouble',
                fr: 'Le transmettre tout de suite — le camarade a un problème urgent'
              }
            },
            {
              id: 'c',
              label: {
                zh: '先问「你是谁」，只要对方答对就发',
                en: 'Ask “who is this?” and send it if the answer is right',
                fr: 'Demander « qui es-tu ? » et l’envoyer si la réponse est correcte'
              }
            },
            {
              id: 'd',
              label: {
                zh: '把验证码截图发到群里，让大家一起确认',
                en: 'Screenshot the code into the group chat so everyone can check',
                fr: 'Envoyer une capture du code dans le groupe pour que tout le monde vérifie'
              }
            }
          ],
          correct: 'a',
          explanation: {
            zh: '验证码等于一次性钥匙，转发出去对方就可能登录你的账号。要在原对话之外换渠道核实，而不是继续在被设计的对话里回答。',
            en: 'A verification code is a one-time key: forward it and someone may log into your account. Verify outside the original conversation instead of answering inside the staged chat.',
            fr: 'Un code de vérification est une clé à usage unique : le transmettre permet de se connecter à votre compte. Vérifiez en dehors de la conversation d’origine au lieu de répondre dans le scénario imposé.'
          }
        },
        {
          kind: 'text',
          id: 'm5-q3',
          prompt: {
            zh: '社工消息常用四类钩子。除了权威、紧迫、好奇，第四类是什么？（填一个词）',
            en: 'Social-engineering messages usually use four hooks. Besides authority, urgency and curiosity, what is the fourth? (One word.)',
            fr: 'Les messages d’ingénierie sociale utilisent quatre accroches. Outre l’autorité, l’urgence et la curiosité, quelle est la quatrième ? (Un mot.)'
          },
          placeholder: {
            zh: '填一个词',
            en: 'One word',
            fr: 'Un mot'
          },
          accept: {
            zh: ['求助', '求助类', '假求助', '求助型'],
            en: ['help', 'a help request', 'help request', 'request for help', 'asking for help'],
            fr: ['demande d’aide', 'demande daide', 'demande d aide', 'aide', 'appel à l’aide', 'appel a l’aide']
          },
          explanation: {
            zh: '第四类是求助：冒充遇到麻烦的同学、同事或家人，用同情心换取账号、验证码或转账。',
            en: 'The fourth is a plea for help: pretending to be a classmate, colleague or relative in trouble, using sympathy to obtain an account, a code or money.',
            fr: 'La quatrième est l’appel à l’aide : se faire passer pour un camarade, un collègue ou un proche en difficulté et exploiter la compassion pour obtenir un compte, un code ou de l’argent.'
          }
        }
      ]
    },
    {
      type: 'game',
      id: 'game',
      title: {
        zh: '实战：社会工程学重建',
        en: 'Field exercise: reconstructing a password',
        fr: 'Défi : reconstituer un mot de passe'
      },
      minutes: 10,
      intro: {
        zh: '真实关卡给出一份被泄露的社交资料和一条口令模式：先读模式，再为每个空位取一个词，最后按顺序直接相连。前两次答错不扣分，会给出方向提示。',
        en: 'The real stage gives you a leaked social profile and a password pattern: read the pattern, pick one word for each slot, then join them in order. Your first two wrong answers are free and come with a direction hint.',
        fr: 'Le vrai défi fournit un profil social divulgué et un motif de mot de passe : lisez le motif, choisissez un mot par case, puis concaténez-les dans l’ordre. Vos deux premières erreurs sont gratuites et donnent un indice d’orientation.'
      },
      enigmaKey: 'social_eng',
      stage: 5,
      mode: 'guided'
    }
  ],
  glossary: [
    {
      id: 'm5-social-engineering',
      term: { zh: '社会工程学', en: 'Social engineering', fr: 'Ingénierie sociale' },
      definition: {
        zh: '用说服、冒充或压力让人主动交出信息或权限，而不是直接攻击系统。',
        en: 'Using persuasion, impersonation or pressure to make people hand over information or access, instead of attacking the system directly.',
        fr: 'Utiliser la persuasion, l’usurpation ou la pression pour faire livrer des informations ou des accès, au lieu d’attaquer le système directement.'
      }
    },
    {
      id: 'm5-pretexting',
      term: { zh: '虚构身份', en: 'Pretexting', fr: 'Prétexte' },
      definition: {
        zh: '编造一个可信的身份或理由，比如「教务处」「IT 支持」，用来接近目标。',
        en: 'Inventing a credible identity or reason — for example “the faculty office” or “IT support” — to get close to a target.',
        fr: 'Inventer une identité ou un motif crédible — par exemple « le service de scolarité » ou « le support informatique » — pour approcher une cible.'
      }
    },
    {
      id: 'm5-phishing',
      term: { zh: '钓鱼邮件', en: 'Phishing email', fr: 'Courriel d’hameçonnage' },
      definition: {
        zh: '冒充可信机构发送消息，诱导你点链接或填写账号口令。',
        en: 'A message that impersonates a trusted organisation to make you click a link or enter your credentials.',
        fr: 'Un message qui usurpe une organisation de confiance pour vous faire cliquer ou saisir vos identifiants.'
      }
    },
    {
      id: 'm5-verification-code',
      term: { zh: '验证码', en: 'Verification code', fr: 'Code de vérification' },
      definition: {
        zh: '一次性短数字，等于临时钥匙；任何正规机构都不会向你索要。',
        en: 'A short one-time number that works like a temporary key; no legitimate organisation will ask you for it.',
        fr: 'Un court numéro à usage unique qui vaut clé temporaire ; aucune organisation légitime ne vous le demandera.'
      }
    },
    {
      id: 'm5-callback-verification',
      term: { zh: '回拨核实', en: 'Callback verification', fr: 'Contre-appel' },
      definition: {
        zh: '挂断后用官方渠道公布的号码重新联系，避免使用对方提供的联系方式。',
        en: 'Hanging up and calling back on a number published by the official channel, never a contact provided by the caller.',
        fr: 'Raccrocher puis rappeler un numéro publié par le canal officiel, jamais un contact fourni par l’appelant.'
      }
    }
  ]
};

export default module;
