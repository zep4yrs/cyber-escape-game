import type { Module } from '../types';

const module: Module = {
  id: 'passwords',
  order: 1,
  code: 'M-01',
  title: {
    zh: '口令与认证',
    en: 'Passwords and authentication',
    fr: 'Mots de passe et authentification'
  },
  subtitle: {
    zh: '先学会做一把别人猜不到的钥匙',
    en: 'Learn to make a key nobody can guess',
    fr: 'Apprenez à fabriquer une clé que personne ne devine'
  },
  description: {
    zh: '账号被盗，多数时候不是黑客多厉害，而是口令太弱、到处复用或规则被猜中。本模块讲清口令是怎么被破解的，再动手练一次「按规则派生口令」，最后进入实战关卡。',
    en: 'Most account takeovers do not need a clever hacker: weak, reused or predictable passwords are enough. This module shows how passwords get cracked, how to build safely, and ends with a real challenge.',
    fr: 'La plupart des piratages de comptes ne demandent pas un génie : un mot de passe faible, réutilisé ou prévisible suffit. Ce module montre comment les mots de passe sont cassés, comment les construire autrement, et se termine par un défi réel.'
  },
  outcomes: [
    {
      zh: '判断一个口令是弱还是强，并说出理由。',
      en: 'Judge whether a password is weak or strong, and explain why.',
      fr: 'Juger si un mot de passe est faible ou solide, et expliquer pourquoi.'
    },
    {
      zh: '用密码管理器和双因素认证保护自己的账号。',
      en: 'Protect your accounts with a password manager and two-factor authentication.',
      fr: 'Protéger vos comptes avec un gestionnaire de mots de passe et l’authentification à deux facteurs.'
    },
    {
      zh: '把一个「按规则派生口令」的小任务从头做完。',
      en: 'Complete a small password-derivation task from start to finish.',
      fr: 'Mener à bien un petit exercice de dérivation de mot de passe.'
    }
  ],
  estimatedMinutes: 35,
  icon: 'password',
  lessons: [
    {
      type: 'concept',
      id: 'concept',
      title: {
        zh: '口令为什么会失守',
        en: 'Why passwords fail',
        fr: 'Pourquoi les mots de passe cèdent'
      },
      minutes: 8,
      objectives: [
        {
          zh: '说出三种最常见的弱口令来源。',
          en: 'Name the three most common sources of weak passwords.',
          fr: 'Citer les trois sources les plus fréquentes de mots de passe faibles.'
        },
        {
          zh: '分清「难记住」和「难猜中」不是一回事。',
          en: 'Tell apart "hard to remember" and "hard to guess".',
          fr: 'Distinguer « difficile à retenir » et « difficile à deviner ».'
        },
        {
          zh: '知道双因素认证补上了哪一环。',
          en: 'Explain which gap two-factor authentication closes.',
          fr: 'Expliquer quelle faille comble l’authentification à deux facteurs.'
        }
      ],
      blocks: [
        {
          kind: 'lead',
          text: {
            zh: '先记住一句话：口令的安全来自「猜不到」，不是来自「看起来复杂」。',
            en: 'One sentence first: a password is safe because it is unguessable, not because it looks complicated.',
            fr: 'Une phrase d’abord : un mot de passe est sûr parce qu’il est impossible à deviner, pas parce qu’il paraît compliqué.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '你在校园系统注册账号，提示要求「至少 8 位，包含大写字母和符号」。于是很多人用 Summer2016! 这种刚好达标的口令。攻击者也知道这条规则，字典里早就收录了这种形状的组合。',
            en: 'You sign up for a campus service and the form asks for "at least 8 characters, one capital, one symbol". Many people type something like Summer2016! and meet the rule exactly. Attackers know that rule too, and dictionaries already contain this shape of password.',
            fr: 'Vous créez un compte sur un service du campus et le formulaire demande « au moins 8 caractères, une majuscule, un symbole ». Beaucoup tapent alors un mot de passe du type Summer2016! qui respecte la règle à la lettre. Les attaquants connaissent cette règle, et les dictionnaires contiennent déjà ce genre de combinaison.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '拆开看，强口令只需要满足四件事。',
            en: 'A strong password really only has to do four things.',
            fr: 'Un mot de passe solide doit simplement remplir quatre conditions.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '足够长：长度每增加一位，暴力猜测的难度就成倍上升。',
              en: 'Be long enough: every extra character multiplies the difficulty of guessing.',
              fr: 'Être assez long : chaque caractère supplémentaire multiplie la difficulté d’une devinette.'
            },
            {
              zh: '不带可预测规则：姓名、生日、年份、键盘顺序都能被字典覆盖。',
              en: 'Avoid predictable rules: names, birthdays, years and keyboard patterns are all covered by dictionaries.',
              fr: 'Éviter les règles prévisibles : noms, dates, années et suites de clavier figurent dans les dictionnaires.'
            },
            {
              zh: '不复用：一个网站泄露，撞库就会用同一个口令去试你的其他账号。',
              en: 'Never reuse: when one site leaks, credential stuffing replays the same password on your other accounts.',
              fr: 'Ne jamais réutiliser : quand un site fuit, le bourrage d’identifiants rejoue le même mot de passe ailleurs.'
            },
            {
              zh: '再加一层：双因素认证要求第二个凭证，光有口令还不够登录。',
              en: 'Add a layer: two-factor authentication asks for a second proof, so a password alone cannot log in.',
              fr: 'Ajouter une couche : l’authentification à deux facteurs exige une seconde preuve, le mot de passe seul ne suffit plus.'
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
            zh: '「有大写和符号」不等于强。Summer2016! 满足复杂度要求，却能被「单词 + 年份 + 符号」的规则直接命中。复杂度规则只是最低门槛，不是安全证明。',
            en: '"It has capitals and symbols" does not mean strong. Summer2016! passes the complexity rule, yet a "word + year + symbol" rule finds it immediately. Complexity rules are a minimum bar, not proof of safety.',
            fr: '« Il contient des majuscules et des symboles » ne veut pas dire solide. Summer2016! respecte la règle, mais une règle « mot + année + symbole » le trouve tout de suite. La complexité est un minimum, pas une preuve de sécurité.'
          }
        },
        {
          kind: 'compare',
          leftTitle: {
            zh: '看起来复杂，其实好猜',
            en: 'Looks complex, easy to guess',
            fr: 'Complexe en apparence, facile à deviner'
          },
          leftItems: [
            {
              zh: 'Summer2016! 这类「单词 + 年份 + 符号」。',
              en: 'Patterns like Summer2016! (word + year + symbol).',
              fr: 'Des formes comme Summer2016! (mot + année + symbole).'
            },
            {
              zh: '名字拼音加生日，或 qwerty123 这类键盘顺序。',
              en: 'A name plus a birthday, or keyboard runs such as qwerty123.',
              fr: 'Un prénom suivi d’une date, ou des suites de clavier comme qwerty123.'
            },
            {
              zh: '在多个网站重复使用的同一个口令。',
              en: 'The same password reused across several sites.',
              fr: 'Le même mot de passe réutilisé sur plusieurs sites.'
            }
          ],
          rightTitle: {
            zh: '看起来朴素，其实难猜',
            en: 'Looks plain, hard to guess',
            fr: 'Simple en apparence, difficile à deviner'
          },
          rightItems: [
            {
              zh: '由密码管理器生成的 20 位随机字符。',
              en: 'A 20-character random string generated by a password manager.',
              fr: 'Une chaîne aléatoire de 20 caractères générée par un gestionnaire de mots de passe.'
            },
            {
              zh: '四个随机单词组成的长口令（passphrase），长度足够。',
              en: 'A passphrase made of four random words — long enough to resist guessing.',
              fr: 'Une phrase de passe de quatre mots aléatoires, assez longue pour résister.'
            }
          ]
        },
        {
          kind: 'p',
          text: {
            zh: '拿到一个口令，先问三个问题：它是不是由公开信息拼出来的？是不是能在字典里找到？是不是在别的网站也用过？只要有一个「是」，就当作它已经泄露。',
            en: 'When you meet a password, ask three questions: was it assembled from public facts? would it appear in a dictionary? has it been used elsewhere? If any answer is yes, treat it as already leaked.',
            fr: 'Face à un mot de passe, posez trois questions : est-il assemblé à partir d’informations publiques ? figure-t-il dans un dictionnaire ? a-t-il déjà servi ailleurs ? Si une réponse est oui, considérez-le comme déjà fuité.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '用密码管理器生成 16 位以上的随机口令，每个账号都不一样。',
              en: 'Let a password manager generate random passwords of 16+ characters, different for every account.',
              fr: 'Laissez un gestionnaire de mots de passe générer des mots de passe aléatoires de 16 caractères ou plus, différents pour chaque compte.'
            },
            {
              zh: '只记住一个强主口令，其余交给管理器保管。',
              en: 'Remember one strong master password and let the manager hold the rest.',
              fr: 'Retenez un seul mot de passe principal solide et confiez le reste au gestionnaire.'
            },
            {
              zh: '重要账号（邮箱、校园系统、支付）一律打开双因素认证。',
              en: 'Turn on two-factor authentication for important accounts: email, campus systems, payments.',
              fr: 'Activez l’authentification à deux facteurs sur les comptes importants : messagerie, systèmes du campus, paiements.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'tip',
          text: {
            zh: '可迁移的一条：不要把「记住口令」当目标，把「管好口令」当目标。你只需要记住一个主口令，其余交给工具。',
            en: 'One habit to keep: aim to manage passwords, not to memorise them. You only need one master password; the tool handles the rest.',
            fr: 'Une habitude à garder : visez à gérer les mots de passe, pas à les mémoriser. Un seul mot de passe principal suffit, l’outil gère le reste.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '下一课，我们用一个普通单词完整走一遍「编号 → 取位 → 对调 → 接年份」的派生方法。',
            en: 'In the next lesson we run the whole derivation method on a plain word: number it, take positions, swap two letters, add a year.',
            fr: 'Dans la leçon suivante, nous appliquons la méthode complète à un mot ordinaire : numéroter, extraire des positions, échanger deux lettres, ajouter une année.'
          }
        }
      ]
    },
    {
      type: 'example',
      id: 'example',
      title: {
        zh: '跟我走一遍：从基准词到完整口令',
        en: 'Worked example: from a base word to a full password',
        fr: 'Exemple guidé : d’un mot de base au mot de passe complet'
      },
      minutes: 6,
      intro: {
        zh: '下面用单词 WORKSTATION 演示四步：编号、取奇数位、对调两位、接年份。例子和实战关卡不同，方法一样。',
        en: 'We use the word WORKSTATION to walk through four steps: number it, take the odd positions, swap two letters, add a year. Different data from the challenge, same method.',
        fr: 'Nous prenons le mot WORKSTATION pour dérouler quatre étapes : numéroter, prendre les positions impaires, échanger deux lettres, ajouter une année. Les données diffèrent du défi, la méthode est la même.'
      },
      steps: [
        {
          title: {
            zh: '抄下来，逐位编号',
            en: 'Copy it and number the letters',
            fr: 'Recopier et numéroter'
          },
          body: {
            zh: '把 WORKSTATION 抄到纸上，从左到右标号：W1 O2 R3 K4 S5 T6 A7 T8 I9 O10 N11。在纸上编号，比在屏幕上数更不容易错。',
            en: 'Copy WORKSTATION onto paper and number it from the left: W1 O2 R3 K4 S5 T6 A7 T8 I9 O10 N11. Numbering on paper is less error-prone than counting on screen.',
            fr: 'Recopiez WORKSTATION sur papier et numérotez de gauche à droite : W1 O2 R3 K4 S5 T6 A7 T8 I9 O10 N11. Numéroter sur papier évite les erreurs de comptage à l’écran.'
          }
        },
        {
          title: {
            zh: '取出奇数位字母',
            en: 'Take the odd-position letters',
            fr: 'Prendre les lettres des positions impaires'
          },
          body: {
            zh: '从第 1 位开始隔一位取一个，得到 W、R、S、A、I、N，按原顺序写成一列。',
            en: 'Take every other letter starting at letter 1: W, R, S, A, I, N. Write them in one column, keeping their order.',
            fr: 'Prenez une lettre sur deux à partir de la 1re : W, R, S, A, I, N. Écrivez-les dans une colonne, en gardant l’ordre.'
          }
        },
        {
          title: {
            zh: '按规则对调两位',
            en: 'Swap the two letters the rule names',
            fr: 'Échanger les deux lettres demandées'
          },
          body: {
            zh: '规则要求交换提取结果的第 4、5 位，这里是 A 和 I。交换后得到 W、R、S、I、A、N。',
            en: 'The rule asks to swap the 4th and 5th extracted letters — here A and I. After the swap we get W, R, S, I, A, N.',
            fr: 'La règle demande d’échanger les 4e et 5e lettres extraites, ici A et I. Après l’échange : W, R, S, I, A, N.'
          }
        },
        {
          title: {
            zh: '接上年份，检查格式',
            en: 'Add the year and check the format',
            fr: 'Ajouter l’année et vérifier le format'
          },
          body: {
            zh: '把 4 位年份 2016 直接接在末尾：WRSIAN2016。检查一下：6 个字母 + 4 位数字，中间没有空格。',
            en: 'Append the 4-digit year 2016: WRSIAN2016. Check the format: six letters plus four digits, no spaces.',
            fr: 'Ajoutez l’année 2016 sur quatre chiffres : WRSIAN2016. Vérifiez le format : six lettres puis quatre chiffres, sans espace.'
          }
        }
      ],
      closing: {
        zh: '换一个单词自己再走一遍。然后想一想：如果攻击者已经知道这条规则，这个方法还安全吗？',
        en: 'Run it once more with another word. Then ask: if an attacker already knows this rule, is the result still safe?',
        fr: 'Refaites l’exercice avec un autre mot. Puis demandez-vous : si l’attaquant connaît déjà cette règle, le résultat est-il encore sûr ?'
      }
    },
    {
      type: 'practice',
      id: 'practice',
      title: {
        zh: '练一练：判断与迁移',
        en: 'Practice: judge and transfer',
        fr: 'Exercices : juger et transposer'
      },
      minutes: 8,
      intro: {
        zh: '三小题：两道选择，一道填空。答错会告诉你往哪看，不会直接给答案。',
        en: 'Three questions: two multiple choice and one short answer. Wrong answers point you in the right direction.',
        fr: 'Trois questions : deux choix multiples et une réponse courte. Une erreur vous indique la piste, sans donner la réponse.'
      },
      questions: [
        {
          kind: 'choice',
          id: 'm1-q1',
          prompt: {
            zh: '下面哪一个口令最危险？',
            en: 'Which of these passwords is the most dangerous?',
            fr: 'Lequel de ces mots de passe est le plus dangereux ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '由密码管理器生成的 20 位随机字符',
                en: 'A 20-character random string from a password manager',
                fr: 'Une chaîne aléatoire de 20 caractères issue d’un gestionnaire'
              }
            },
            {
              id: 'b',
              label: {
                zh: 'Summer2016!',
                en: 'Summer2016!',
                fr: 'Summer2016!'
              }
            },
            {
              id: 'c',
              label: {
                zh: '四个随机单词组成的长口令',
                en: 'A long passphrase made of four random words',
                fr: 'Une longue phrase de passe de quatre mots aléatoires'
              }
            },
            {
              id: 'd',
              label: {
                zh: '一串 16 位随机数字',
                en: 'A random 16-digit number',
                fr: 'Un nombre aléatoire de 16 chiffres'
              }
            }
          ],
          correct: 'b',
          explanation: {
            zh: 'Summer2016! 是「单词 + 年份 + 符号」的典型形状，字典和规则会优先尝试；它只是看起来符合复杂度要求。',
            en: 'Summer2016! follows the classic word + year + symbol pattern, so dictionaries and rule-based cracking try it first. It only looks complex.',
            fr: 'Summer2016! suit le schéma classique mot + année + symbole : les dictionnaires et les attaques par règles l’essaient en premier. Il ne fait que paraître complexe.'
          }
        },
        {
          kind: 'text',
          id: 'm1-q2',
          prompt: {
            zh: '对单词 ORBIT 取第 1、3、5 位字母（从 1 开始数），连起来是什么？',
            en: 'Take letters 1, 3 and 5 of the word ORBIT (counting from 1). What do you get?',
            fr: 'Prenez les lettres 1, 3 et 5 du mot ORBIT (en comptant à partir de 1). Qu’obtenez-vous ?'
          },
          placeholder: {
            zh: '填三个大写字母',
            en: 'Three capital letters',
            fr: 'Trois lettres majuscules'
          },
          accept: ['OBT'],
          explanation: {
            zh: 'O(1) R(2) B(3) I(4) T(5)，第 1、3、5 位是 O、B、T，连起来是 OBT。这就是「按位取字母」的手感。',
            en: 'O(1) R(2) B(3) I(4) T(5); positions 1, 3 and 5 give O, B and T, so the result is OBT. That is the feel of position-based extraction.',
            fr: 'O(1) R(2) B(3) I(4) T(5) ; les positions 1, 3 et 5 donnent O, B et T, donc OBT. C’est le geste de l’extraction par position.'
          }
        },
        {
          kind: 'choice',
          id: 'm1-q3',
          prompt: {
            zh: '你的口令已经在别的网站泄露了。哪一项最能在这种情况下保护你？',
            en: 'Your password has already leaked on another site. Which measure protects you best in that situation?',
            fr: 'Votre mot de passe a déjà fuité sur un autre site. Quelle mesure vous protège le mieux dans ce cas ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '开启双因素认证（2FA）',
                en: 'Turn on two-factor authentication (2FA)',
                fr: 'Activer l’authentification à deux facteurs (2FA)'
              }
            },
            {
              id: 'b',
              label: {
                zh: '每个月改一次口令',
                en: 'Change the password once a month',
                fr: 'Changer le mot de passe chaque mois'
              }
            },
            {
              id: 'c',
              label: {
                zh: '把口令改短一点，方便记住',
                en: 'Make the password shorter and easier to remember',
                fr: 'Raccourcir le mot de passe pour le retenir'
              }
            },
            {
              id: 'd',
              label: {
                zh: '把口令写在电脑旁的纸条上',
                en: 'Write the password on a note next to the computer',
                fr: 'Écrire le mot de passe sur un papier près de l’ordinateur'
              }
            }
          ],
          correct: 'a',
          explanation: {
            zh: '2FA 要求第二个凭证；即使攻击者拿到了口令，也会被第二道检查挡住。定期更换有意义，但不能替代 2FA。',
            en: '2FA demands a second proof: even with the password, the attacker is stopped by the second check. Rotating passwords helps but cannot replace 2FA.',
            fr: 'La 2FA exige une seconde preuve : même avec le mot de passe, l’attaquant est arrêté par le second contrôle. Changer régulièrement aide, mais ne remplace pas la 2FA.'
          }
        }
      ]
    },
    {
      type: 'game',
      id: 'game',
      title: {
        zh: '实战：被截获的管理员口令',
        en: 'Field exercise: the intercepted administrator password',
        fr: 'Défi : le mot de passe administrateur intercepté'
      },
      minutes: 10,
      intro: {
        zh: '用真实关卡检验这一模块：题面给出几条通信碎片，要求还原管理员口令。共 5 次尝试，前两次答错不扣分。',
        en: 'Test this module on a real challenge: a few intercepted messages, and one administrator password to rebuild. Five attempts; the first two wrong answers cost nothing.',
        fr: 'Mettez ce module à l’épreuve dans un vrai défi : quelques messages interceptés, un mot de passe administrateur à reconstituer. Cinq essais ; les deux premières erreurs ne coûtent rien.'
      },
      enigmaKey: 'pwd_intercept',
      stage: 1,
      mode: 'guided'
    }
  ],
  glossary: [
    {
      id: 'm1-password',
      term: { zh: '口令', en: 'Password', fr: 'Mot de passe' },
      definition: {
        zh: '用来证明「你是你」的一串字符。长度和随机性比复杂度规则更重要。',
        en: 'A string of characters that proves you are you. Length and randomness matter more than complexity rules.',
        fr: 'Une suite de caractères qui prouve que vous êtes bien vous. La longueur et le hasard comptent plus que les règles de complexité.'
      }
    },
    {
      id: 'm1-2fa',
      term: {
        zh: '双因素认证（2FA）',
        en: 'Two-factor authentication (2FA)',
        fr: 'Authentification à deux facteurs (2FA)'
      },
      definition: {
        zh: '登录时要求第二个凭证（如手机验证码或安全密钥），口令泄露后仍能挡住攻击者。',
        en: 'A login that also asks for a second proof, such as a phone code or a security key, so a leaked password is not enough.',
        fr: 'Une connexion qui demande une seconde preuve, comme un code sur téléphone ou une clé de sécurité : un mot de passe fuité ne suffit plus.'
      }
    },
    {
      id: 'm1-password-manager',
      term: {
        zh: '密码管理器',
        en: 'Password manager',
        fr: 'Gestionnaire de mots de passe'
      },
      definition: {
        zh: '一个替你生成、保存和填充随机口令的工具，你只需要记住主口令。',
        en: 'A tool that generates, stores and fills random passwords for you; you only remember the master password.',
        fr: 'Un outil qui génère, stocke et remplit des mots de passe aléatoires à votre place ; vous ne retenez que le mot de passe principal.'
      }
    },
    {
      id: 'm1-passphrase',
      term: { zh: '长口令（passphrase）', en: 'Passphrase', fr: 'Phrase de passe' },
      definition: {
        zh: '由几个随机单词连成的长口令，比短而复杂的字符组合更好记也更难猜。',
        en: 'A long password made of several random words: easier to remember than short complex strings, and harder to guess.',
        fr: 'Un long mot de passe fait de plusieurs mots aléatoires : plus facile à retenir qu’une suite courte et complexe, et plus difficile à deviner.'
      }
    }
  ]
};

export default module;
