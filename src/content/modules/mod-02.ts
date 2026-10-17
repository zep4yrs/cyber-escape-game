import type { Module } from '../types';

const module: Module = {
  id: 'email',
  order: 2,
  code: 'M-02',
  title: {
    zh: '邮件与钓鱼',
    en: 'Email and phishing',
    fr: 'Courriels et hameçonnage'
  },
  subtitle: {
    zh: '看清一封信到底是谁寄来的',
    en: 'See who actually sent that email',
    fr: 'Voir qui a vraiment envoyé ce courriel'
  },
  description: {
    zh: '钓鱼邮件每天都在发生，靠的不是高明技术，而是让你来不及细看。本模块教你三眼法：看域名、看链接、看语气，再动手拆解一封可疑邮件。',
    en: 'Phishing emails keep arriving, and they work not through clever technology but by rushing you. This module teaches three checks — domain, link, tone — then walks through a suspicious email.',
    fr: 'Les courriels d’hameçonnage arrivent chaque jour, et ils réussissent moins par la technique que parce qu’ils vous pressent. Ce module enseigne trois vérifications — domaine, lien, ton — puis décortique un courriel suspect.'
  },
  outcomes: [
    {
      zh: '用「域名、链接、语气」三眼法快速判断一封邮件。',
      en: 'Judge an email quickly with three checks: domain, link and tone.',
      fr: 'Juger un courriel rapidement avec trois vérifications : domaine, lien et ton.'
    },
    {
      zh: '说清 SPF 与 DKIM 能验证什么、不能验证什么。',
      en: 'Explain what SPF and DKIM can and cannot prove.',
      fr: 'Expliquer ce que SPF et DKIM peuvent prouver, et ce qu’ils ne peuvent pas.'
    },
    {
      zh: '正确处理可疑邮件：不点链接、上报、删除。',
      en: 'Handle a suspicious email correctly: no clicking, report it, delete it.',
      fr: 'Traiter correctement un courriel suspect : ne pas cliquer, le signaler, le supprimer.'
    }
  ],
  estimatedMinutes: 35,
  icon: 'mail',
  lessons: [
    {
      type: 'concept',
      id: 'concept',
      title: {
        zh: '钓鱼邮件为什么容易得手',
        en: 'Why phishing emails work',
        fr: 'Pourquoi l’hameçonnage fonctionne'
      },
      minutes: 8,
      objectives: [
        {
          zh: '说出钓鱼邮件最常用的三个伪装点。',
          en: 'Name the three most common disguises in phishing emails.',
          fr: 'Citer les trois déguisements les plus fréquents des courriels d’hameçonnage.'
        },
        {
          zh: '知道 SPF 与 DKIM 各自验证什么。',
          en: 'State what SPF and DKIM each verify.',
          fr: 'Dire ce que vérifient respectivement SPF et DKIM.'
        },
        {
          zh: '用三眼法在 30 秒内做一次初筛。',
          en: 'Run a 30-second first screening with the three checks.',
          fr: 'Faire un premier tri en 30 secondes avec les trois vérifications.'
        }
      ],
      blocks: [
        {
          kind: 'lead',
          text: {
            zh: '钓鱼邮件不攻破服务器，它攻破人：用一封看起来正常的信，让你自己交出密码。',
            en: 'Phishing does not break the server; it breaks the person: a normal-looking email gets you to hand over the password yourself.',
            fr: 'L’hameçonnage ne casse pas le serveur, il passe par la personne : un courriel d’apparence normale vous fait livrer le mot de passe vous-même.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '校园里最常见的钓鱼题材：奖学金名单、电费欠缴、账号即将停用、图书馆逾期。它们的共同点不是写得多好，而是催你马上做决定。',
            en: 'The usual campus bait: scholarship lists, unpaid bills, accounts about to be deactivated, library fines. What they share is not fine writing — it is pressure to decide right now.',
            fr: 'Les appâts classiques du campus : listes de bourses, factures impayées, comptes sur le point d’être désactivés, amendes de bibliothèque. Leur point commun n’est pas l’élégance : c’est la pression pour décider tout de suite.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '一封邮件可以拆成四层来看，每层都能伪装。',
            en: 'An email has four layers, and each one can be faked.',
            fr: 'Un courriel se découpe en quatre couches, et chacune peut être imitée.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '显示名可以随便写：它和真实发件地址是两回事。',
              en: 'The display name is free text: it is not the real sender address.',
              fr: 'Le nom affiché est libre : ce n’est pas la véritable adresse d’envoi.'
            },
            {
              zh: '看发件地址要看 @ 后面的域名，而不是前面的名字。',
              en: 'Judge the sender by the domain after @, not by the name before it.',
              fr: 'Jugez l’expéditeur par le domaine après le @, pas par le nom avant.'
            },
            {
              zh: '正文里的链接可以写成任何样子，真实地址要悬停或长按才看得到。',
              en: 'Link text can say anything; hover or long-press to see the real address.',
              fr: 'Le texte du lien peut dire n’importe quoi ; survolez ou appuyez longuement pour voir la vraie adresse.'
            },
            {
              zh: 'SPF 与 DKIM 能验证发件服务器和内容完整性，但不能保证发件人「善意」。',
              en: 'SPF and DKIM verify the sending server and integrity, but they cannot guarantee good intentions.',
              fr: 'SPF et DKIM vérifient le serveur expéditeur et l’intégrité, mais pas les bonnes intentions.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'note',
          title: {
            zh: '常见误区',
            en: 'Common misconception',
            fr: 'Idée fausse courante'
          },
          text: {
            zh: '「有公司 logo、措辞正式」不代表真实。复制一份排版，比复制一个域名容易得多。',
            en: '"It has the company logo and formal wording" proves nothing. Copying a layout is far easier than copying a domain.',
            fr: '« Il porte le logo et un ton formel » ne prouve rien. Copier une mise en page est bien plus facile que copier un domaine.'
          }
        },
        {
          kind: 'table',
          data: {
            caption: {
              zh: '三眼法速查表',
              en: 'Three-check quick reference',
              fr: 'Mémo des trois vérifications'
            },
            head: [
              { zh: '看什么', en: 'What to check', fr: 'Quoi vérifier' },
              { zh: '正常的样子', en: 'Normal', fr: 'Normal' },
              { zh: '可疑的样子', en: 'Suspicious', fr: 'Suspect' }
            ],
            rows: [
              [
                { zh: '发件域名', en: 'Sender domain', fr: 'Domaine expéditeur' },
                { zh: '@campus.edu 等官方域名', en: 'An official domain such as @campus.edu', fr: 'Un domaine officiel comme @campus.edu' },
                { zh: '多一个字母、数字替换、异常后缀', en: 'An extra letter, digit swaps, an odd ending', fr: 'Une lettre en trop, des chiffres à la place de lettres, une fin étrange' }
              ],
              [
                { zh: '链接真实地址', en: 'Real link address', fr: 'Vraie adresse du lien' },
                { zh: 'https://portal.campus.edu/... 这类校内地址', en: 'A campus address such as https://portal.campus.edu/...', fr: 'Une adresse du campus comme https://portal.campus.edu/...' },
                { zh: '短链接、拼错域名、要求忽略证书警告', en: 'Short links, misspelled domains, "ignore the certificate warning"', fr: 'Liens courts, domaines mal orthographiés, « ignorez l’avertissement de certificat »' }
              ],
              [
                { zh: '语气', en: 'Tone', fr: 'Ton' },
                { zh: '信息完整，不催你立刻操作', en: 'Complete information, no rush', fr: 'Information complète, sans urgence' },
                { zh: '限时、恐吓、要求立刻输入口令', en: 'A deadline, threats, "enter your password now"', fr: 'Une échéance, des menaces, « saisissez votre mot de passe maintenant »' }
              ],
              [
                { zh: '附件', en: 'Attachment', fr: 'Pièce jointe' },
                { zh: '你本来就在等的文件', en: 'A file you were already expecting', fr: 'Un fichier que vous attendiez' },
                { zh: '陌生压缩包、可执行文件、要求启用宏', en: 'An unknown archive, an executable, "enable macros"', fr: 'Une archive inconnue, un exécutable, « activez les macros »' }
              ]
            ]
          }
        },
        {
          kind: 'p',
          text: {
            zh: '收到邮件先做三眼：看域名、看链接、看语气。任何一眼不对，就先别点，按可疑处理。',
            en: 'Give every email three checks: domain, link, tone. If any one looks off, do not click — treat it as suspicious.',
            fr: 'Appliquez trois vérifications à chaque courriel : domaine, lien, ton. Si une seule paraît douteuse, ne cliquez pas et traitez-le comme suspect.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '不要点邮件里的登录链接，直接从官网或 App 进入。',
              en: 'Do not click login links in emails; go through the official site or app.',
              fr: 'Ne cliquez pas sur les liens de connexion des courriels ; passez par le site ou l’application officielle.'
            },
            {
              zh: '把可疑邮件转发给学校 IT 或安全邮箱，然后删除。',
              en: 'Forward the suspicious email to campus IT or the security mailbox, then delete it.',
              fr: 'Transférez le courriel suspect à l’informatique ou à la boîte sécurité du campus, puis supprimez-le.'
            },
            {
              zh: '重要账号打开双因素认证，即使口令泄露也还有一层。',
              en: 'Turn on two-factor authentication for important accounts: one more layer if the password leaks.',
              fr: 'Activez l’authentification à deux facteurs sur les comptes importants : une couche de plus si le mot de passe fuit.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'tip',
          text: {
            zh: '养成悬停看链接的习惯：鼠标停在链接上（手机上长按），状态栏会显示真实地址。练几次就会成为本能。',
            en: 'Build the hover habit: rest the pointer on a link (long-press on a phone) and the real address appears. A few repetitions make it automatic.',
            fr: 'Prenez l’habitude de survoler : laissez le pointeur sur un lien (appui long sur téléphone) et la vraie adresse s’affiche. Quelques répétitions suffisent.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '下一课，我们把一封可疑邮件拆开，用三眼法逐项判断。',
            en: 'Next, we open a suspicious email and judge it item by item with the three checks.',
            fr: 'Ensuite, nous ouvrons un courriel suspect et le jugeons point par point avec les trois vérifications.'
          }
        }
      ]
    },
    {
      type: 'example',
      id: 'example',
      title: {
        zh: '拆开一封可疑邮件',
        en: 'Taking apart a suspicious email',
        fr: 'Décortiquer un courriel suspect'
      },
      minutes: 6,
      intro: {
        zh: '下面是一封虚构邮件，域名、链接、语气、附件都值得怀疑。我们按三眼法逐项看，最后一起来定性。',
        en: 'Here is a made-up email where the domain, the link, the tone and the attachment all deserve doubt. We check them one by one, then decide.',
        fr: 'Voici un courriel fictif dont le domaine, le lien, le ton et la pièce jointe sont douteux. Nous les vérifions un à un, puis nous concluons.'
      },
      steps: [
        {
          title: {
            zh: '第一眼：发件地址',
            en: 'Check one: the sender address',
            fr: 'Vérification 1 : l’adresse'
          },
          body: {
            zh: '显示名写着「校园 IT 服务中心」，真实地址却是 it-support@campus-help.example。注意 @ 后面的 campus-help.example 并不是学校域名，显示名只是装饰。',
            en: 'The display name says "Campus IT Service Centre", but the real address is it-support@campus-help.example. The part after @ — campus-help.example — is not the campus domain; the display name is just decoration.',
            fr: 'Le nom affiché dit « Service informatique du campus », mais l’adresse réelle est it-support@campus-help.example. La partie après @ — campus-help.example — n’est pas le domaine du campus ; le nom affiché n’est qu’un décor.'
          }
        },
        {
          title: {
            zh: '第二眼：链接真实地址',
            en: 'Check two: the real link target',
            fr: 'Vérification 2 : la cible du lien'
          },
          body: {
            zh: '正文链接写着 https://portal.campus.edu/login，悬停后状态栏却显示 https://campus-login.example/verify。文字和真实地址不一致，这是最硬的破绽。',
            en: 'The link text says https://portal.campus.edu/login, but hovering reveals https://campus-login.example/verify. Text and real address disagree — the strongest clue here.',
            fr: 'Le texte du lien indique https://portal.campus.edu/login, mais le survol révèle https://campus-login.example/verify. Le texte et la vraie adresse ne concordent pas : c’est l’indice le plus net.'
          }
        },
        {
          title: {
            zh: '第三眼：语气与要求',
            en: 'Check three: tone and request',
            fr: 'Vérification 3 : le ton et la demande'
          },
          body: {
            zh: '信里说「24 小时内不验证就停用账号」，还直接要你输入口令。制造紧迫感并索要凭据，是钓鱼邮件的典型组合。',
            en: 'The email says "your account will be disabled within 24 hours unless you verify", and it asks you to type your password. Urgency plus a credential request is the classic phishing mix.',
            fr: 'Le message annonce « votre compte sera désactivé sous 24 heures si vous ne vérifiez pas », puis demande votre mot de passe. Urgence et demande d’identifiant : la combinaison classique.'
          }
        },
        {
          title: {
            zh: '补充：认证结果与附件',
            en: 'Extra: authentication and attachment',
            fr: 'Bonus : authentification et pièce jointe'
          },
          body: {
            zh: '邮件头显示 SPF: FAIL（认证失败），还带了一个名为 invoice.zip 的附件。认证失败加上陌生压缩包，可以判定为钓鱼。',
            en: 'The header shows SPF: FAIL and the message carries an attachment named invoice.zip. Failed authentication plus an unknown archive is enough to call it phishing.',
            fr: 'L’en-tête affiche SPF: FAIL et le message contient une pièce jointe nommée invoice.zip. Authentification échouée et archive inconnue suffisent à conclure à l’hameçonnage.'
          }
        }
      ],
      closing: {
        zh: '判断完不要点任何链接：转发给学校安全邮箱，然后删除。下一课，用三封短邮件做一次快速判断。',
        en: 'Once judged, click nothing: forward it to the campus security mailbox and delete it. Next, a quick judgement on three short emails.',
        fr: 'Une fois le verdict posé, ne cliquez sur rien : transférez à la boîte sécurité du campus, puis supprimez. Ensuite, un jugement rapide sur trois courts courriels.'
      }
    },
    {
      type: 'practice',
      id: 'practice',
      title: {
        zh: '练一练：三眼看邮件',
        en: 'Practice: read emails with three checks',
        fr: 'Exercices : lire un courriel avec trois vérifications'
      },
      minutes: 8,
      intro: {
        zh: '两道选择加一道填空。注意题目问的是「最能说明问题」的那一项。',
        en: 'Two multiple-choice questions and one short answer. Look for the detail that proves the most.',
        fr: 'Deux choix multiples et une réponse courte. Cherchez l’élément le plus révélateur.'
      },
      questions: [
        {
          kind: 'choice',
          id: 'm2-q1',
          prompt: {
            zh: '下面哪一项最能说明一封邮件是钓鱼？',
            en: 'Which detail most strongly indicates that an email is phishing?',
            fr: 'Quel indice révèle le plus sûrement un courriel d’hameçonnage ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '发件人显示名写着「校园 IT 中心」',
                en: 'The display name says "Campus IT Centre"',
                fr: 'Le nom affiché indique « Informatique du campus »'
              }
            },
            {
              id: 'b',
              label: {
                zh: '发件域名是 campus-portal.example，而不是 campus.edu',
                en: 'The sender domain is campus-portal.example, not campus.edu',
                fr: 'Le domaine expéditeur est campus-portal.example, et non campus.edu'
              }
            },
            {
              id: 'c',
              label: {
                zh: '主题行里没有表情符号',
                en: 'The subject line has no emoji',
                fr: 'L’objet du message ne contient pas d’emoji'
              }
            },
            {
              id: 'd',
              label: {
                zh: '邮件在上午 9 点发出',
                en: 'The email was sent at 9 a.m.',
                fr: 'Le courriel a été envoyé à 9 heures'
              }
            }
          ],
          correct: 'b',
          explanation: {
            zh: '显示名谁都能填，域名才是可核对的证据。campus-portal.example 和学校真实域名 campus.edu 不一致，这是最硬的判断依据。',
            en: 'Anyone can type a display name; the domain is checkable evidence. campus-portal.example does not match the real campus domain campus.edu — the strongest signal.',
            fr: 'Le nom affiché est libre ; le domaine, lui, se vérifie. campus-portal.example ne correspond pas au vrai domaine campus.edu : c’est la preuve la plus solide.'
          }
        },
        {
          kind: 'text',
          id: 'm2-q2',
          prompt: {
            zh: '邮件认证机制中，负责校验「发件服务器是否被该域名授权」的是哪一个？写三个字母的缩写。',
            en: 'Which email authentication check verifies that the sending server is authorised by the domain? Write the three-letter acronym.',
            fr: 'Quel mécanisme d’authentification vérifie que le serveur expéditeur est autorisé par le domaine ? Donnez le sigle de trois lettres.'
          },
          placeholder: {
            zh: '三个大写字母',
            en: 'Three capital letters',
            fr: 'Trois lettres majuscules'
          },
          accept: ['SPF'],
          explanation: {
            zh: 'SPF 校验发件服务器是否被域名授权；DKIM 则用签名证明邮件内容未被改动。两者要一起看，任何一项失败都值得警惕。',
            en: 'SPF verifies that the sending server is authorised by the domain; DKIM signs the content to prove it was not altered. Read both, and be wary if either fails.',
            fr: 'SPF vérifie que le serveur expéditeur est autorisé par le domaine ; DKIM signe le contenu pour prouver qu’il n’a pas été modifié. Lisez les deux, et méfiez-vous si l’un échoue.'
          }
        },
        {
          kind: 'choice',
          id: 'm2-q3',
          prompt: {
            zh: '收到「账号即将停用，请立即点击链接登录」的邮件，最稳妥的第一步是什么？',
            en: 'You receive "your account will be disabled — click here to log in now". What is the safest first step?',
            fr: 'Vous recevez « votre compte va être désactivé — cliquez ici pour vous connecter ». Quelle est la première étape la plus sûre ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '点开链接，看看页面做得像不像',
                en: 'Open the link and see whether the page looks right',
                fr: 'Ouvrir le lien pour voir si la page semble correcte'
              }
            },
            {
              id: 'b',
              label: {
                zh: '直接回复邮件，问对方是不是真的',
                en: 'Reply to the email and ask whether it is real',
                fr: 'Répondre au courriel pour demander si c’est authentique'
              }
            },
            {
              id: 'c',
              label: {
                zh: '不点邮件里的链接，从官网或 App 自己进入账号查看',
                en: 'Ignore the link and open the account through the official site or app',
                fr: 'Ignorer le lien et ouvrir le compte par le site ou l’application officielle'
              }
            },
            {
              id: 'd',
              label: {
                zh: '转发给同学，问他们有没有收到',
                en: 'Forward it to classmates and ask if they got it too',
                fr: 'Le transférer à des camarades pour demander s’ils l’ont reçu'
              }
            }
          ],
          correct: 'c',
          explanation: {
            zh: '自己从官方入口进入，就能绕开邮件里可能被伪造的链接，也不给对方任何回应。回复或点开都会暴露更多信息。',
            en: 'Entering through the official entry point bypasses whatever link the email controls and gives the sender no response. Replying or clicking leaks more.',
            fr: 'Passer par l’entrée officielle contourne le lien contrôlé par le message et n’offre aucune réponse à l’expéditeur. Répondre ou cliquer en dit trop.'
          }
        }
      ]
    },
    {
      type: 'game',
      id: 'game',
      title: {
        zh: '实战：八封邮件的取证',
        en: 'Field exercise: forensics on eight emails',
        fr: 'Défi : expertise de huit courriels'
      },
      minutes: 10,
      intro: {
        zh: '题面给出八封邮件的发件域名与 SPF/DKIM 结果，找出所有可疑邮件。共 5 次尝试，前两次答错不扣分。',
        en: 'The challenge lists eight emails with sender domains and SPF/DKIM results. Find every suspicious one. Five attempts; the first two mistakes cost nothing.',
        fr: 'Le défi présente huit courriels avec leurs domaines et leurs résultats SPF/DKIM. Trouvez tous les suspects. Cinq essais ; les deux premières erreurs ne coûtent rien.'
      },
      enigmaKey: 'email_forensics',
      stage: 2,
      mode: 'guided'
    }
  ],
  glossary: [
    {
      id: 'm2-phishing',
      term: {
        zh: '钓鱼邮件',
        en: 'Phishing email',
        fr: 'Courriel d’hameçonnage'
      },
      definition: {
        zh: '伪装成可信机构发来的邮件，目的是骗你点击链接或交出账号凭据。',
        en: 'An email that pretends to come from a trusted organisation in order to make you click or hand over credentials.',
        fr: 'Un courriel qui se fait passer pour un organisme de confiance afin de vous faire cliquer ou livrer vos identifiants.'
      }
    },
    {
      id: 'm2-spf',
      term: {
        zh: 'SPF（发件人策略框架）',
        en: 'SPF (Sender Policy Framework)',
        fr: 'SPF (Sender Policy Framework)'
      },
      definition: {
        zh: '一种邮件认证记录，声明哪些服务器有权代表该域名发信；发件服务器不在名单里就会失败。',
        en: 'An email authentication record listing which servers may send mail for a domain; a server outside the list fails the check.',
        fr: 'Un enregistrement d’authentification qui indique quels serveurs peuvent envoyer du courrier pour un domaine ; un serveur hors liste échoue.'
      }
    },
    {
      id: 'm2-dkim',
      term: {
        zh: 'DKIM（域名密钥识别邮件）',
        en: 'DKIM (DomainKeys Identified Mail)',
        fr: 'DKIM (DomainKeys Identified Mail)'
      },
      definition: {
        zh: '用数字签名给邮件内容盖章，收件方可以验证内容在传输中是否被伪造或改动。',
        en: 'Adds a digital signature to a message so the receiver can check whether the content was forged or altered in transit.',
        fr: 'Ajoute une signature numérique au message pour que le destinataire vérifie que le contenu n’a pas été falsifié ni modifié.'
      }
    },
    {
      id: 'm2-display-name',
      term: {
        zh: '显示名伪造',
        en: 'Display-name spoofing',
        fr: 'Usurpation du nom affiché'
      },
      definition: {
        zh: '把发件人「名字」写成可信机构，但真实地址是另一个域名；显示名本身不提供任何验证。',
        en: 'Setting the sender "name" to a trusted organisation while the real address belongs to another domain; the display name proves nothing.',
        fr: 'Afficher le « nom » d’un organisme de confiance alors que la vraie adresse appartient à un autre domaine ; le nom affiché ne prouve rien.'
      }
    }
  ]
};

export default module;
