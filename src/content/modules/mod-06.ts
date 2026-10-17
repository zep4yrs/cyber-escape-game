import type { Module } from '../types';

const module: Module = {
  id: 'response',
  order: 6,
  code: 'M-06',
  title: {
    zh: '应急与反制算法',
    en: 'Incident Response and Algorithms',
    fr: 'Réponse à incident et algorithmes'
  },
  subtitle: {
    zh: '出事之后先做什么，以及如何把线索算成一条结论。',
    en: 'What to do first after an incident — and how to turn clues into a conclusion.',
    fr: 'Que faire d’abord après un incident — et comment transformer des indices en conclusion.'
  },
  description: {
    zh: '这一模块分两半：前半讲入侵迹象与应急顺序（隔离、改密、报告、留证），后半讲一种推理方法——把线索相加、取模，再查表得到结论。学完你能在慌乱时按顺序行动，也能读懂「码表 + 算法」类的题目。',
    en: 'This module has two halves. The first covers warning signs and the order of incident response: contain, change passwords, report, preserve evidence. The second covers a reasoning method: add the clues, take a remainder, then look up a table. By the end you can act in order when things go wrong, and read “code table + algorithm” puzzles.',
    fr: 'Ce module a deux parties. La première traite des signes d’intrusion et de l’ordre de la réponse : contenir, changer les mots de passe, signaler, préserver les preuves. La seconde présente une méthode de raisonnement : additionner les indices, prendre un reste, puis consulter une table. À la fin, vous saurez agir dans l’ordre et lire les énigmes « table de codes + algorithme ».'
  },
  outcomes: [
    {
      zh: '按「隔离 → 改密 → 报告 → 留证」的顺序处理疑似入侵。',
      en: 'Handle a suspected intrusion in order: contain, change passwords, report, preserve evidence.',
      fr: 'Traiter une intrusion suspectée dans l’ordre : contenir, changer les mots de passe, signaler, préserver les preuves.'
    },
    {
      zh: '把一组数值求和、取模，得到查表用的索引。',
      en: 'Sum a set of values and take a modulo to get a table index.',
      fr: 'Additionner des valeurs et calculer un modulo pour obtenir un index de table.'
    },
    {
      zh: '读懂码表题，并在结果需要还原时调用已学的编码知识。',
      en: 'Read a code-table puzzle and, when the result needs decoding, reuse your encoding knowledge.',
      fr: 'Lire une énigme à table de codes et, quand le résultat doit être décodé, réutiliser vos connaissances en encodage.'
    }
  ],
  estimatedMinutes: 35,
  icon: 'response',
  lessons: [
    {
      type: 'concept',
      id: 'concept',
      title: {
        zh: '先控制，再解释',
        en: 'Contain first, explain later',
        fr: 'D’abord contenir, ensuite expliquer'
      },
      minutes: 8,
      objectives: [
        {
          zh: '认出账号异常、文件被加密等常见入侵迹象。',
          en: 'Recognise common intrusion signs such as unusual logins and encrypted files.',
          fr: 'Reconnaître les signes courants d’intrusion, comme des connexions inhabituelles ou des fichiers chiffrés.'
        },
        {
          zh: '按隔离、改密、报告、留证的顺序处理。',
          en: 'Respond in the order: contain, change passwords, report, preserve evidence.',
          fr: 'Réagir dans l’ordre : contenir, changer les mots de passe, signaler, préserver les preuves.'
        },
        {
          zh: '用求和、取模、查表三步读懂一条算法线索。',
          en: 'Read an algorithmic clue in three steps: sum, modulo, look up.',
          fr: 'Lire un indice algorithmique en trois étapes : somme, modulo, consultation.'
        }
      ],
      blocks: [
        {
          kind: 'lead',
          text: {
            zh: '安全事件里最贵的常常不是漏洞，而是慌乱中的错误操作。这一课给你一个可以照着走的顺序。',
            en: 'In a security incident, the most expensive part is often not the vulnerability but the wrong move made in a panic. This lesson gives you an order you can follow.',
            fr: 'Lors d’un incident, le plus coûteux n’est souvent pas la faille mais la mauvaise action faite dans la panique. Cette leçon propose un ordre à suivre.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '可疑迹象包括：账号在陌生地点登录、文件突然被加密、浏览器反复跳出登录页、设备变慢且风扇常转。看到这些先别急着「研究」，先控制影响范围。',
            en: 'Warning signs include logins from unfamiliar places, files suddenly encrypted, a browser that keeps returning to a login page, and a device that is slow with the fan always on. When you see them, contain the damage before you investigate.',
            fr: 'Les signes d’alerte incluent des connexions depuis des lieux inconnus, des fichiers soudainement chiffrés, un navigateur qui renvoie sans cesse à la page de connexion, un appareil lent dont le ventilateur tourne en permanence. Dans ce cas, contenir avant d’enquêter.'
          }
        },
        {
          kind: 'steps',
          items: [
            {
              title: { zh: '隔离', en: 'Contain', fr: 'Contenir' },
              body: {
                zh: '断开网络：拔网线或关闭 Wi-Fi，先让事件停止扩散；如果还要保留内存中的证据，先别急着重启。',
                en: 'Disconnect from the network: unplug the cable or turn off Wi-Fi so the incident stops spreading; if memory evidence matters, do not restart yet.',
                fr: 'Couper le réseau : débrancher le câble ou désactiver le Wi-Fi pour arrêter la propagation ; si des preuves en mémoire comptent, ne redémarrez pas tout de suite.'
              }
            },
            {
              title: { zh: '改密', en: 'Change passwords', fr: 'Changer les mots de passe' },
              body: {
                zh: '用另一台可信设备修改重要账号的口令，并开启双因素认证；不要在疑似中毒的设备上操作。',
                en: 'From another trusted device, change the passwords of important accounts and turn on two-factor authentication; do not do this on the suspect device.',
                fr: 'Depuis un autre appareil de confiance, changez les mots de passe des comptes importants et activez l’authentification à deux facteurs ; ne le faites pas sur l’appareil suspect.'
              }
            },
            {
              title: { zh: '报告', en: 'Report', fr: 'Signaler' },
              body: {
                zh: '联系学校 IT 安全部门或平台客服，按他们给的流程处理，并告诉可能受影响的同学和老师。',
                en: 'Contact the university IT security team or the platform’s support, follow their process, and tell classmates and teachers who may be affected.',
                fr: 'Contactez l’équipe sécurité informatique de l’université ou le support de la plateforme, suivez leur procédure et prévenez les camarades et enseignants concernés.'
              }
            },
            {
              title: { zh: '留证', en: 'Preserve evidence', fr: 'Préserver les preuves' },
              body: {
                zh: '保留屏幕截图、日志和可疑文件，不要删除、不要重装系统——这些动作会破坏取证线索。',
                en: 'Keep screenshots, logs and suspicious files. Do not delete them and do not reinstall the system: those moves destroy forensic clues.',
                fr: 'Conservez captures d’écran, journaux et fichiers suspects. Ne supprimez rien et ne réinstallez pas le système : ces gestes détruisent les indices.'
              }
            }
          ]
        },
        {
          kind: 'callout',
          tone: 'warn',
          title: { zh: '不要做的事', en: 'What not to do', fr: 'Ce qu’il ne faut pas faire' },
          text: {
            zh: '不要删文件、不要重装系统、不要继续登录同一账号——这些动作会破坏取证线索，也可能惊动攻击者。',
            en: 'Do not delete files, do not reinstall the system and do not keep logging into the same account: that destroys evidence and may tip off the attacker.',
            fr: 'Ne supprimez pas de fichiers, ne réinstallez pas le système et ne continuez pas à vous connecter au même compte : cela détruit les preuves et peut alerter l’attaquant.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '另一半内容是一种推理方法。很多「算法题」其实是三步：把线索数值相加，对某个数取余（取模），再用余数去查表。',
            en: 'The other half is a reasoning method. Many “algorithm puzzles” are three steps: add the clue values, take a remainder with respect to some number (the modulo), then use that remainder to look up a table.',
            fr: 'L’autre moitié est une méthode de raisonnement. Beaucoup d’« énigmes algorithmiques » suivent trois étapes : additionner les valeurs, prendre un reste par rapport à un nombre (le modulo), puis utiliser ce reste pour consulter une table.'
          }
        },
        {
          kind: 'code',
          label: {
            zh: '算法骨架（示例数字）',
            en: 'Algorithm skeleton (sample numbers)',
            fr: 'Squelette d’algorithme (nombres d’exemple)'
          },
          code: '12 + 25 + 8 = 45\n45 mod 4 = 1\nindex 1 → code word',
          caption: {
            zh: 'mod 就是求余；余数一定小于除数。',
            en: 'mod means remainder; the remainder is always smaller than the divisor.',
            fr: 'mod signifie reste ; le reste est toujours inférieur au diviseur.'
          }
        },
        {
          kind: 'table',
          data: {
            caption: {
              zh: '同一个总和换不同除数，索引就会变',
              en: 'The same total gives a different index for each divisor',
              fr: 'Une même somme change d’index selon le diviseur'
            },
            head: [
              { zh: '总和', en: 'Total', fr: 'Somme' },
              { zh: '除数', en: 'Divisor', fr: 'Diviseur' },
              { zh: '余数（索引）', en: 'Remainder (index)', fr: 'Reste (index)' }
            ],
            rows: [
              [{ zh: '45', en: '45', fr: '45' }, { zh: '4', en: '4', fr: '4' }, { zh: '1', en: '1', fr: '1' }],
              [{ zh: '46', en: '46', fr: '46' }, { zh: '4', en: '4', fr: '4' }, { zh: '2', en: '2', fr: '2' }],
              [{ zh: '47', en: '47', fr: '47' }, { zh: '4', en: '4', fr: '4' }, { zh: '3', en: '3', fr: '3' }],
              [{ zh: '48', en: '48', fr: '48' }, { zh: '4', en: '4', fr: '4' }, { zh: '0', en: '0', fr: '0' }]
            ],
            mono: true
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
            zh: '把「先隔离再排查」用到所有突发状况：先止损，再找原因，最后复盘。顺序对了，损失通常小得多。',
            en: 'Use “contain before investigating” for any emergency: stop the damage, then find the cause, then review. Getting the order right usually makes the damage much smaller.',
            fr: 'Appliquez « contenir avant d’enquêter » à toute urgence : stopper les dégâts, puis chercher la cause, puis faire le bilan. Le bon ordre réduit généralement beaucoup les pertes.'
          }
        },
        {
          kind: 'p',
          text: {
            zh: '下一课用一组全新的数字走一遍「求和 → 取模 → 查表」，你会看到每一步该写下什么。',
            en: 'The next lesson walks through “sum → modulo → look up” with a fresh set of numbers, showing what to write down at each step.',
            fr: 'La leçon suivante parcourt « somme → modulo → consultation » avec de nouveaux nombres, en montrant ce qu’il faut noter à chaque étape.'
          }
        }
      ]
    },
    {
      type: 'example',
      id: 'example',
      title: {
        zh: '走一遍：从五个数到一条结论',
        en: 'Walk through: from five numbers to one conclusion',
        fr: 'Pas à pas : de cinq nombres à une conclusion'
      },
      minutes: 6,
      intro: {
        zh: '假设截获了五个 ASCII 值：72、65、86、69、78，对应字符 H、A、V、E、N。我们要把它们变成一个索引，再查表。',
        en: 'Suppose we captured five ASCII values: 72, 65, 86, 69 and 78, standing for H, A, V, E and N. We turn them into one index, then look it up.',
        fr: 'Supposons que nous ayons intercepté cinq valeurs ASCII : 72, 65, 86, 69 et 78, correspondant à H, A, V, E et N. Nous allons en tirer un index, puis consulter une table.'
      },
      steps: [
        {
          title: { zh: '抄下数值', en: 'Write the values down', fr: 'Noter les valeurs' },
          body: {
            zh: '五个 ASCII 值：72、65、86、69、78，逐个抄到纸上，确认没有漏项。',
            en: 'The five ASCII values are 72, 65, 86, 69 and 78. Copy them one by one onto paper and check that none is missing.',
            fr: 'Les cinq valeurs ASCII sont 72, 65, 86, 69 et 78. Recopiez-les une à une sur papier et vérifiez qu’aucune ne manque.'
          }
        },
        {
          title: { zh: '求和', en: 'Sum them', fr: 'Additionner' },
          body: {
            zh: '72 + 65 + 86 + 69 + 78 = 370。先加前两个，再逐项累加，最后复核一次。',
            en: '72 + 65 + 86 + 69 + 78 = 370. Add the first two, then add the rest one by one, and check the result once more.',
            fr: '72 + 65 + 86 + 69 + 78 = 370. Additionnez d’abord les deux premiers, puis les autres un à un, et vérifiez le résultat.'
          }
        },
        {
          title: { zh: '取模', en: 'Take the modulo', fr: 'Calculer le modulo' },
          body: {
            zh: '码表有 5 项，所以除以 5：370 ÷ 5 = 74 余 0，索引是 0。除数要跟表的长度一致。',
            en: 'The table has 5 entries, so divide by 5: 370 ÷ 5 = 74 remainder 0, which gives index 0. The divisor must match the table length.',
            fr: 'La table compte 5 entrées : divisez par 5. 370 ÷ 5 = 74 reste 0, donc l’index est 0. Le diviseur doit correspondre à la longueur de la table.'
          }
        },
        {
          title: { zh: '查表并还原', en: 'Look up and restore', fr: 'Consulter et restaurer' },
          body: {
            zh: '索引 0 的代码词是 AVON；按题面约定「倒序读取」，把它还原成 NOVA，就是这条线索的结论。',
            en: 'The code word at index 0 is AVON; applying the stated rule “read it backwards” turns it into NOVA, the conclusion of this clue.',
            fr: 'Le mot de code à l’index 0 est AVON ; en appliquant la règle « lire à l’envers », on obtient NOVA, la conclusion de cet indice.'
          }
        }
      ],
      closing: {
        zh: '题再长也一样：先求和不跳步，取模的除数看表长，最后才做还原。',
        en: 'Longer puzzles work the same way: sum without skipping steps, take the modulo using the table length, and only then restore the result.',
        fr: 'Les énigmes plus longues suivent la même logique : additionner sans sauter d’étape, prendre le modulo selon la longueur de la table, puis seulement restaurer le résultat.'
      }
    },
    {
      type: 'practice',
      id: 'practice',
      title: {
        zh: '练习：顺序与码表',
        en: 'Practice: order and code tables',
        fr: 'Exercices : ordre et tables de codes'
      },
      minutes: 8,
      intro: {
        zh: '三题分别考应急顺序、取模和查表；答错时先回看题干里的数字。',
        en: 'The three questions cover response order, modulo and table lookup. If you miss one, re-read the numbers in the prompt.',
        fr: 'Les trois questions portent sur l’ordre de réponse, le modulo et la consultation d’une table. En cas d’erreur, relisez les nombres de l’énoncé.'
      },
      questions: [
        {
          kind: 'choice',
          id: 'm6-q1',
          prompt: {
            zh: '一组线索求和为 47，码表有 5 项（索引 0 到 4）。查表用的索引是多少？',
            en: 'A clue set sums to 47 and the code table has 5 entries (indexes 0 to 4). What is the index used for the lookup?',
            fr: 'Un ensemble d’indices donne une somme de 47 et la table de codes compte 5 entrées (index 0 à 4). Quel est l’index à utiliser ?'
          },
          options: [
            { id: 'a', label: { zh: '1', en: '1', fr: '1' } },
            { id: 'b', label: { zh: '2', en: '2', fr: '2' } },
            { id: 'c', label: { zh: '3', en: '3', fr: '3' } },
            { id: 'd', label: { zh: '4', en: '4', fr: '4' } }
          ],
          correct: 'b',
          explanation: {
            zh: '47 ÷ 5 = 9 余 2，所以索引是 2；余数一定小于除数 5。',
            en: '47 ÷ 5 = 9 remainder 2, so the index is 2; the remainder is always smaller than the divisor 5.',
            fr: '47 ÷ 5 = 9 reste 2 : l’index est 2. Le reste est toujours inférieur au diviseur 5.'
          }
        },
        {
          kind: 'choice',
          id: 'm6-q2',
          prompt: {
            zh: '发现电脑疑似被入侵，下面哪个处理顺序最合理？',
            en: 'You suspect your computer has been compromised. Which order of action is most reasonable?',
            fr: 'Vous soupçonnez que votre ordinateur est compromis. Quel ordre d’action est le plus raisonnable ?'
          },
          options: [
            {
              id: 'a',
              label: {
                zh: '先重装系统，再慢慢检查原因',
                en: 'Reinstall the system first, then investigate the cause',
                fr: 'Réinstaller le système d’abord, puis chercher la cause'
              }
            },
            {
              id: 'b',
              label: {
                zh: '先删掉可疑文件，避免扩散',
                en: 'Delete suspicious files first to stop the spread',
                fr: 'Supprimer d’abord les fichiers suspects pour éviter la propagation'
              }
            },
            {
              id: 'c',
              label: {
                zh: '先断网隔离，再改密、报告并保留证据',
                en: 'Disconnect and contain first, then change passwords, report and keep evidence',
                fr: 'Couper le réseau et contenir d’abord, puis changer les mots de passe, signaler et conserver les preuves'
              }
            },
            {
              id: 'd',
              label: {
                zh: '先把作业做完，明天再处理',
                en: 'Finish your homework first and deal with it tomorrow',
                fr: 'Finir les devoirs d’abord et s’en occuper demain'
              }
            }
          ],
          correct: 'c',
          explanation: {
            zh: '先控制影响范围，再处理账号与上报，同时保留证据；重装或删文件都会破坏线索，也可能让攻击继续。',
            en: 'Contain the damage first, then handle accounts and reporting while preserving evidence. Reinstalling or deleting files destroys clues and may let the attack continue.',
            fr: 'Contenez d’abord les dégâts, puis traitez les comptes et le signalement en préservant les preuves. Réinstaller ou supprimer détruit les indices et peut laisser l’attaque continuer.'
          }
        },
        {
          kind: 'text',
          id: 'm6-q3',
          prompt: {
            zh: '一个码表有 4 项（索引 0 到 3），线索求和为 26。用 26 除以 4 取余，得到的索引是多少？只填数字。',
            en: 'A code table has 4 entries (indexes 0 to 3) and the clues sum to 26. Divide 26 by 4 and take the remainder: what is the index? Write the number only.',
            fr: 'Une table de codes compte 4 entrées (index 0 à 3) et les indices donnent une somme de 26. Divisez 26 par 4 et prenez le reste : quel est l’index ? Écrivez seulement le nombre.'
          },
          placeholder: {
            zh: '填一个数字',
            en: 'One number',
            fr: 'Un nombre'
          },
          accept: ['2'],
          explanation: {
            zh: '26 ÷ 4 = 6 余 2，所以索引是 2（索引从 0 开始，2 指向第三项）。',
            en: '26 ÷ 4 = 6 remainder 2, so the index is 2 (indexes start at 0, so 2 points to the third entry).',
            fr: '26 ÷ 4 = 6 reste 2 : l’index est 2 (les index partent de 0, donc 2 désigne la troisième entrée).'
          }
        }
      ]
    },
    {
      type: 'game',
      id: 'game',
      title: {
        zh: '实战：运行中和算法',
        en: 'Field exercise: running the neutralisation algorithm',
        fr: 'Défi : exécuter l’algorithme de neutralisation'
      },
      minutes: 10,
      intro: {
        zh: '真实关卡给出一组字符的 ASCII 值和一张代码表：先求和，再取模定位索引，最后按题面约定还原出最终口令。步骤与作答格式都写在关卡里。',
        en: 'The real stage gives you the ASCII values of several characters and a code table: sum them, take the modulo to find the index, then restore the final password using the rule stated in the stage. The steps and answer format are all in the task.',
        fr: 'Le vrai défi fournit les valeurs ASCII de plusieurs caractères et une table de codes : additionnez, prenez le modulo pour trouver l’index, puis restaurez le mot de passe final selon la règle indiquée. Les étapes et le format de réponse figurent dans l’énoncé.'
      },
      enigmaKey: 'final_algo',
      stage: 6,
      mode: 'guided'
    }
  ],
  glossary: [
    {
      id: 'm6-incident-response',
      term: { zh: '事件响应', en: 'Incident response', fr: 'Réponse à incident' },
      definition: {
        zh: '发现安全事件后按顺序采取的行动：控制影响、恢复服务、保留证据并复盘。',
        en: 'The ordered actions taken after a security incident: contain the impact, restore services, preserve evidence and review.',
        fr: 'Les actions ordonnées après un incident de sécurité : limiter l’impact, rétablir les services, préserver les preuves et faire le bilan.'
      }
    },
    {
      id: 'm6-containment',
      term: { zh: '隔离', en: 'Containment', fr: 'Confinement' },
      definition: {
        zh: '把受影响设备或账号与网络分开，先阻止事件继续扩散。',
        en: 'Separating affected devices or accounts from the network to stop the incident from spreading.',
        fr: 'Séparer du réseau les appareils ou comptes touchés pour empêcher la propagation de l’incident.'
      }
    },
    {
      id: 'm6-modulo',
      term: { zh: '取模（求余）', en: 'Modulo', fr: 'Modulo' },
      definition: {
        zh: '两个整数相除后取余数；余数一定小于除数，常用来把大数压进固定范围。',
        en: 'The remainder after dividing two integers; it is always smaller than the divisor and is often used to squeeze large numbers into a fixed range.',
        fr: 'Le reste de la division de deux entiers ; il est toujours inférieur au diviseur et sert souvent à ramener de grands nombres dans un intervalle fixe.'
      }
    },
    {
      id: 'm6-index',
      term: { zh: '索引', en: 'Index', fr: 'Index' },
      definition: {
        zh: '表里每一项的编号，通常从 0 开始数；取模的结果可以直接当索引用。',
        en: 'The number of an entry in a table, usually starting at 0; a modulo result can be used directly as an index.',
        fr: 'Le numéro d’une entrée dans une table, généralement à partir de 0 ; un résultat de modulo peut servir directement d’index.'
      }
    },
    {
      id: 'm6-evidence-preservation',
      term: { zh: '留证（取证意识）', en: 'Evidence preservation', fr: 'Préservation des preuves' },
      definition: {
        zh: '保留日志、截图和原始文件，避免删除或重装，方便之后还原事件经过。',
        en: 'Keeping logs, screenshots and original files, and avoiding deletion or reinstallation, so the incident can be reconstructed later.',
        fr: 'Conserver journaux, captures d’écran et fichiers d’origine, en évitant suppression ou réinstallation, pour reconstituer l’incident ensuite.'
      }
    }
  ]
};

export default module;
