import type { Module } from '../types';

const module: Module = {
  id: 'wifi',
  order: 4,
  code: 'M-04',
  title: {
    zh: '无线网络安全',
    en: 'Wireless Network Security',
    fr: 'Sécurité des réseaux sans fil'
  },
  subtitle: {
    zh: '连哪个 Wi-Fi，比网速更重要。',
    en: 'Which Wi-Fi you join matters more than how fast it is.',
    fr: 'Le Wi-Fi que vous rejoignez compte plus que son débit.'
  },
  description: {
    zh: '这一模块从每天都会遇到的「连哪个 Wi-Fi」讲起：开放网络暴露了什么，WEP 和 WPS 为什么不能再用，以及 WPA2、WPA3、HTTPS 与 VPN 各自能保护到哪一步。学完你会用三条线索快速审计一份无线网络清单。',
    en: 'This module starts with a daily decision: which Wi-Fi to join. You will see what an open network exposes, why WEP and WPS are no longer safe, and what WPA2, WPA3, HTTPS and a VPN can and cannot protect. By the end you can audit a list of wireless networks with three checks.',
    fr: 'Ce module part d’une décision quotidienne : quel Wi-Fi rejoindre. Vous verrez ce qu’un réseau ouvert expose, pourquoi WEP et WPS ne sont plus sûrs, et ce que WPA2, WPA3, HTTPS et un VPN protègent réellement. À la fin, vous saurez auditer une liste de réseaux avec trois vérifications.'
  },
  outcomes: [
    {
      zh: '说清开放网络、WEP 与 WPS 三类风险分别来自哪里。',
      en: 'Explain where the risks of open networks, WEP and WPS come from.',
      fr: 'Expliquer l’origine des risques des réseaux ouverts, du WEP et du WPS.'
    },
    {
      zh: '按加密方式、认证方式和出厂配置，给一份网络清单标出高风险项。',
      en: 'Flag high-risk entries in a network list by encryption, authentication and factory settings.',
      fr: 'Repérer les entrées à risque d’une liste selon le chiffrement, l’authentification et les réglages d’usine.'
    },
    {
      zh: '在公共场合用 HTTPS、VPN 和手机热点降低连接风险。',
      en: 'Reduce connection risk in public with HTTPS, a VPN and your phone hotspot.',
      fr: 'Réduire les risques en public avec HTTPS, un VPN et le partage de connexion du téléphone.'
    }
  ],
  estimatedMinutes: 35,
  icon: 'wifi',
  lessons: [
    {
      type: 'concept',
      id: 'concept',
      title: {
        zh: '连上之前，先看它怎么加密',
        en: 'Before you connect, check the encryption',
        fr: 'Avant de vous connecter, vérifiez le chiffrement'
      },
      minutes: 8,
      objectives: [
        {
          zh: '分清开放网络、WEP、WPA2、WPA3 各代表什么。',
          en: 'Tell apart open networks, WEP, WPA2 and WPA3.',
          fr: 'Distinguer les réseaux ouverts, le WEP, le WPA2 et le WPA3.'
        },
        {
          zh: '说出公共热点为什么可能被同网段的人监听。',
          en: 'Explain why a public hotspot can be monitored by people on the same network.',
          fr: 'Expliquer pourquoi un hotspot public peut être écouté par les personnes du même réseau.'
        },
        {
          zh: '记住连接陌生 Wi-Fi 前的三个检查动作。',
          en: 'Remember the three checks to run before joining an unknown Wi-Fi.',
          fr: 'Retenir les trois vérifications à faire avant de rejoindre un Wi-Fi inconnu.'
        }
      ],
      blocks: [
        {
          kind: 'lead',
          text: {
            zh: '每个校园、咖啡馆、车站都有一个「免费 Wi-Fi」。这一课解决一个问题：哪些热点可以连，哪些连上就等于把流量交给陌生人。',
            en: 'Every campus, café and station has a “free Wi-Fi”. This lesson answers one question: which hotspots are acceptable, and which ones hand your traffic to strangers.',
            fr: 'Chaque campus, café ou gare propose un « Wi-Fi gratuit ». Cette leçon répond à une question : quels hotspots sont acceptables, et lesquels livrent votre trafic à des inconnus.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '无线信号在空中广播，附近的人都能收到。加密把「谁都能收」变成「只有拿到密钥的设备能读」；没有加密，同一热点下的人就能看到你未加密的请求。',
            en: 'Wireless signals travel through the air, so anyone nearby can receive them. Encryption turns “anyone can receive” into “only devices with the key can read”. Without it, people on the same hotspot can see your unencrypted requests.',
            fr: 'Les ondes Wi-Fi se propagent dans l’air : n’importe qui à proximité peut les recevoir. Le chiffrement transforme « tout le monde peut recevoir » en « seuls les appareils qui ont la clé peuvent lire ». Sans lui, les voisins du hotspot voient vos requêtes non chiffrées.'
          }
        },
        {
          kind: 'list',
          items: [
            {
              zh: 'WEP：早期加密标准，密钥可被统计方法恢复，几分钟就可能破解。',
              en: 'WEP: an early standard; its key can be recovered statistically and cracked in minutes.',
              fr: 'WEP : ancien standard, dont la clé se récupère par analyse statistique en quelques minutes.'
            },
            {
              zh: 'WPA/WPA2：WPA2 仍广泛使用，个人版用预共享密钥，企业版用账号或证书认证。',
              en: 'WPA/WPA2: WPA2 is still widespread — personal mode uses a pre-shared key, enterprise mode uses accounts or certificates.',
              fr: 'WPA/WPA2 : le WPA2 reste répandu — mode personnel avec clé partagée, mode entreprise avec comptes ou certificats.'
            },
            {
              zh: 'WPA3：更新一代标准，改进了口令猜测防护和开放网络保护。',
              en: 'WPA3: a newer standard with better protection against password guessing and for open networks.',
              fr: 'WPA3 : standard plus récent, mieux protégé contre la devinette de mots de passe et pour les réseaux ouverts.'
            },
            {
              zh: 'OPEN：完全不加密，任何人不用口令就能连上。',
              en: 'OPEN: no encryption at all; anyone can join without a password.',
              fr: 'OPEN : aucun chiffrement ; n’importe qui se connecte sans mot de passe.'
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'note',
          title: {
            zh: '「有口令」不等于「安全」',
            en: '“Password-protected” is not “secure”',
            fr: '« Avec mot de passe » ne veut pas dire « sûr »'
          },
          text: {
            zh: '口令只决定「谁能连」，加密协议才决定「连上之后数据是否可读」。WEP 网络也可能设了复杂口令，但协议本身已经破了。',
            en: 'The password decides who may join; the encryption protocol decides whether data can be read after joining. A WEP network can have a complex password and still be broken at the protocol level.',
            fr: 'Le mot de passe décide qui peut se connecter ; le protocole de chiffrement décide si les données restent lisibles. Un réseau WEP peut avoir un mot de passe complexe et rester cassable au niveau du protocole.'
          }
        },
        {
          kind: 'table',
          data: {
            caption: {
              zh: '常见无线加密对比',
              en: 'Common wireless encryption at a glance',
              fr: 'Les chiffrements Wi-Fi courants en un coup d’œil'
            },
            head: [
              { zh: '协议', en: 'Protocol', fr: 'Protocole' },
              { zh: '状态', en: 'Status', fr: 'État' },
              { zh: '风险提示', en: 'Risk', fr: 'Risque' }
            ],
            rows: [
              [
                { zh: 'WEP', en: 'WEP', fr: 'WEP' },
                { zh: '已淘汰', en: 'Obsolete', fr: 'Obsolète' },
                { zh: '密钥可被恢复，几分钟可破解', en: 'Key recoverable, crackable in minutes', fr: 'Clé récupérable, cassable en minutes' }
              ],
              [
                { zh: 'WPA2 个人版', en: 'WPA2 Personal', fr: 'WPA2 personnel' },
                { zh: '仍可用', en: 'Usable', fr: 'Utilisable' },
                { zh: '口令弱就容易被猜中', en: 'Weak passwords are easy to guess', fr: 'Un mot de passe faible se devine' }
              ],
              [
                { zh: 'WPA2 企业版', en: 'WPA2 Enterprise', fr: 'WPA2 entreprise' },
                { zh: '较安全', en: 'Fairly safe', fr: 'Plutôt sûr' },
                { zh: '依赖账号或证书认证', en: 'Depends on account or certificate auth', fr: 'Dépend des comptes ou des certificats' }
              ],
              [
                { zh: 'WPA3', en: 'WPA3', fr: 'WPA3' },
                { zh: '推荐', en: 'Recommended', fr: 'Recommandé' },
                { zh: '改进了口令猜测防护', en: 'Better protection against guessing', fr: 'Meilleure protection contre la devinette' }
              ],
              [
                { zh: 'OPEN', en: 'OPEN', fr: 'OPEN' },
                { zh: '不安全', en: 'Unsafe', fr: 'Dangereux' },
                { zh: '完全不加密，流量可被监听', en: 'No encryption; traffic can be monitored', fr: 'Aucun chiffrement ; trafic écoutable' }
              ]
            ]
          }
        },
        {
          kind: 'p',
          text: {
            zh: '还有两个容易被忽略的入口：WPS 和出厂默认配置。WPS 的 8 位 PIN 可被暴力枚举；路由器若保留默认管理员口令和旧固件，攻击者可能直接改掉配置。',
            en: 'Two entry points are easy to miss: WPS and factory defaults. The 8-digit WPS PIN can be brute-forced; if a router keeps its default admin password and old firmware, an attacker may simply change the configuration.',
            fr: 'Deux portes d’entrée passent inaperçues : le WPS et les réglages d’usine. Le PIN WPS à 8 chiffres peut être énuméré par force brute ; si le routeur garde son mot de passe administrateur par défaut et un firmware ancien, un attaquant peut modifier sa configuration.'
          }
        },
        {
          kind: 'callout',
          tone: 'tip',
          title: {
            zh: '可以迁移到日常',
            en: 'Take this into daily life',
            fr: 'À appliquer au quotidien'
          },
          text: {
            zh: '连陌生 Wi-Fi 前做三件事：确认网络名是官方贴出的、看它是否加密、敏感操作改用手机热点或等回可信网络。',
            en: 'Before joining an unknown Wi-Fi: confirm the network name is officially posted, check that it is encrypted, and switch to your phone hotspot for anything sensitive.',
            fr: 'Avant de rejoindre un Wi-Fi inconnu : vérifiez que le nom est affiché officiellement, regardez s’il est chiffré, et passez au partage de connexion pour toute opération sensible.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: 'HTTPS 只保护你与这个网站之间的连接：地址栏有小锁不代表网站可信，它仍可能是钓鱼站。VPN 会先把流量加密送到 VPN 服务器，能挡住同网段的监听，但不会替你判断链接真假。',
            en: 'HTTPS protects only the connection between you and that website: a padlock does not make a site trustworthy, and it may still be a phishing page. A VPN encrypts your traffic to a VPN server, which blocks monitoring on the local network, but it will not judge whether a link is genuine.',
            fr: 'HTTPS ne protège que la connexion entre vous et ce site : un cadenas ne rend pas un site fiable, qui peut rester une page de phishing. Un VPN chiffre votre trafic jusqu’à un serveur VPN, ce qui bloque l’écoute sur le réseau local, mais il ne juge pas si un lien est authentique.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '下一课拿一份虚构的宿舍区扫描结果走一遍：从「加密方式、认证、配置」三列里，稳定地挑出高风险项。',
            en: 'The next lesson walks through a fictional dorm-area scan and shows how to pick high-risk entries from three columns: encryption, authentication and configuration.',
            fr: 'La leçon suivante parcourt un scan fictif de résidence et montre comment repérer les entrées à risque à partir de trois colonnes : chiffrement, authentification, configuration.'
          }
        }
      ]
    },
    {
      type: 'example',
      id: 'example',
      title: {
        zh: '走一遍：审计一份新的扫描清单',
        en: 'Walk through: auditing a new scan list',
        fr: 'Pas à pas : auditer une nouvelle liste'
      },
      minutes: 6,
      intro: {
        zh: '下面是一份虚构的宿舍区扫描结果。我们按「加密 → 认证 → 配置」三列逐行读，每一步只做一个判断。',
        en: 'Here is a fictional scan from a dorm area. We read it column by column — encryption, then authentication, then configuration — making one judgement per step.',
        fr: 'Voici un scan fictif d’une résidence. Nous le lisons colonne par colonne — chiffrement, puis authentification, puis configuration — avec un seul jugement par étape.'
      },
      steps: [
        {
          title: { zh: '扫加密方式', en: 'Scan the encryption', fr: 'Lire le chiffrement' },
          body: {
            zh: '清单有 5 个网络：Dorm-A 用 WPA2，Dorm-A-Guest 是 OPEN，Lab-Router 用 WEP，Cafeteria 用 WPA2，Old-Office 用 WEP。先圈出 OPEN 和 WEP 这几个网络。',
            en: 'The list has 5 networks: Dorm-A uses WPA2, Dorm-A-Guest is OPEN, Lab-Router uses WEP, Cafeteria uses WPA2 and Old-Office uses WEP. Circle OPEN and WEP first: Dorm-A-Guest, Lab-Router, Old-Office.',
            fr: 'La liste contient 5 réseaux : Dorm-A en WPA2, Dorm-A-Guest en OPEN, Lab-Router en WEP, Cafeteria en WPA2 et Old-Office en WEP. Entourez d’abord OPEN et WEP : Dorm-A-Guest, Lab-Router, Old-Office.'
          }
        },
        {
          title: { zh: '查认证与口令', en: 'Check authentication and passwords', fr: 'Vérifier l’authentification' },
          body: {
            zh: 'Cafeteria 虽是 WPA2，但口令贴在柜台上，还开了访客隔离和限速；Dorm-A 的口令只在宿管处登记。两者仍有加密，暂不升级为高风险。',
            en: 'Cafeteria is WPA2 but posts its password on the counter, with guest isolation and a bandwidth cap; Dorm-A keeps its password at the dorm office. Both still encrypt traffic, so they stay off the high-risk list for now.',
            fr: 'Cafeteria est en WPA2 mais affiche son mot de passe au comptoir, avec isolation des invités et débit limité ; Dorm-A garde le sien au bureau de la résidence. Les deux chiffrent encore le trafic : ils ne passent pas encore en risque élevé.'
          }
        },
        {
          title: { zh: '看默认配置', en: 'Look at default settings', fr: 'Regarder les réglages d’usine' },
          body: {
            zh: 'Lab-Router 的管理页面还是默认管理员口令，固件停在 2017 年；Old-Office 的 WPS 仍开启。这两项都能被直接利用。',
            en: 'Lab-Router still has the default admin password and firmware from 2017; Old-Office still has WPS enabled. Both can be exploited directly.',
            fr: 'Lab-Router garde le mot de passe administrateur par défaut et un firmware de 2017 ; Old-Office laisse le WPS activé. Les deux sont directement exploitables.'
          }
        },
        {
          title: { zh: '汇总去重', en: 'Merge and de-duplicate', fr: 'Fusionner et dédoublonner' },
          body: {
            zh: '高风险项是 Dorm-A-Guest（OPEN）、Old-Office（WEP + WPS）和 Lab-Router（WEP + 默认配置）。Lab-Router 命中两条线索，只记一次。',
            en: 'The high-risk entries are Dorm-A-Guest (OPEN), Old-Office (WEP + WPS) and Lab-Router (WEP + default setup). Lab-Router matches two flags but counts once.',
            fr: 'Les entrées à risque sont Dorm-A-Guest (OPEN), Old-Office (WEP + WPS) et Lab-Router (WEP + réglages d’usine). Lab-Router coche deux critères mais ne compte qu’une fois.'
          }
        }
      ],
      closing: {
        zh: '方法就是这条流水线：先扫加密，再查认证，最后看默认配置；命中的网络去重后按升序写出。',
        en: 'The method is this pipeline: scan encryption, check authentication, then look at defaults; de-duplicate the hits and write them in ascending order.',
        fr: 'La méthode est ce pipeline : chiffrement, puis authentification, puis réglages d’usine ; dédoublonnez les correspondances et notez-les par ordre croissant.'
      }
    },
    {
      type: 'practice',
      id: 'practice',
      title: {
        zh: '练习：三个无线场景',
        en: 'Practice: three wireless scenarios',
        fr: 'Exercices : trois scénarios sans fil'
      },
      minutes: 8,
      intro: {
        zh: '三题都是判断，不做计算；答错时先回看题干里的线索。',
        en: 'All three are judgement questions, no calculation. If you miss one, re-read the clues in the prompt.',
        fr: 'Les trois questions sont des jugements, sans calcul. En cas d’erreur, relisez les indices de l’énoncé.'
      },
      questions: [
        {
          kind: 'choice',
          id: 'm4-q1',
          prompt: {
            zh: '关于 WEP，下面哪一句是对的？',
            en: 'Which statement about WEP is correct?',
            fr: 'Quelle affirmation sur le WEP est correcte ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: 'WEP 仍然安全，只要口令足够长',
                en: 'WEP is still safe as long as the password is long enough',
                fr: 'Le WEP reste sûr si le mot de passe est assez long'
              }
            },
            {
              id: 'b',
              label: {
                zh: 'WEP 的密钥可被统计分析恢复，几分钟内就可能被破解',
                en: 'WEP keys can be recovered statistically and cracked within minutes',
                fr: 'La clé WEP peut être récupérée par analyse statistique et cassée en quelques minutes'
              }
            },
            {
              id: 'c',
              label: {
                zh: 'WEP 比 WPA3 更安全',
                en: 'WEP is more secure than WPA3',
                fr: 'Le WEP est plus sûr que le WPA3'
              }
            },
            {
              id: 'd',
              label: {
                zh: 'WEP 只影响下载速度，不影响安全',
                en: 'WEP only affects download speed, not security',
                fr: 'Le WEP n’affecte que le débit, pas la sécurité'
              }
            }
          ],
          correct: 'b',
          explanation: {
            zh: 'WEP 的密钥空间小、初始化向量可复用，统计攻击几分钟就能恢复密钥；换复杂口令也救不了协议本身的缺陷。',
            en: 'WEP has a small key space and reusable initialisation vectors, so statistical attacks recover the key in minutes; a stronger password cannot fix a broken protocol.',
            fr: 'Le WEP a un espace de clés réduit et des vecteurs d’initialisation réutilisables : une attaque statistique retrouve la clé en quelques minutes. Un mot de passe plus fort ne corrige pas un protocole cassé.'
          }
        },
        {
          kind: 'choice',
          id: 'm4-q2',
          prompt: {
            zh: '你在宿舍扫描到四个网络。按本课的三条线索，哪一个最可能存在问题？',
            en: 'You scan four networks in a dorm. Using this lesson’s three checks, which one is most likely to be a problem?',
            fr: 'Vous scannez quatre réseaux dans une résidence. Avec les trois vérifications de la leçon, lequel pose le plus probablement problème ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: 'Campus-5G：WPA3，随机 64 位口令',
                en: 'Campus-5G: WPA3, random 64-character password',
                fr: 'Campus-5G : WPA3, mot de passe aléatoire de 64 caractères'
              }
            },
            {
              id: 'b',
              label: {
                zh: 'Library-Study：WPA2-Enterprise，RADIUS 认证',
                en: 'Library-Study: WPA2-Enterprise, RADIUS authentication',
                fr: 'Library-Study : WPA2-Enterprise, authentification RADIUS'
              }
            },
            {
              id: 'c',
              label: {
                zh: 'Routeur-Salon：WEP，管理员口令仍是默认值',
                en: 'Routeur-Salon: WEP, admin password still the default',
                fr: 'Routeur-Salon : WEP, mot de passe administrateur par défaut'
              }
            },
            {
              id: 'd',
              label: {
                zh: 'Edu-Academic：WPA2-Enterprise，证书认证',
                en: 'Edu-Academic: WPA2-Enterprise, certificate authentication',
                fr: 'Edu-Academic : WPA2-Enterprise, authentification par certificat'
              }
            }
          ],
          correct: 'c',
          explanation: {
            zh: 'WEP 已被淘汰，加上默认管理员口令，两条线索同时命中；其余三个都使用 WPA3 或企业级认证。',
            en: 'WEP is obsolete and the admin password is still the default — two flags at once. The other three use WPA3 or enterprise authentication.',
            fr: 'Le WEP est obsolète et le mot de passe administrateur reste celui d’usine : deux signaux à la fois. Les trois autres utilisent WPA3 ou une authentification d’entreprise.'
          }
        },
        {
          kind: 'text',
          id: 'm4-q3',
          prompt: {
            zh: '清单：1 教学楼（WPA3）、2 大厅访客（OPEN）、3 实验室（WEP）、4 行政楼（WPA2-Enterprise）、5 机房（WPS 开启 + 默认管理员）。写出高风险网络的编号，按升序、用英文逗号分隔。',
            en: 'List: 1 Teaching building (WPA3), 2 Lobby guest (OPEN), 3 Lab (WEP), 4 Administration (WPA2-Enterprise), 5 Server room (WPS enabled + default admin). Write the numbers of the high-risk networks in ascending order, separated by English commas.',
            fr: 'Liste : 1 Bâtiment d’enseignement (WPA3), 2 Accueil invités (OPEN), 3 Laboratoire (WEP), 4 Administration (WPA2-Enterprise), 5 Salle serveurs (WPS activé + administrateur par défaut). Notez les numéros des réseaux à risque par ordre croissant, séparés par des virgules anglaises.'
          },
          placeholder: {
            zh: '例如 1,2',
            en: 'e.g. 1,2',
            fr: 'par ex. 1,2'
          },
          accept: ['2,3,5', '2, 3, 5', '2、3、5', '2，3，5', '235'],
          explanation: {
            zh: '2 号完全开放；3 号用 WEP；5 号同时命中 WPS 与默认管理员口令，可被直接利用。1 号和 4 号的配置可以接受。',
            en: 'No. 2 is fully open; No. 3 uses WEP; No. 5 hits both WPS and the default admin password and can be exploited directly. No. 1 and No. 4 are acceptable.',
            fr: 'Le n° 2 est entièrement ouvert ; le n° 3 utilise WEP ; le n° 5 cumule WPS actif et mot de passe administrateur par défaut, donc exploitable. Les n° 1 et 4 sont acceptables.'
          }
        }
      ]
    },
    {
      type: 'game',
      id: 'game',
      title: {
        zh: '实战：无线网络安全审计',
        en: 'Field exercise: wireless network audit',
        fr: 'Défi : audit de réseaux sans fil'
      },
      minutes: 10,
      intro: {
        zh: '真实关卡给你一份 8 个网络的扫描清单：按加密方式与关键配置，找出可被直接利用的网络，按升序、用英文逗号写出编号。前两次答错不扣分，会给出方向提示。',
        en: 'The real stage gives you a scan of 8 networks: using encryption and configuration, find the directly exploitable ones and write their numbers in ascending order. Your first two wrong answers are free and come with a direction hint.',
        fr: 'Le vrai défi fournit un scan de 8 réseaux : d’après le chiffrement et la configuration, trouvez ceux qui sont directement exploitables et notez leurs numéros par ordre croissant. Vos deux premières erreurs sont gratuites et donnent un indice d’orientation.'
      },
      enigmaKey: 'wifi_audit',
      stage: 4,
      mode: 'guided'
    }
  ],
  glossary: [
    {
      id: 'm4-wep',
      term: { zh: 'WEP', en: 'WEP', fr: 'WEP' },
      definition: {
        zh: '最早的无线加密标准之一，密钥可被统计分析恢复，现在不应再使用。',
        en: 'One of the earliest wireless encryption standards; its key can be recovered statistically and it should no longer be used.',
        fr: 'L’un des premiers standards de chiffrement Wi-Fi ; sa clé peut être récupérée par analyse statistique, il ne doit plus être utilisé.'
      }
    },
    {
      id: 'm4-wpa2',
      term: { zh: 'WPA2', en: 'WPA2', fr: 'WPA2' },
      definition: {
        zh: '广泛应用的第二代无线加密标准，分个人版（预共享密钥）与企业版（账号或证书认证）。',
        en: 'The widely deployed second-generation wireless standard, with a personal mode (pre-shared key) and an enterprise mode (accounts or certificates).',
        fr: 'Le standard sans fil de deuxième génération largement déployé, en mode personnel (clé partagée) et en mode entreprise (comptes ou certificats).'
      }
    },
    {
      id: 'm4-wpa3',
      term: { zh: 'WPA3', en: 'WPA3', fr: 'WPA3' },
      definition: {
        zh: '更新一代无线加密标准，改进了对口令猜测的防护，也加强了开放网络的保护。',
        en: 'A newer wireless standard with better protection against password guessing and stronger safeguards for open networks.',
        fr: 'Standard sans fil plus récent, mieux protégé contre la devinette de mots de passe et renforcé pour les réseaux ouverts.'
      }
    },
    {
      id: 'm4-wps',
      term: { zh: 'WPS', en: 'WPS', fr: 'WPS' },
      definition: {
        zh: '简化设备配网的按钮或 PIN 机制；PIN 可被暴力枚举，建议在路由器上关闭。',
        en: 'A push-button or PIN mechanism that simplifies pairing devices; the PIN can be brute-forced, so it should be disabled on routers.',
        fr: 'Un mécanisme de bouton ou de PIN qui simplifie l’appairage ; le PIN peut être énuméré par force brute, il faut le désactiver sur le routeur.'
      }
    },
    {
      id: 'm4-open-network',
      term: { zh: '开放网络（OPEN）', en: 'Open network (OPEN)', fr: 'Réseau ouvert (OPEN)' },
      definition: {
        zh: '不做任何加密的无线网络，同一热点下的人可能看到你的未加密流量。',
        en: 'A wireless network with no encryption; people on the same hotspot may see your unencrypted traffic.',
        fr: 'Un réseau sans fil sans aucun chiffrement ; les personnes du même hotspot peuvent voir votre trafic non chiffré.'
      }
    }
  ]
};

export default module;
