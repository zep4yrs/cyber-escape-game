import type { Module } from '../types';

const module: Module = {
  id: 'cipher',
  order: 3,
  code: 'M-03',
  title: {
    zh: '古典密码与编码',
    en: 'Classical ciphers and encoding',
    fr: 'Chiffrements classiques et encodage'
  },
  subtitle: {
    zh: '看懂变换规则，再亲手还原一段文字',
    en: 'Understand a transformation rule, then reverse it by hand',
    fr: 'Comprendre une règle de transformation, puis l’inverser à la main'
  },
  description: {
    zh: '编码只是换一种写法，加密才需要钥匙。这一模块从字母编号讲到 ROT-13，带你看清两者的区别，并亲手算一遍。',
    en: 'Encoding just changes how data is written; encryption needs a key. This module moves from letter numbering to ROT-13, shows the difference, and ends with hand calculation.',
    fr: 'L’encodage change seulement l’écriture ; le chiffrement exige une clé. Ce module va de la numérotation des lettres à ROT-13, montre la différence et se termine par un calcul à la main.'
  },
  outcomes: [
    {
      zh: '区分编码与加密，并说出判断依据。',
      en: 'Tell encoding from encryption, and say what the difference is based on.',
      fr: 'Distinguer encodage et chiffrement, et expliquer sur quoi repose la différence.'
    },
    {
      zh: '手算 ROT-13，理解「平移 13 位」为什么可逆。',
      en: 'Perform ROT-13 by hand and explain why a 13-place shift is reversible.',
      fr: 'Calculer ROT-13 à la main et expliquer pourquoi un décalage de 13 est réversible.'
    },
    {
      zh: '说清为什么 ROT-13 这类固定替换不能保护秘密。',
      en: 'Explain why fixed substitutions such as ROT-13 cannot protect a secret.',
      fr: 'Expliquer pourquoi une substitution fixe comme ROT-13 ne protège aucun secret.'
    }
  ],
  estimatedMinutes: 35,
  icon: 'cipher',
  lessons: [
    {
      type: 'concept',
      id: 'concept',
      title: {
        zh: '编码、加密与 ROT-13',
        en: 'Encoding, encryption and ROT-13',
        fr: 'Encodage, chiffrement et ROT-13'
      },
      minutes: 8,
      objectives: [
        {
          zh: '用自己的话说出编码和加密的区别。',
          en: 'Explain the difference between encoding and encryption in your own words.',
          fr: 'Expliquer la différence entre encodage et chiffrement avec vos propres mots.'
        },
        {
          zh: '知道凯撒密码和 ROT-13 是怎么平移字母的。',
          en: 'Describe how the Caesar cipher and ROT-13 shift letters.',
          fr: 'Décrire comment le chiffre de César et ROT-13 décalent les lettres.'
        },
        {
          zh: '判断一段「乱码」大概是哪一类变换。',
          en: 'Guess which kind of transformation produced a "garbled" string.',
          fr: 'Deviner quel type de transformation a produit une chaîne « illisible ».'
        }
      ],
      blocks: [
        {
          kind: 'lead',
          text: {
            zh: '这一课要分清两件常被混为一谈的事：编码是换写法，加密是让别人读不懂。',
            en: 'This lesson separates two things people often confuse: encoding changes how data is written, encryption makes it unreadable to others.',
            fr: 'Cette leçon sépare deux choses souvent confondues : l’encodage change l’écriture, le chiffrement empêche les autres de lire.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '你看到一串「看起来像乱码」的字符，它可能是编码后的数据，也可能是加密后的密文。判断方式不同：编码的规则是公开的，任何人都能还原；加密需要钥匙。',
            en: 'A string that looks like gibberish may be encoded data or encrypted ciphertext. The test is different: encoding rules are public, so anyone can reverse them; encryption needs a key.',
            fr: 'Une chaîne qui semble illisible peut être des données encodées ou un texte chiffré. Le test diffère : les règles d’encodage sont publiques, donc réversibles par tous ; le chiffrement exige une clé.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '先把四种常见变换分开，后面就不会混。',
            en: 'Separate four common transformations first, and the rest becomes clearer.',
            fr: 'Séparez d’abord quatre transformations courantes, le reste deviendra plus clair.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '编码（encoding）把数据换成另一种表示，规则公开，任何人都能还原。',
              en: 'Encoding rewrites data in another representation with public rules, reversible by anyone.',
              fr: 'L’encodage réécrit les données dans une autre représentation avec des règles publiques, réversible par tous.'
            },
            {
              zh: '加密（encryption）用钥匙把数据变成密文，没有钥匙很难还原。',
              en: 'Encryption turns data into ciphertext with a key; without the key it is hard to reverse.',
              fr: 'Le chiffrement transforme les données en texte chiffré avec une clé ; sans elle, difficile de revenir en arrière.'
            },
            {
              zh: '凯撒密码把每个字母沿字母表平移固定位数，平移 13 位就是 ROT-13。',
              en: 'The Caesar cipher shifts every letter by a fixed number of places; shifting by 13 gives ROT-13.',
              fr: 'Le chiffre de César décale chaque lettre d’un nombre fixe de places ; un décalage de 13 donne ROT-13.'
            },
            {
              zh: 'ROT-13 只有 26 种可能的平移，而且加密与解密是同一个操作，不能用来保护秘密。',
              en: 'ROT-13 has only 26 possible shifts, and encryption equals decryption, so it cannot protect a secret.',
              fr: 'ROT-13 n’a que 26 décalages possibles, et chiffrer revient à déchiffrer : il ne protège aucun secret.'
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
            zh: '「看起来像乱码」不等于「加密了」。先找线索：它是不是字母编号、是不是平移、是不是某种公开编码？判断错类型，后面的路就走偏了。',
            en: '"It looks like garbage" does not mean "it is encrypted". Look for clues: letter numbering, a fixed shift, a public encoding? Pick the wrong category and you go the wrong way.',
            fr: '« Ça a l’air illisible » ne veut pas dire « c’est chiffré ». Cherchez des indices : numérotation, décalage fixe, encodage public ? La mauvaise catégorie mène au mauvais chemin.'
          }
        },
        {
          kind: 'table',
          data: {
            caption: {
              zh: '四种变换对照',
              en: 'Four transformations compared',
              fr: 'Quatre transformations comparées'
            },
            head: [
              { zh: '方式', en: 'Method', fr: 'Méthode' },
              { zh: '需要钥匙吗', en: 'Needs a key?', fr: 'Clé nécessaire ?' },
              { zh: '例子', en: 'Example', fr: 'Exemple' }
            ],
            mono: true,
            rows: [
              [
                { zh: '字母编号（A=1…Z=26）', en: 'Letter numbering (A=1…Z=26)', fr: 'Numérotation des lettres (A=1…Z=26)' },
                { zh: '不需要', en: 'No', fr: 'Non' },
                { zh: 'C = 3', en: 'C = 3', fr: 'C = 3' }
              ],
              [
                { zh: 'ROT-13 平移', en: 'ROT-13 shift', fr: 'Décalage ROT-13' },
                { zh: '不需要（规则公开）', en: 'No (public rule)', fr: 'Non (règle publique)' },
                { zh: 'N ↔ A', en: 'N ↔ A', fr: 'N ↔ A' }
              ],
              [
                { zh: 'Base64 编码', en: 'Base64 encoding', fr: 'Encodage Base64' },
                { zh: '不需要', en: 'No', fr: 'Non' },
                { zh: '文本变成字母数字串', en: 'Text becomes an alphanumeric string', fr: 'Le texte devient une chaîne alphanumérique' }
              ],
              [
                { zh: '现代加密算法', en: 'Modern encryption', fr: 'Chiffrement moderne' },
                { zh: '需要', en: 'Yes', fr: 'Oui' },
                { zh: '没有钥匙几乎无法还原', en: 'Without the key it is practically irreversible', fr: 'Sans la clé, presque irréversible' }
              ]
            ]
          }
        },
        {
          kind: 'compare',
          leftTitle: {
            zh: '编码（encoding）',
            en: 'Encoding',
            fr: 'Encodage'
          },
          leftItems: [
            {
              zh: '规则公开，不需要钥匙。',
              en: 'Public rule, no key required.',
              fr: 'Règle publique, aucune clé requise.'
            },
            {
              zh: '目的是方便传输或存储。',
              en: 'The goal is easier transport or storage.',
              fr: 'Le but est un transport ou un stockage plus simple.'
            },
            {
              zh: '任何人都能还原。',
              en: 'Anyone can reverse it.',
              fr: 'Tout le monde peut l’inverser.'
            }
          ],
          rightTitle: {
            zh: '加密（encryption）',
            en: 'Encryption',
            fr: 'Chiffrement'
          },
          rightItems: [
            {
              zh: '需要钥匙或口令。',
              en: 'Requires a key or password.',
              fr: 'Exige une clé ou un mot de passe.'
            },
            {
              zh: '目的是保密。',
              en: 'The goal is confidentiality.',
              fr: 'Le but est la confidentialité.'
            },
            {
              zh: '没有钥匙很难还原。',
              en: 'Without the key it is hard to reverse.',
              fr: 'Sans la clé, difficile de l’inverser.'
            }
          ]
        },
        {
          kind: 'p',
          text: {
            zh: '拿到一段陌生文本，先做两个判断：它是不是换了表示方式？如果是字母替换，平移的位数是不是固定的？这两问能帮你排除大半错误方向。',
            en: 'Faced with an unknown string, make two checks: does it simply use another representation? If letters are substituted, is the shift fixed? These two questions rule out most wrong paths.',
            fr: 'Face à une chaîne inconnue, deux vérifications : s’agit-il d’une autre représentation ? Si des lettres sont remplacées, le décalage est-il fixe ? Cela élimine la plupart des fausses pistes.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: '先找线索：字母表平移、编号方式、字符集。',
              en: 'Look for clues first: a letter shift, a numbering scheme, a character set.',
              fr: 'Cherchez d’abord des indices : décalage, numérotation, jeu de caractères.'
            },
            {
              zh: '手算时把字母表写在纸上，逐字母对照。',
              en: 'When computing by hand, write the alphabet on paper and check letter by letter.',
              fr: 'Pour un calcul à la main, écrivez l’alphabet sur papier et vérifiez lettre par lettre.'
            },
            {
              zh: '判断它是否真的在保护秘密：规则公开的变换都不是加密。',
              en: 'Ask whether it truly protects a secret: a transformation with public rules is not encryption.',
              fr: 'Demandez si cela protège vraiment un secret : une transformation à règle publique n’est pas un chiffrement.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'tip',
          text: {
            zh: '可迁移的一条：听到「加密」这个词，先问一句——钥匙在哪里？没有密钥管理的「加密」，通常只是编码或固定替换。',
            en: 'One habit to keep: when you hear "encrypted", ask where the key is. Without key management, it is usually encoding or a fixed substitution.',
            fr: 'Une habitude : quand on dit « chiffré », demandez où est la clé. Sans gestion de clé, c’est souvent un encodage ou une substitution fixe.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '下一课，我们用一个新单词完整走一遍字母编号和 ROT-13。',
            en: 'Next, we run letter numbering and ROT-13 on a fresh word, step by step.',
            fr: 'Ensuite, nous appliquons la numérotation et ROT-13 à un nouveau mot, étape par étape.'
          }
        }
      ]
    },
    {
      type: 'example',
      id: 'example',
      title: {
        zh: '手算一遍：编号与 ROT-13',
        en: 'Worked example: numbering and ROT-13 by hand',
        fr: 'Exemple guidé : numérotation et ROT-13 à la main'
      },
      minutes: 6,
      intro: {
        zh: '我们拿单词 NETWORK 做两步演示：先按 A=1…Z=26 换成数字，再做 ROT-13 平移。数据与实战关卡不同，方法一样。',
        en: 'We use the word NETWORK for two demonstrations: first number the letters with A=1…Z=26, then apply ROT-13. Different data from the challenge, same method.',
        fr: 'Nous prenons le mot NETWORK pour deux démonstrations : d’abord la numérotation A=1…Z=26, puis ROT-13. Données différentes du défi, méthode identique.'
      },
      steps: [
        {
          title: {
            zh: '先换成字母编号',
            en: 'Number the letters',
            fr: 'Numéroter les lettres'
          },
          body: {
            zh: 'A=1、B=2……Z=26，于是 NETWORK 变成 14-5-20-23-15-18-11。把数字按顺序写成一串，方便检查。',
            en: 'With A=1, B=2 … Z=26, NETWORK becomes 14-5-20-23-15-18-11. Write the numbers in one line so you can check them.',
            fr: 'Avec A=1, B=2 … Z=26, NETWORK devient 14-5-20-23-15-18-11. Écrivez les nombres sur une ligne pour pouvoir vérifier.'
          }
        },
        {
          title: {
            zh: '确认它是编码',
            en: 'Confirm it is encoding',
            fr: 'Vérifier qu’il s’agit d’un encodage'
          },
          body: {
            zh: '任何人都能按同一张字母表把 14-5-20-23-15-18-11 换回 NETWORK，不需要任何钥匙。所以这一步是编码，不是加密。',
            en: 'Anyone with the same alphabet can turn 14-5-20-23-15-18-11 back into NETWORK, with no key at all. This step is encoding, not encryption.',
            fr: 'Avec le même alphabet, n’importe qui retransforme 14-5-20-23-15-18-11 en NETWORK, sans aucune clé. C’est un encodage, pas un chiffrement.'
          }
        },
        {
          title: {
            zh: '再做 ROT-13 平移',
            en: 'Apply the ROT-13 shift',
            fr: 'Appliquer le décalage ROT-13'
          },
          body: {
            zh: '每个字母向后平移 13 位，越过 Z 就回到 A：N→A、E→R、T→G、W→J、O→B、R→E、K→X，得到 ARGJBEX。',
            en: 'Shift every letter 13 places, wrapping from Z back to A: N→A, E→R, T→G, W→J, O→B, R→E, K→X. The result is ARGJBEX.',
            fr: 'Décalez chaque lettre de 13 places, en repartant de A après Z : N→A, E→R, T→G, W→J, O→B, R→E, K→X. On obtient ARGJBEX.'
          }
        },
        {
          title: {
            zh: '验证可逆',
            en: 'Check that it reverses',
            fr: 'Vérifier la réversibilité'
          },
          body: {
            zh: '对 ARGJBEX 再做一次 ROT-13，会回到 NETWORK。因为 13+13=26，加密和解密是同一个动作。',
            en: 'Apply ROT-13 again to ARGJBEX and you get NETWORK back. Since 13+13=26, encryption and decryption are the same action.',
            fr: 'Appliquez à nouveau ROT-13 à ARGJBEX et vous retrouvez NETWORK. Comme 13+13=26, chiffrer et déchiffrer sont le même geste.'
          }
        }
      ],
      closing: {
        zh: '记住这两个结果：14-5-20-23-15-18-11 是编码，ARGJBEX 是 ROT-13 密文。两种变换都不需要钥匙，所以都不能保护秘密。',
        en: 'Keep both results in mind: 14-5-20-23-15-18-11 is encoding, ARGJBEX is ROT-13 ciphertext. Neither needs a key, so neither protects a secret.',
        fr: 'Retenez les deux résultats : 14-5-20-23-15-18-11 est un encodage, ARGJBEX est un texte chiffré en ROT-13. Aucun ne demande de clé, donc aucun ne protège un secret.'
      }
    },
    {
      type: 'practice',
      id: 'practice',
      title: {
        zh: '练一练：分清编码、加密与换算',
        en: 'Practice: tell encoding, encryption and shifts apart',
        fr: 'Exercices : distinguer encodage, chiffrement et décalages'
      },
      minutes: 8,
      intro: {
        zh: '两道选择加一道换算填空。动手算一遍，比只看答案记得牢。',
        en: 'Two multiple-choice questions and one short calculation. Doing the work beats reading the answer.',
        fr: 'Deux choix multiples et un court calcul. Faire le travail vaut mieux que lire la réponse.'
      },
      questions: [
        {
          kind: 'choice',
          id: 'm3-q1',
          prompt: {
            zh: '下面哪一种做法属于「加密」？',
            en: 'Which of these is encryption?',
            fr: 'Laquelle de ces opérations est un chiffrement ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '把字母按 A=1…Z=26 换成数字',
                en: 'Replace letters with numbers using A=1…Z=26',
                fr: 'Remplacer les lettres par des nombres selon A=1…Z=26'
              }
            },
            {
              id: 'b',
              label: {
                zh: '把图片转成 JPG 格式',
                en: 'Convert an image to JPG format',
                fr: 'Convertir une image au format JPG'
              }
            },
            {
              id: 'c',
              label: {
                zh: '用只有你和收件人知道的钥匙把文件变成乱码',
                en: 'Scramble a file with a key that only you and the recipient know',
                fr: 'Brouiller un fichier avec une clé connue de vous et du destinataire seulement'
              }
            },
            {
              id: 'd',
              label: {
                zh: '把文字保存成 CSV 文件',
                en: 'Save text as a CSV file',
                fr: 'Enregistrer du texte dans un fichier CSV'
              }
            }
          ],
          correct: 'c',
          explanation: {
            zh: '判断标准是「需不需要钥匙」。a、b、d 都是公开规则下的编码或格式转换；只有 c 需要钥匙，属于加密。',
            en: 'The test is whether a key is needed. Options a, b and d are encoding or format conversion under public rules; only c needs a key, so it is encryption.',
            fr: 'Le critère est la clé. a, b et d relèvent d’un encodage ou d’une conversion à règles publiques ; seule c exige une clé, donc c’est un chiffrement.'
          }
        },
        {
          kind: 'text',
          id: 'm3-q2',
          prompt: {
            zh: '把单词 HELLO 做 ROT-13（每个字母后移 13 位），得到什么？',
            en: 'Apply ROT-13 to the word HELLO (shift every letter 13 places). What do you get?',
            fr: 'Appliquez ROT-13 au mot HELLO (décaler chaque lettre de 13 places). Qu’obtenez-vous ?'
          },
          placeholder: {
            zh: '填五个大写字母',
            en: 'Five capital letters',
            fr: 'Cinq lettres majuscules'
          },
          accept: ['URYYB'],
          explanation: {
            zh: 'H→U、E→R、L→Y、L→Y、O→B，连起来是 URYYB。对 URYYB 再做一次会回到 HELLO，验证了「同一个操作」。',
            en: 'H→U, E→R, L→Y, L→Y, O→B, giving URYYB. Applying ROT-13 again returns HELLO, which proves it is one single operation.',
            fr: 'H→U, E→R, L→Y, L→Y, O→B, ce qui donne URYYB. Appliquer ROT-13 à nouveau redonne HELLO : c’est bien une seule opération.'
          }
        },
        {
          kind: 'choice',
          id: 'm3-q3',
          prompt: {
            zh: '为什么 ROT-13 不能用来保护真正的秘密？',
            en: 'Why can ROT-13 not protect a real secret?',
            fr: 'Pourquoi ROT-13 ne peut-il pas protéger un vrai secret ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '因为它会让文件变大',
                en: 'Because it makes files larger',
                fr: 'Parce qu’il agrandit les fichiers'
              }
            },
            {
              id: 'b',
              label: {
                zh: '因为它只有 26 种可能的平移，而且规则完全公开',
                en: 'Because it has only 26 possible shifts and the rule is public',
                fr: 'Parce qu’il n’a que 26 décalages possibles et que la règle est publique'
              }
            },
            {
              id: 'c',
              label: {
                zh: '因为它需要一把很长的钥匙',
                en: 'Because it needs a very long key',
                fr: 'Parce qu’il exige une très longue clé'
              }
            },
            {
              id: 'd',
              label: {
                zh: '因为它只能处理英文',
                en: 'Because it only handles English',
                fr: 'Parce qu’il ne traite que l’anglais'
              }
            }
          ],
          correct: 'b',
          explanation: {
            zh: '固定平移没有任何秘密参数：攻击者把 26 种平移都试一遍就行。真正的加密要有难以穷举的钥匙空间。',
            en: 'A fixed shift has no secret parameter: an attacker just tries all 26 shifts. Real encryption needs a key space too large to enumerate.',
            fr: 'Un décalage fixe n’a aucun paramètre secret : l’attaquant essaie les 26 décalages. Un vrai chiffrement a un espace de clés impossible à épuiser.'
          }
        }
      ]
    },
    {
      type: 'game',
      id: 'game',
      title: {
        zh: '实战：改写版凯撒密码',
        en: 'Field exercise: a modified Caesar cipher',
        fr: 'Défi : un chiffre de César modifié'
      },
      minutes: 10,
      intro: {
        zh: '题面给出一段 ROT-13 密文，解出恢复密钥。共 5 次尝试，前两次答错不扣分。',
        en: 'The challenge gives you a ROT-13 ciphertext; decrypt it to recover the restoration key. Five attempts; the first two mistakes cost nothing.',
        fr: 'Le défi fournit un texte chiffré en ROT-13 : déchiffrez-le pour retrouver la clé de restauration. Cinq essais ; les deux premières erreurs ne coûtent rien.'
      },
      enigmaKey: 'rot13',
      stage: 3,
      mode: 'guided'
    }
  ],
  glossary: [
    {
      id: 'm3-encoding',
      term: { zh: '编码', en: 'Encoding', fr: 'Encodage' },
      definition: {
        zh: '把数据换成另一种表示方式，规则公开、不需要钥匙，任何人都能还原。',
        en: 'Rewriting data in another representation with public rules; no key needed, anyone can reverse it.',
        fr: 'Réécrire des données dans une autre représentation avec des règles publiques ; sans clé, tout le monde peut inverser.'
      }
    },
    {
      id: 'm3-encryption',
      term: { zh: '加密', en: 'Encryption', fr: 'Chiffrement' },
      definition: {
        zh: '用钥匙把数据变成密文，没有钥匙就很难还原，目的是保密。',
        en: 'Turning data into ciphertext with a key so that it is hard to reverse without that key; the goal is confidentiality.',
        fr: 'Transformer des données en texte chiffré avec une clé, difficile à inverser sans elle ; le but est la confidentialité.'
      }
    },
    {
      id: 'm3-caesar',
      term: { zh: '凯撒密码', en: 'Caesar cipher', fr: 'Chiffre de César' },
      definition: {
        zh: '把每个字母沿字母表平移固定位数的替换密码，平移位数就是规则参数。',
        en: 'A substitution cipher that shifts every letter by a fixed number of places; that number is the rule.',
        fr: 'Un chiffre de substitution qui décale chaque lettre d’un nombre fixe de places ; ce nombre est la règle.'
      }
    },
    {
      id: 'm3-rot13',
      term: { zh: 'ROT-13', en: 'ROT-13', fr: 'ROT-13' },
      definition: {
        zh: '平移 13 位的凯撒密码。因 13+13=26，加密和解密是同一个操作，不能用来保密。',
        en: 'A Caesar shift of 13. Because 13+13=26, encryption and decryption are the same operation, so it cannot keep a secret.',
        fr: 'Un décalage de César de 13. Comme 13+13=26, chiffrer et déchiffrer sont le même geste : il ne garde aucun secret.'
      }
    },
    {
      id: 'm3-ciphertext',
      term: { zh: '密文', en: 'Ciphertext', fr: 'Texte chiffré' },
      definition: {
        zh: '加密之后得到的内容；与之相对的是明文，也就是加密前的原始内容。',
        en: 'The result of encryption; the opposite is plaintext, the original content before encryption.',
        fr: 'Le résultat du chiffrement ; à l’opposé, le texte clair est le contenu d’origine avant chiffrement.'
      }
    }
  ]
};

export default module;
