/* 由 legacy/js/data/* 自动转换生成，请勿手改；如要改题面/答案，请修改后重新运行 scripts/convert-enigmas.cjs */
import type { EnigmaData, ScenarioMeta } from './types';

export const SCENARIOS: Record<'main' | 'classic' | 'alt', ScenarioMeta> = {
  "main": {
    "key": "main",
    "code": "OP-01",
    "label": {
      "zh": "进阶模式",
      "en": "Advanced",
      "fr": "Avancé"
    },
    "title": {
      "zh": "数字封锁 · 主线行动",
      "en": "Digital Lockdown · Main Operation",
      "fr": "Digital Lockdown · Opération principale"
    },
    "briefing": {
      "zh": "一条勒索攻击链正在校园网内横向移动。六道关卡对应六个真实攻击环节：口令重建、邮件取证、古典密码、无线审计、社会工程与反制算法。",
      "en": "A ransomware chain is moving laterally through the campus network. Six stages map to six real attack steps: password rebuilding, mail forensics, classical ciphers, wireless audit, social engineering and the countermeasure algorithm.",
      "fr": "Une chaîne de rançongiciel progresse dans le réseau du campus. Six énigmes correspondent à six étapes réelles : reconstitution de mot de passe, analyse de courriels, chiffrement classique, audit Wi-Fi, ingénierie sociale et algorithme de neutralisation."
    },
    "enigmas": [
      "pwd_intercept",
      "email_forensics",
      "rot13",
      "wifi_audit",
      "social_eng",
      "final_algo"
    ]
  },
  "classic": {
    "key": "classic",
    "code": "OP-02",
    "label": {
      "zh": "经典模式",
      "en": "Classic",
      "fr": "Classique"
    },
    "title": {
      "zh": "数字封锁 · 经典行动",
      "en": "Digital Lockdown · Classic Operation",
      "fr": "Digital Lockdown · Opération classique"
    },
    "briefing": {
      "zh": "最适合第一次上手的版本：从字母序号口令、钓鱼邮件识别、二维码碎片拼合，到恶意 Wi-Fi 与备份恢复，六关循序推进。",
      "en": "The best first run: letter-index passwords, phishing detection, QR fragments, rogue Wi-Fi and backup recovery — six stages that build up gradually.",
      "fr": "La version idéale pour commencer : mot de passe par indices de lettres, détection de phishing, fragments de QR, Wi-Fi malveillant et récupération de sauvegarde — six étapes progressives."
    },
    "enigmas": [
      "pwd_classic",
      "phishing_classic",
      "qr_classic",
      "wifi_classic",
      "backup_classic",
      "master_classic"
    ]
  },
  "alt": {
    "key": "alt",
    "code": "OP-03",
    "label": {
      "zh": "口令协议",
      "en": "Codebook",
      "fr": "Codebook"
    },
    "title": {
      "zh": "数字封锁 · 口令协议",
      "en": "Digital Lockdown · Codebook Protocol",
      "fr": "Digital Lockdown · Protocole Codebook"
    },
    "briefing": {
      "zh": "攻击者用一份内部编码表批量生成口令。中文版把谜题重写为「五位数字 ↔ 五字口令」，法文与英文版保留原始五词密码。",
      "en": "Attackers generate passwords from an internal codebook. The English and French versions keep the original five-word cipher; the Chinese version uses a five-character codebook.",
      "fr": "Les attaquants génèrent les mots de passe à partir d’un codebook interne. Les versions anglaise et française conservent le chiffrement à cinq mots d’origine."
    },
    "enigmas": [
      "pwd_protocol",
      "email_forensics",
      "rot13",
      "wifi_audit",
      "social_eng",
      "final_algo"
    ]
  }
};

export const ENIGMAS: Record<string, EnigmaData> = {
  "pwd_intercept": {
    "key": "pwd_intercept",
    "code": "EN-01",
    "tag": {
      "zh": "口令重建",
      "en": "Password",
      "fr": "Mot de passe"
    },
    "title": {
      "zh": "被截获的管理员口令",
      "en": "Intercepted administrator password",
      "fr": "Mot de passe administrateur intercepté"
    },
    "brief": {
      "zh": "攻击者截获了三段内部通信，请从碎片线索中还原管理员口令。",
      "en": "Attackers intercepted three internal messages. Rebuild the administrator password from the fragments.",
      "fr": "Les hackers ont intercepté trois communications internes. Reconstituez le mot de passe administrateur à partir des fragments."
    },
    "content": {
      "zh": "\n        <p><strong>被截获的通信：</strong></p>\n        <div class=\"data-block\">\n          <p><strong>邮件 1（IT 经理）：</strong>「新口令沿用我们的老规则：取 CYBERSECURITY 的奇数位字母。」</p>\n          <p><strong>短信（管理员）：</strong>「位置 1,3,5,7,9,11。老习惯：把提取出的第 4、5 个字母对调。后缀 = 2024。」</p>\n          <p><strong>内部便笺：</strong>「最终格式：[提取出的字母][年份]」</p>\n        </div>\n        <p><strong>任务：</strong>还原完整的管理员口令。</p>\n      ",
      "en": "\n        <p><strong>Intercepted communications:</strong></p>\n        <div class=\"data-block\">\n          <p><strong>Email 1 (IT manager):</strong> \"The new password follows our old rule: take the ODD-position letters of CYBERSECURITY.\"</p>\n          <p><strong>SMS (admin):</strong> \"Positions 1,3,5,7,9,11 of the word CYBERSECURITY. Usual habit: swap the 4th and 5th extracted letters. Suffix = 2024.\"</p>\n          <p><strong>Internal note:</strong> \"Final format: [EXTRACTED_LETTERS][YEAR]\"</p>\n        </div>\n        <p><strong>Mission:</strong> rebuild the full administrator password.</p>\n      ",
      "fr": "\n        <p><strong>Communications interceptées :</strong></p>\n        <div class=\"data-block\">\n          <p><strong>E-mail 1 (responsable IT) :</strong> « Le nouveau mot de passe suit notre ancienne règle : prenez les lettres IMPAIRES de CYBERSECURITY. »</p>\n          <p><strong>SMS (administrateur) :</strong> « Positions 1,3,5,7,9,11 du mot CYBERSECURITY. Habitude maison : échangez les 4e et 5e lettres extraites. Suffixe = 2024. »</p>\n          <p><strong>Note interne :</strong> « Format final : [LETTRES_EXTRAITES][ANNÉE] »</p>\n        </div>\n        <p><strong>Mission :</strong> reconstituez le mot de passe administrateur complet.</p>\n      "
    },
    "answer": "CBRUEI2024",
    "accept": [
      "CBRUEI2024",
      "cbruei2024"
    ],
    "answerNote": {
      "zh": "格式：6 个大写字母 + 4 位年份，中间无空格",
      "en": "Format: 6 uppercase letters + 4-digit year, no spaces",
      "fr": "Format : 6 lettres majuscules + année sur 4 chiffres, sans espace"
    },
    "hints": {
      "zh": [
        "CYBERSECURITY 共 13 个字母，先给它逐位编号，再挑出所有奇数位。",
        "按位编号：C(1) Y(2) B(3) E(4) R(5) S(6) E(7) C(8) U(9) R(10) I(11) T(12) Y(13)；奇数位依次是 C、B、R、E、U、I。",
        "按短信要求把第 4、5 个字母对调：C、B、R、U、E、I，再接上后缀 2024 即可。"
      ],
      "en": [
        "CYBERSECURITY has 13 letters. Number them and keep only the odd positions.",
        "Numbering: C(1) Y(2) B(3) E(4) R(5) S(6) E(7) C(8) U(9) R(10) I(11) T(12) Y(13); the odd positions give C, B, R, E, U, I.",
        "Swap the 4th and 5th extracted letters as the SMS asks: C, B, R, U, E, I; then append the 2024 suffix."
      ],
      "fr": [
        "CYBERSECURITY compte 13 lettres. Numérotez-les, puis ne gardez que les positions impaires.",
        "Numérotation : C(1) Y(2) B(3) E(4) R(5) S(6) E(7) C(8) U(9) R(10) I(11) T(12) Y(13) ; les positions impaires donnent C, B, R, E, U, I.",
        "Échangez les 4e et 5e lettres extraites comme demandé par le SMS : C, B, R, U, E, I ; ajoutez le suffixe 2024."
      ]
    },
    "explain": {
      "zh": "「取奇数位」这类规律变换只是把口令换了个写法，并不增加熵：攻击者一旦猜到规则，就能立刻还原。可迁移实践：不要用可预测的规则派生口令，改用密码管理器生成随机长口令，并为重要账号开启双因素认证。",
      "en": "Deriving a password with a predictable rule (take the odd letters) provides no real security: once an attacker guesses the rule, the password is recovered instantly. Good practice: never derive passwords from rules — generate random ones with a password manager and enable two-factor authentication on important accounts.",
      "fr": "Dériver un mot de passe par une règle prévisible (prendre les lettres impaires) n'apporte aucune sécurité : si l'attaquant devine la règle, il reconstitue le mot de passe immédiatement. À retenir : ne dérivez pas vos mots de passe d'une règle ; générez-les au hasard avec un gestionnaire de mots de passe et activez la double authentification sur les comptes sensibles."
    },
    "nudges": {
      "zh": [
        "先别管年份：把基准词逐位编号，数清它有多少个字母，再看规则要你取哪几位。",
        "把奇数位字母按顺序抄成一列，再照短信把点名的两位互换，最后才接后缀。"
      ],
      "en": [
        "Ignore the year at first: number the base word, count its letters and find which positions the rule asks for.",
        "Write the odd-position letters in order, swap the two letters the SMS names, and add the suffix only at the end."
      ],
      "fr": [
        "Oubliez l’année un instant : numérotez le mot, comptez ses lettres et repérez les positions demandées.",
        "Écrivez les lettres des positions impaires dans l’ordre, échangez les deux lettres nommées par le SMS, puis ajoutez le suffixe."
      ]
    }
  },
  "email_forensics": {
    "key": "email_forensics",
    "code": "EN-02",
    "tag": {
      "zh": "邮件取证",
      "en": "Email",
      "fr": "E-mail"
    },
    "title": {
      "zh": "邮件头取证分析",
      "en": "Email header forensics",
      "fr": "Analyse forensique d'e-mails"
    },
    "brief": {
      "zh": "分析邮件头中的发件域名与认证结果，找出所有可疑邮件。",
      "en": "Analyse the sender domains and authentication results in the email headers, and find every suspicious email.",
      "fr": "Analysez les domaines expéditeurs et les résultats d'authentification des en-têtes, puis identifiez tous les e-mails suspects."
    },
    "content": {
      "zh": "\n        <p><strong>任务：</strong>只根据下方的发件人与认证结果，找出所有可疑邮件。</p>\n        <div class=\"note\">作答格式：邮件编号按从小到大排列，用英文逗号分隔，例如 <span class=\"mono\">2,4,6</span>。</div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>编号</th><th>发件人</th><th>SPF</th><th>DKIM</th><th>主题</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>1</td><td><span class=\"mono\">security@payp4l.com</span></td><td>FAIL</td><td>PASS</td><td>Urgent verification needed</td></tr>\n            <tr><td>2</td><td><span class=\"mono\">admin@university-paris.edu</span></td><td>PASS</td><td>PASS</td><td>System maintenance tonight</td></tr>\n            <tr><td>3</td><td><span class=\"mono\">support@microsooft.com</span></td><td>PASS</td><td>FAIL</td><td>Account suspended</td></tr>\n            <tr><td>4</td><td><span class=\"mono\">notifications@github.com</span></td><td>PASS</td><td>PASS</td><td>Push to main branch</td></tr>\n            <tr><td>5</td><td><span class=\"mono\">noreply@amazon.co</span></td><td>PASS</td><td>PASS</td><td>Order confirmation #A7821</td></tr>\n            <tr><td>6</td><td><span class=\"mono\">alerts@bank-agricole.fr</span></td><td>PASS</td><td>PASS</td><td>Transaction alert</td></tr>\n            <tr><td>7</td><td><span class=\"mono\">service@gmai1.com</span></td><td>FAIL</td><td>FAIL</td><td>Storage full notification</td></tr>\n            <tr><td>8</td><td><span class=\"mono\">team@slack.com</span></td><td>PASS</td><td>PASS</td><td>New message from @john</td></tr>\n          </tbody>\n        </table>\n        <div class=\"warn\"><strong>注意：</strong>在核对发件域名之前，不要点击邮件中的链接，也不要在邮件页面输入任何账号凭据。</div>\n      ",
      "en": "\n        <p><strong>Mission:</strong> using only the sender and authentication data below, find every suspicious email.</p>\n        <div class=\"note\">Answer format: email numbers in ascending order, separated by commas, e.g. <span class=\"mono\">2,4,6</span>.</div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>No.</th><th>Sender</th><th>SPF</th><th>DKIM</th><th>Subject</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>1</td><td><span class=\"mono\">security@payp4l.com</span></td><td>FAIL</td><td>PASS</td><td>Urgent verification needed</td></tr>\n            <tr><td>2</td><td><span class=\"mono\">admin@university-paris.edu</span></td><td>PASS</td><td>PASS</td><td>System maintenance tonight</td></tr>\n            <tr><td>3</td><td><span class=\"mono\">support@microsooft.com</span></td><td>PASS</td><td>FAIL</td><td>Account suspended</td></tr>\n            <tr><td>4</td><td><span class=\"mono\">notifications@github.com</span></td><td>PASS</td><td>PASS</td><td>Push to main branch</td></tr>\n            <tr><td>5</td><td><span class=\"mono\">noreply@amazon.co</span></td><td>PASS</td><td>PASS</td><td>Order confirmation #A7821</td></tr>\n            <tr><td>6</td><td><span class=\"mono\">alerts@bank-agricole.fr</span></td><td>PASS</td><td>PASS</td><td>Transaction alert</td></tr>\n            <tr><td>7</td><td><span class=\"mono\">service@gmai1.com</span></td><td>FAIL</td><td>FAIL</td><td>Storage full notification</td></tr>\n            <tr><td>8</td><td><span class=\"mono\">team@slack.com</span></td><td>PASS</td><td>PASS</td><td>New message from @john</td></tr>\n          </tbody>\n        </table>\n        <div class=\"warn\"><strong>Caution:</strong> before checking the sender domain, do not click any link in the email and do not type credentials on the page it opens.</div>\n      ",
      "fr": "\n        <p><strong>Mission :</strong> à partir des seuls expéditeurs et résultats d'authentification ci-dessous, identifiez tous les e-mails suspects.</p>\n        <div class=\"note\">Format de réponse : numéros d'e-mails par ordre croissant, séparés par des virgules, par exemple <span class=\"mono\">2,4,6</span>.</div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>N°</th><th>Expéditeur</th><th>SPF</th><th>DKIM</th><th>Objet</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>1</td><td><span class=\"mono\">security@payp4l.com</span></td><td>FAIL</td><td>PASS</td><td>Urgent verification needed</td></tr>\n            <tr><td>2</td><td><span class=\"mono\">admin@university-paris.edu</span></td><td>PASS</td><td>PASS</td><td>System maintenance tonight</td></tr>\n            <tr><td>3</td><td><span class=\"mono\">support@microsooft.com</span></td><td>PASS</td><td>FAIL</td><td>Account suspended</td></tr>\n            <tr><td>4</td><td><span class=\"mono\">notifications@github.com</span></td><td>PASS</td><td>PASS</td><td>Push to main branch</td></tr>\n            <tr><td>5</td><td><span class=\"mono\">noreply@amazon.co</span></td><td>PASS</td><td>PASS</td><td>Order confirmation #A7821</td></tr>\n            <tr><td>6</td><td><span class=\"mono\">alerts@bank-agricole.fr</span></td><td>PASS</td><td>PASS</td><td>Transaction alert</td></tr>\n            <tr><td>7</td><td><span class=\"mono\">service@gmai1.com</span></td><td>FAIL</td><td>FAIL</td><td>Storage full notification</td></tr>\n            <tr><td>8</td><td><span class=\"mono\">team@slack.com</span></td><td>PASS</td><td>PASS</td><td>New message from @john</td></tr>\n          </tbody>\n        </table>\n        <div class=\"warn\"><strong>Attention :</strong> avant de vérifier le domaine de l'expéditeur, ne cliquez sur aucun lien et ne saisissez aucun identifiant sur la page ouverte.</div>\n      "
    },
    "answer": "1,3,5,7",
    "accept": [
      "1,3,5,7",
      "1, 3, 5, 7",
      "1、3、5、7",
      "1357"
    ],
    "answerNote": {
      "zh": "格式：邮件编号用英文逗号分隔，按升序排列，不加空格",
      "en": "Format: email numbers separated by commas, ascending, no spaces",
      "fr": "Format : numéros d'e-mails séparés par des virgules, par ordre croissant, sans espace"
    },
    "hints": {
      "zh": [
        "先逐个核对发件域名：有没有用数字或形近字母替换（payp4l、gmai1、microsooft），或者顶级域不对（amazon.co 而非 amazon.com）？",
        "再看认证列：SPF 或 DKIM 只要出现 FAIL，就说明这封信的发件人身份未通过验证。",
        "域名可疑或认证失败的一共有四封，编号都是奇数；按升序写出来即可。"
      ],
      "en": [
        "Check each sender domain first: any digit or look-alike substitution (payp4l, gmai1, microsooft), or a wrong top-level domain (amazon.co instead of amazon.com)?",
        "Then read the authentication columns: any SPF or DKIM FAIL means the sender identity was not verified.",
        "Four emails fail on domain or authentication, and all four have odd numbers; list them in ascending order."
      ],
      "fr": [
        "Vérifiez d'abord chaque domaine expéditeur : substitution par un chiffre ou un caractère proche (payp4l, gmai1, microsooft), ou mauvaise extension (amazon.co au lieu de amazon.com) ?",
        "Regardez ensuite les colonnes d'authentification : un SPF ou un DKIM en FAIL signifie que l'identité de l'expéditeur n'est pas vérifiée.",
        "Quatre e-mails échouent sur le domaine ou l'authentification, et tous les quatre portent un numéro impair ; listez-les par ordre croissant."
      ]
    },
    "explain": {
      "zh": "SPF 与 DKIM 是邮件身份认证机制：前者校验发件服务器是否被该域名授权，后者用数字签名证明邮件未被伪造或篡改；任一失败都应高度警惕。可迁移实践：核对发件人的完整域名（留意同形字符与错误顶级域），重要账号一律开启双因素认证。",
      "en": "SPF and DKIM authenticate email senders: SPF checks that the sending server is authorised by the domain, and DKIM uses a digital signature to prove the message was not forged or altered. A single FAIL deserves suspicion. Good practice: always verify the full sender domain (look-alike characters, wrong top-level domain) and enable two-factor authentication on important accounts.",
      "fr": "SPF et DKIM sont des mécanismes d'authentification des e-mails : SPF vérifie que le serveur expéditeur est autorisé par le domaine, DKIM vérifie par signature numérique que le message n'a pas été usurpé ni modifié. Un seul échec doit suffire à éveiller la méfiance. À retenir : vérifiez toujours le domaine complet de l'expéditeur (homoglyphes, mauvaise extension) et activez la double authentification sur les comptes importants."
    },
    "nudges": {
      "zh": [
        "先只看「发件人」这一列：把每行 @ 后面的域名抄下来，和它声称的机构名对一对。",
        "挑出两类行——域名明显不对的，以及认证列写着 FAIL 的；把这两类行号抄下来，同一封只记一次。"
      ],
      "en": [
        "Start with the sender column: copy each domain after the @ and compare it with the institution it claims to be.",
        "Mark two kinds of rows: clearly wrong domains, and rows with FAIL in SPF or DKIM. Note each number once."
      ],
      "fr": [
        "Commencez par la colonne expéditeur : recopiez chaque domaine après le @ et comparez-le à l’organisme annoncé.",
        "Repérez deux types de lignes : les domaines douteux et celles avec FAIL ; notez chaque numéro une seule fois."
      ]
    }
  },
  "rot13": {
    "key": "rot13",
    "code": "EN-03",
    "tag": {
      "zh": "古典密码",
      "en": "Cipher",
      "fr": "Chiffrement"
    },
    "title": {
      "zh": "改写版凯撒密码",
      "en": "Modified Caesar cipher",
      "fr": "Cryptanalyse César modifié"
    },
    "brief": {
      "zh": "系统遭到一版定制加密的破坏，破解密文即可取回恢复密钥。",
      "en": "The system was compromised by a custom encryption. Break the cipher to recover the restoration key.",
      "fr": "Le système a été compromis par un chiffrement personnalisé. Cassez le code pour obtenir la clé de restauration."
    },
    "content": {
      "zh": "\n        <p><strong>被截获的密文：</strong></p>\n        <pre class=\"code\">ERFRPHEVGL</pre>\n        <div class=\"data-block\">\n          <p><strong>日志中的上下文：</strong></p>\n          <ul>\n            <li>检测到的算法：ROT-13（字母表整体平移 13 位）</li>\n            <li>攻击者留言：「我用的就是经典的 ROT-13。」</li>\n            <li>解密后的明文即恢复密钥。</li>\n          </ul>\n        </div>\n        <p><strong>目标：</strong>用 ROT-13 解出恢复密钥。</p>\n      ",
      "en": "\n        <p><strong>Intercepted ciphertext:</strong></p>\n        <pre class=\"code\">ERFRPHEVGL</pre>\n        <div class=\"data-block\">\n          <p><strong>Context found in the logs:</strong></p>\n          <ul>\n            <li>Detected algorithm: ROT-13 (shift of 13 letters in the alphabet)</li>\n            <li>Attacker's note: \"I used the classic ROT-13.\"</li>\n            <li>The decrypted plaintext is the restoration key.</li>\n          </ul>\n        </div>\n        <p><strong>Objective:</strong> decrypt the message with ROT-13.</p>\n      ",
      "fr": "\n        <p><strong>Message chiffré intercepté :</strong></p>\n        <pre class=\"code\">ERFRPHEVGL</pre>\n        <div class=\"data-block\">\n          <p><strong>Contexte trouvé dans les journaux :</strong></p>\n          <ul>\n            <li>Algorithme détecté : ROT-13 (décalage de 13 lettres)</li>\n            <li>Note de l'attaquant : « J'ai utilisé le classique ROT-13. »</li>\n            <li>Le message déchiffré donne la clé de restauration.</li>\n          </ul>\n        </div>\n        <p><strong>Objectif :</strong> déchiffrez le message avec ROT-13.</p>\n      "
    },
    "answer": "RESECURITY",
    "accept": [
      "RESECURITY",
      "resecurity"
    ],
    "answerNote": {
      "zh": "格式：10 个大写字母，无空格",
      "en": "Format: 10 uppercase letters, no spaces",
      "fr": "Format : 10 lettres majuscules, sans espace"
    },
    "hints": {
      "zh": [
        "ROT-13 把每个字母沿字母表平移 13 位；因为 13 + 13 = 26，加密和解密是同一个操作。",
        "逐字母对映：E→R、R→E、F→S、R→E、P→C、H→U、E→R、V→I、G→T、L→Y。",
        "把 10 个结果字母依次连起来就是恢复密钥；它由 RE 和 SECURITY 两部分组成。"
      ],
      "en": [
        "ROT-13 shifts every letter 13 places along the alphabet; since 13 + 13 = 26, encryption and decryption are the same operation.",
        "Letter by letter: E→R, R→E, F→S, R→E, P→C, H→U, E→R, V→I, G→T, L→Y.",
        "Join the ten resulting letters in order to get the restoration key; it reads as RE + SECURITY."
      ],
      "fr": [
        "ROT-13 décale chaque lettre de 13 positions dans l'alphabet ; comme 13 + 13 = 26, chiffrer et déchiffrer sont la même opération.",
        "Lettre par lettre : E→R, R→E, F→S, R→E, P→C, H→U, E→R, V→I, G→T, L→Y.",
        "Concaténez les dix lettres obtenues pour former la clé de récupération ; elle se lit RE + SECURITY."
      ]
    },
    "explain": {
      "zh": "ROT-13 是固定偏移的替换密码：对称、可逆，但计算强度为零，一段脚本毫秒级即可破解。可迁移实践：固定偏移或替换不等于加密；敏感数据应使用 AES 等现代算法，口令存储应使用 Argon2、bcrypt 等加盐慢哈希。",
      "en": "ROT-13 is a fixed-shift substitution cipher: symmetric and reversible, but with no computational strength at all — a one-line script breaks it in milliseconds. Good practice: a fixed shift or substitution is not encryption; protect sensitive data with AES or another modern cipher, and store passwords with a slow salted hash such as Argon2 or bcrypt.",
      "fr": "ROT-13 est un chiffrement par substitution à décalage fixe : symétrique et réversible, mais sans aucune résistance au calcul — un simple script le casse en une fraction de seconde. À retenir : un décalage ou une substitution fixe n'est pas du chiffrement ; pour des données sensibles, utilisez AES ou un algorithme moderne, et pour stocker des mots de passe, un hachage lent salé comme Argon2 ou bcrypt."
    },
    "nudges": {
      "zh": [
        "先确认这套操作是对称的：对密文再做一遍同样的平移，会回到原文；那解码时该往哪个方向数？",
        "逐字母拆开，每个字母在字母表上后移 13 格（越过 Z 从头数），再把结果按原顺序拼回去。"
      ],
      "en": [
        "Remember the operation is symmetric: applying it twice returns the original. Which way do you shift to decode?",
        "Split the ciphertext letter by letter, move each one 13 places forward (wrap at Z), then join them back."
      ],
      "fr": [
        "Rappelez-vous que l’opération est symétrique : appliquée deux fois, elle revient à l’original. Dans quel sens décaler ?",
        "Séparez chaque lettre, avancez-la de 13 places (retour à A après Z), puis recollez le résultat."
      ]
    }
  },
  "wifi_audit": {
    "key": "wifi_audit",
    "code": "EN-04",
    "tag": {
      "zh": "网络审计",
      "en": "Wi-Fi",
      "fr": "Wi-Fi"
    },
    "title": {
      "zh": "无线网络安全审计",
      "en": "Wireless network audit",
      "fr": "Audit de sécurité réseau"
    },
    "brief": {
      "zh": "审计一份无线网络清单，找出可被直接利用的高风险配置。",
      "en": "Audit a list of wireless networks and find the configurations that can be exploited directly.",
      "fr": "Auditez une liste de réseaux sans fil et identifiez les configurations directement exploitables."
    },
    "content": {
      "zh": "\n        <p><strong>审计对象：</strong>扫描到的 8 个无线网络。</p>\n        <div class=\"note\">作答格式：网络编号按从小到大排列，用英文逗号分隔，例如 <span class=\"mono\">1,3,6</span>。</div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>编号</th><th>SSID</th><th>加密方式</th><th>关键配置</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>1</td><td>Campus-WiFi-5G</td><td>WPA3</td><td>Password: Random64char · MAC Filtering: ON</td></tr>\n            <tr><td>2</td><td>NETGEAR_DEFAULT</td><td>WEP</td><td>Password: \"password123\" · Broadcast: ON</td></tr>\n            <tr><td>3</td><td>IT-Department-Secure</td><td>WPA2-Enterprise</td><td>RADIUS Auth · Hidden SSID</td></tr>\n            <tr><td>4</td><td>Guest-Network</td><td>OPEN</td><td>Captive Portal · Bandwidth: Limited</td></tr>\n            <tr><td>5</td><td>Conference-Room-A</td><td>WPA2</td><td>Password: ConferenceRoom2024! · Guest Access</td></tr>\n            <tr><td>6</td><td>Eduroam</td><td>WPA2-Enterprise</td><td>Certificate Auth · Academic Network</td></tr>\n            <tr><td>7</td><td>TP-Link_8A7B</td><td>WPS Enabled</td><td>Default Admin · Firmware: 2019</td></tr>\n            <tr><td>8</td><td>Administration</td><td>WPA3</td><td>Certificate + Biometric · Air-gapped</td></tr>\n          </tbody>\n        </table>\n        <div class=\"warn\"><strong>注意：</strong>以上为教学模拟数据，请勿在真实环境中尝试连接来源不明的无线网络。</div>\n        <p><strong>任务：</strong>找出存在严重安全风险、可被直接利用的网络。</p>\n      ",
      "en": "\n        <p><strong>Audit target:</strong> eight scanned wireless networks.</p>\n        <div class=\"note\">Answer format: network numbers in ascending order, separated by commas, e.g. <span class=\"mono\">1,3,6</span>.</div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>No.</th><th>SSID</th><th>Encryption</th><th>Configuration</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>1</td><td>Campus-WiFi-5G</td><td>WPA3</td><td>Password: Random64char · MAC Filtering: ON</td></tr>\n            <tr><td>2</td><td>NETGEAR_DEFAULT</td><td>WEP</td><td>Password: \"password123\" · Broadcast: ON</td></tr>\n            <tr><td>3</td><td>IT-Department-Secure</td><td>WPA2-Enterprise</td><td>RADIUS Auth · Hidden SSID</td></tr>\n            <tr><td>4</td><td>Guest-Network</td><td>OPEN</td><td>Captive Portal · Bandwidth: Limited</td></tr>\n            <tr><td>5</td><td>Conference-Room-A</td><td>WPA2</td><td>Password: ConferenceRoom2024! · Guest Access</td></tr>\n            <tr><td>6</td><td>Eduroam</td><td>WPA2-Enterprise</td><td>Certificate Auth · Academic Network</td></tr>\n            <tr><td>7</td><td>TP-Link_8A7B</td><td>WPS Enabled</td><td>Default Admin · Firmware: 2019</td></tr>\n            <tr><td>8</td><td>Administration</td><td>WPA3</td><td>Certificate + Biometric · Air-gapped</td></tr>\n          </tbody>\n        </table>\n        <div class=\"warn\"><strong>Caution:</strong> this is simulated teaching data; do not try to connect to unknown wireless networks in a real environment.</div>\n        <p><strong>Mission:</strong> find the networks with critical, directly exploitable weaknesses.</p>\n      ",
      "fr": "\n        <p><strong>Cible de l'audit :</strong> huit réseaux sans fil détectés.</p>\n        <div class=\"note\">Format de réponse : numéros de réseaux par ordre croissant, séparés par des virgules, par exemple <span class=\"mono\">1,3,6</span>.</div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>N°</th><th>SSID</th><th>Chiffrement</th><th>Configuration</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>1</td><td>Campus-WiFi-5G</td><td>WPA3</td><td>Password: Random64char · MAC Filtering: ON</td></tr>\n            <tr><td>2</td><td>NETGEAR_DEFAULT</td><td>WEP</td><td>Password: \"password123\" · Broadcast: ON</td></tr>\n            <tr><td>3</td><td>IT-Department-Secure</td><td>WPA2-Enterprise</td><td>RADIUS Auth · Hidden SSID</td></tr>\n            <tr><td>4</td><td>Guest-Network</td><td>OPEN</td><td>Captive Portal · Bandwidth: Limited</td></tr>\n            <tr><td>5</td><td>Conference-Room-A</td><td>WPA2</td><td>Password: ConferenceRoom2024! · Guest Access</td></tr>\n            <tr><td>6</td><td>Eduroam</td><td>WPA2-Enterprise</td><td>Certificate Auth · Academic Network</td></tr>\n            <tr><td>7</td><td>TP-Link_8A7B</td><td>WPS Enabled</td><td>Default Admin · Firmware: 2019</td></tr>\n            <tr><td>8</td><td>Administration</td><td>WPA3</td><td>Certificate + Biometric · Air-gapped</td></tr>\n          </tbody>\n        </table>\n        <div class=\"warn\"><strong>Attention :</strong> données de simulation pédagogique ; ne tentez pas de vous connecter à des réseaux inconnus dans un environnement réel.</div>\n        <p><strong>Mission :</strong> identifiez les réseaux présentant des risques critiques, directement exploitables.</p>\n      "
    },
    "answer": "2,4,7",
    "accept": [
      "2,4,7",
      "2, 4, 7",
      "2、4、7",
      "247"
    ],
    "answerNote": {
      "zh": "格式：网络编号用英文逗号分隔，按升序排列，不加空格",
      "en": "Format: network numbers separated by commas, ascending, no spaces",
      "fr": "Format : numéros de réseaux séparés par des virgules, par ordre croissant, sans espace"
    },
    "hints": {
      "zh": [
        "WEP 已被证明可在数分钟内破解，即使口令不弱；OPEN 网络则完全没有加密，流量可被直接嗅探。",
        "WPS 是另一种弱入口：WPS 仍开启、固件停留在 2019 年、管理员还是默认口令，这一组合足以被利用。",
        "按「加密方式失效 / 完全开放 / 设备默认配置可被利用」筛一遍，会得到三个高风险网络；按升序写出编号。"
      ],
      "en": [
        "WEP has long been broken within minutes, even with a strong password; an OPEN network has no encryption at all, so traffic can be sniffed directly.",
        "WPS is another weak entry point: WPS still enabled, firmware stuck in 2019 and the default admin password — that combination is exploitable.",
        "Filter by \"broken encryption / fully open / exploitable default configuration\" and three high-risk networks remain; write their numbers in ascending order."
      ],
      "fr": [
        "Le WEP se casse en quelques minutes, même avec un mot de passe solide ; un réseau OPEN n'a aucun chiffrement, le trafic peut être intercepté directement.",
        "Le WPS est une autre porte d'entrée faible : WPS encore actif, firmware de 2019 et mot de passe administrateur par défaut — la combinaison est exploitable.",
        "Filtrez selon « chiffrement obsolète / réseau ouvert / configuration d'usine exploitable » : trois réseaux ressortent, listez leurs numéros par ordre croissant."
      ]
    },
    "explain": {
      "zh": "无线网络的安全性取决于加密协议、认证方式与出厂配置：WEP 基于 RC4，密钥可被统计分析恢复；WPS 的 PIN 可被暴力枚举。可迁移实践：优先使用 WPA3 或 WPA2-Enterprise，关闭 WPS，修改默认管理员口令，并及时更新固件。",
      "en": "Wireless security depends on the encryption protocol, the authentication mode and the device's factory configuration. WEP relies on RC4 with keys recoverable through statistical attacks, and the WPS PIN can be brute-forced. Good practice: prefer WPA3 or WPA2-Enterprise, disable WPS, change the default admin password and keep the firmware up to date.",
      "fr": "La sécurité d'un réseau sans fil dépend du protocole de chiffrement, du mode d'authentification et de la configuration d'usine. Le WEP repose sur RC4 avec des clés récupérables par attaque statistique, et le PIN WPS peut être énuméré par force brute. À retenir : privilégiez WPA3 ou WPA2-Enterprise, désactivez le WPS, changez le mot de passe administrateur par défaut et mettez à jour le firmware."
    },
    "nudges": {
      "zh": [
        "别被登录页或限速迷惑：先只看「加密方式」这一列，哪些是早已被淘汰的？",
        "把每行按「加密失效、完全开放、默认配置可被利用」三点过一遍，命中任意一点就留下编号。"
      ],
      "en": [
        "Do not be distracted by captive portals or bandwidth limits: read only the encryption column. Which entries are obsolete?",
        "Check every row against three flags: broken encryption, fully open, exploitable defaults. Keep rows that hit one."
      ],
      "fr": [
        "Ne vous laissez pas distraire par le portail captif ou la limitation de débit : lisez seulement le chiffrement.",
        "Vérifiez chaque ligne sur trois critères : chiffrement obsolète, réseau ouvert, configuration d’usine exploitable."
      ]
    }
  },
  "social_eng": {
    "key": "social_eng",
    "code": "EN-05",
    "tag": {
      "zh": "社会工程",
      "en": "Social engineering",
      "fr": "Ingénierie sociale"
    },
    "title": {
      "zh": "进阶社会工程学",
      "en": "Advanced social engineering",
      "fr": "Ingénierie sociale avancée"
    },
    "brief": {
      "zh": "根据被泄露的社交资料，拼出应急备份口令。",
      "en": "Use the leaked social-media profile to piece together the emergency backup password.",
      "fr": "À partir des données personnelles divulguées, reconstituez le mot de passe de la sauvegarde d'urgence."
    },
    "content": {
      "zh": "\n        <p><strong>社交媒体资料——Marcus Johnson（IT 管理员）：</strong></p>\n        <dl class=\"kv\">\n          <dt>LinkedIn</dt>\n          <dd>「2018 年，我以一篇关于 AES 的毕业论文开启网络安全之路。」</dd>\n          <dt>Facebook</dt>\n          <dd>「在 CyberTech Inc 工作满 5 周年！2019 年 6 月入职。」</dd>\n          <dt>Instagram</dt>\n          <dd>「我的德国牧羊犬 Caesar 今天 7 岁啦！#GermanShepherd #BestFriend」</dd>\n          <dt>Twitter</dt>\n          <dd>「Rome 不是一天建成的，但我的网络安全是！#InfoSec」</dd>\n          <dt>GitHub</dt>\n          <dd>「AESCryptTools——大学时期（2018）的教学项目。」</dd>\n          <dt>交友资料</dt>\n          <dd>「出生在永恒之城，每年夏天都会回去旅行。」</dd>\n        </dl>\n        <div class=\"note\"><strong>检测到的口令模式：</strong>[出生城市][动物][密码学][论文年份]</div>\n        <p><strong>任务：</strong>按照该模式拼出完整的备份口令。</p>\n      ",
      "en": "\n        <p><strong>Social-media profile — Marcus Johnson (IT administrator):</strong></p>\n        <dl class=\"kv\">\n          <dt>LinkedIn</dt>\n          <dd>\"Passionate about cybersecurity since my thesis on AES in 2018.\"</dd>\n          <dt>Facebook</dt>\n          <dd>\"Happy 5th anniversary at CyberTech Inc! Started June 2019.\"</dd>\n          <dt>Instagram</dt>\n          <dd>\"My dog Caesar is 7 years old today! #GermanShepherd #BestFriend\"</dd>\n          <dt>Twitter</dt>\n          <dd>\"Rome wasn't built in a day, but my network security was! #InfoSec\"</dd>\n          <dt>GitHub</dt>\n          <dd>\"AESCryptTools — educational project from university (2018).\"</dd>\n          <dt>Dating profile</dt>\n          <dd>\"Born in the eternal city, love travelling back every summer.\"</dd>\n        </dl>\n        <div class=\"note\"><strong>Detected password pattern:</strong> [BIRTH_CITY][ANIMAL][CRYPTO][THESIS_YEAR]</div>\n        <p><strong>Mission:</strong> assemble the complete backup password following that pattern.</p>\n      ",
      "fr": "\n        <p><strong>Profil de réseaux sociaux — Marcus Johnson (administrateur IT) :</strong></p>\n        <dl class=\"kv\">\n          <dt>LinkedIn</dt>\n          <dd>« Passionné de cybersécurité depuis ma thèse sur AES en 2018. »</dd>\n          <dt>Facebook</dt>\n          <dd>« 5 ans chez CyberTech Inc ! Arrivé en juin 2019. »</dd>\n          <dt>Instagram</dt>\n          <dd>« Mon chien Caesar fête ses 7 ans aujourd'hui ! #GermanShepherd #BestFriend »</dd>\n          <dt>Twitter</dt>\n          <dd>« Rome ne s'est pas construite en un jour, mais ma sécurité réseau, si ! #InfoSec »</dd>\n          <dt>GitHub</dt>\n          <dd>« AESCryptTools — projet pédagogique de l'université (2018). »</dd>\n          <dt>Profil de rencontre</dt>\n          <dd>« Né dans la ville éternelle, j'y retourne chaque été. »</dd>\n        </dl>\n        <div class=\"note\"><strong>Motif de mot de passe détecté :</strong> [VILLE_DE_NAISSANCE][ANIMAL][CRYPTO][ANNÉE_DE_THÈSE]</div>\n        <p><strong>Mission :</strong> reconstituez le mot de passe de sauvegarde complet selon ce motif.</p>\n      "
    },
    "answer": "RomeCaesarAES2018",
    "accept": [
      "RomeCaesarAES2018",
      "ROMECAESARAES2018",
      "romecaesaraes2018",
      "ROME CAESAR AES 2018"
    ],
    "answerNote": {
      "zh": "格式：四段内容依次直接相连，不加分隔符",
      "en": "Format: the four parts joined directly, no separators",
      "fr": "Format : les quatre parties concaténées sans séparateur"
    },
    "hints": {
      "zh": [
        "城市：Twitter 与交友资料都指向 Rome（「永恒之城」）。",
        "动物：Instagram 上那只德国牧羊犬叫 Caesar；密码学方向：LinkedIn 与 GitHub 都提到 AES。",
        "年份取论文发表那年，把 [城市][动物][密码学][年份] 四段按顺序直接相连，不加分隔符。"
      ],
      "en": [
        "City: Twitter and the dating profile both point to Rome (\"the eternal city\").",
        "Animal: the German Shepherd on Instagram is called Caesar; crypto: LinkedIn and GitHub both mention AES.",
        "Take the thesis year, then chain [city][animal][crypto][year] in that order with no separator."
      ],
      "fr": [
        "Ville : Twitter et le profil de rencontre renvoient à Rome (« la ville éternelle »).",
        "Animal : le berger allemand d'Instagram s'appelle Caesar ; cryptographie : LinkedIn et GitHub mentionnent AES.",
        "Prenez l'année de la thèse, puis concaténez [ville][animal][crypto][année] dans cet ordre, sans séparateur."
      ]
    },
    "explain": {
      "zh": "社会工程学把公开信息（城市、宠物、学校、毕业年份）拼成可猜测的口令——「个人信息 + 可预测组合」是最弱的一类口令。可迁移实践：收敛社交平台的可见范围，避免用宠物名、日期与城市等元素，重要账号叠加双因素认证。",
      "en": "Social engineering turns public information (city, pet, school, graduation year) into a guessable password: \"personal facts + a predictable combination\" is the weakest possible password. Good practice: limit the visibility of your profiles, avoid pet names, dates and cities in passwords, and add two-factor authentication on important accounts.",
      "fr": "L'ingénierie sociale exploite des informations publiques (ville, animal, école, année de diplôme) pour reconstituer un mot de passe devinable : « informations personnelles + combinaison prévisible » est le pire des mots de passe. À retenir : limitez la visibilité de vos profils, évitez les noms d'animaux, dates et villes dans vos mots de passe, et ajoutez la double authentification sur les comptes importants."
    },
    "nudges": {
      "zh": [
        "别急着拼：先把题面的「口令模式」拆成四个空位，再回资料里找每个空位对应哪一条动态。",
        "每个空位只取一个词（地名、名字、缩写、四位年份），最后按模式顺序直接相连。"
      ],
      "en": [
        "Do not assemble yet: split the password pattern into four slots, then find which post fills each slot.",
        "Take one word per slot (a place, a name, an acronym, a four-digit year) and join them in pattern order."
      ],
      "fr": [
        "Ne concaténez pas tout de suite : découpez le motif en quatre cases, puis cherchez quelle publication remplit chacune.",
        "Un mot par case (un lieu, un prénom, un sigle, une année sur quatre chiffres), puis concaténez dans l’ordre."
      ]
    }
  },
  "final_algo": {
    "key": "final_algo",
    "code": "EN-06",
    "tag": {
      "zh": "算法推理",
      "en": "Algorithm",
      "fr": "Algorithme"
    },
    "title": {
      "zh": "最终中和算法",
      "en": "Final neutralization algorithm",
      "fr": "Algorithme de neutralisation final"
    },
    "brief": {
      "zh": "运行简化哈希算法，生成终止攻击的中和代码。",
      "en": "Run the simplified hash algorithm to generate the code that stops the attack.",
      "fr": "Utilisez l'algorithme de hachage simplifié pour générer le code de neutralisation de l'attaque."
    },
    "content": {
      "zh": "\n        <p><strong>检测到的中和算法：</strong></p>\n        <div class=\"data-block\">\n          <p><strong>第 1 步 — 取算法固定字符的 ASCII 码：</strong></p>\n          <ul>\n            <li>字符 <span class=\"mono\">C</span> = 67</li>\n            <li>字符 <span class=\"mono\">1</span> = 49</li>\n            <li>字符 <span class=\"mono\">R</span> = 82</li>\n            <li>字符 <span class=\"mono\">2</span> = 50</li>\n            <li>字符 <span class=\"mono\">R</span> = 82</li>\n          </ul>\n          <p><strong>第 2 步 — 求和：</strong>67 + 49 + 82 + 50 + 82 = 330</p>\n          <p><strong>第 3 步 — 取模：</strong>330 MOD 5 = 0，即取代码表中索引 0 的项。</p>\n        </div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>索引</th><th>代码词（ROT-13 加密）</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>0</td><td><span class=\"mono\">CUBRAVK</span></td></tr>\n            <tr><td>1</td><td><span class=\"mono\">FGBEZ</span></td></tr>\n            <tr><td>2</td><td><span class=\"mono\">GVGNA</span></td></tr>\n            <tr><td>3</td><td><span class=\"mono\">IBEGRK</span></td></tr>\n            <tr><td>4</td><td><span class=\"mono\">MRAVGU</span></td></tr>\n          </tbody>\n        </table>\n        <div class=\"note\">表中的代码词都经过 ROT-13 处理，解码后的词才是最终的中和口令。</div>\n      ",
      "en": "\n        <p><strong>Detected neutralization algorithm:</strong></p>\n        <div class=\"data-block\">\n          <p><strong>Step 1 — take the ASCII codes of the fixed characters:</strong></p>\n          <ul>\n            <li>Character <span class=\"mono\">C</span> = 67</li>\n            <li>Character <span class=\"mono\">1</span> = 49</li>\n            <li>Character <span class=\"mono\">R</span> = 82</li>\n            <li>Character <span class=\"mono\">2</span> = 50</li>\n            <li>Character <span class=\"mono\">R</span> = 82</li>\n          </ul>\n          <p><strong>Step 2 — sum:</strong> 67 + 49 + 82 + 50 + 82 = 330</p>\n          <p><strong>Step 3 — modulo:</strong> 330 MOD 5 = 0, i.e. take the entry at index 0 of the code table.</p>\n        </div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>Index</th><th>Code word (ROT-13 encrypted)</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>0</td><td><span class=\"mono\">CUBRAVK</span></td></tr>\n            <tr><td>1</td><td><span class=\"mono\">FGBEZ</span></td></tr>\n            <tr><td>2</td><td><span class=\"mono\">GVGNA</span></td></tr>\n            <tr><td>3</td><td><span class=\"mono\">IBEGRK</span></td></tr>\n            <tr><td>4</td><td><span class=\"mono\">MRAVGU</span></td></tr>\n          </tbody>\n        </table>\n        <div class=\"note\">Every code word in the table went through ROT-13; the decoded word is the final neutralization code.</div>\n      ",
      "fr": "\n        <p><strong>Algorithme de neutralisation détecté :</strong></p>\n        <div class=\"data-block\">\n          <p><strong>Étape 1 — codes ASCII des caractères fixes :</strong></p>\n          <ul>\n            <li>Caractère <span class=\"mono\">C</span> = 67</li>\n            <li>Caractère <span class=\"mono\">1</span> = 49</li>\n            <li>Caractère <span class=\"mono\">R</span> = 82</li>\n            <li>Caractère <span class=\"mono\">2</span> = 50</li>\n            <li>Caractère <span class=\"mono\">R</span> = 82</li>\n          </ul>\n          <p><strong>Étape 2 — somme :</strong> 67 + 49 + 82 + 50 + 82 = 330</p>\n          <p><strong>Étape 3 — modulo :</strong> 330 MOD 5 = 0, on prend donc l'entrée d'index 0 de la table.</p>\n        </div>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>Index</th><th>Mot de code (chiffré en ROT-13)</th></tr>\n          </thead>\n          <tbody>\n            <tr><td>0</td><td><span class=\"mono\">CUBRAVK</span></td></tr>\n            <tr><td>1</td><td><span class=\"mono\">FGBEZ</span></td></tr>\n            <tr><td>2</td><td><span class=\"mono\">GVGNA</span></td></tr>\n            <tr><td>3</td><td><span class=\"mono\">IBEGRK</span></td></tr>\n            <tr><td>4</td><td><span class=\"mono\">MRAVGU</span></td></tr>\n          </tbody>\n        </table>\n        <div class=\"note\">Chaque mot de code du tableau a été chiffré en ROT-13 ; le mot déchiffré est le code de neutralisation final.</div>\n      "
    },
    "answer": "PHOENIX",
    "accept": [
      "PHOENIX",
      "phoenix"
    ],
    "answerNote": {
      "zh": "格式：6 个大写字母，无空格",
      "en": "Format: 6 uppercase letters, no spaces",
      "fr": "Format : 6 lettres majuscules, sans espace"
    },
    "hints": {
      "zh": [
        "先把 ASCII 码相加：67 + 49 + 82 + 50 + 82 = 330。",
        "330 ÷ 5 = 66 余 0，取模结果 0 对应代码表的索引 0。",
        "索引 0 的代码词是 CUBRAVK；用第三关学过的 ROT-13 解码即得最终口令。"
      ],
      "en": [
        "First add the ASCII codes: 67 + 49 + 82 + 50 + 82 = 330.",
        "330 ÷ 5 = 66 remainder 0, so the modulo result points to index 0 in the code table.",
        "The code word at index 0 is CUBRAVK; decode it with ROT-13 (as in stage 3) to get the final code word."
      ],
      "fr": [
        "Additionnez d'abord les codes ASCII : 67 + 49 + 82 + 50 + 82 = 330.",
        "330 ÷ 5 = 66 reste 0 : le résultat du modulo désigne l'index 0 de la table.",
        "Le mot de code à l'index 0 est CUBRAVK ; déchiffrez-le avec ROT-13 (comme à l'étape 3) pour obtenir le mot final."
      ]
    },
    "explain": {
      "zh": "把任意输入压缩成固定范围的索引，正是哈希与校验和的思路；简单的求和取模会大量碰撞，不能提供任何保护。可迁移实践：口令存储使用 Argon2、bcrypt 等加盐慢哈希，完整性校验使用 SHA-256 等加密哈希。",
      "en": "Compressing any input into a fixed-size index is the essence of hashing and checksums; a plain sum plus a modulo collides constantly and protects nothing. Good practice: store passwords with a slow salted hash such as Argon2 or bcrypt, and use SHA-256 or better for integrity checks.",
      "fr": "Compresser une entrée quelconque en un index de taille fixe, c'est le principe d'un hachage ou d'une somme de contrôle ; une simple somme suivie d'un modulo crée énormément de collisions et ne protège rien. À retenir : pour stocker des mots de passe, utilisez Argon2 ou bcrypt (hachage lent et salé) ; pour vérifier l'intégrité, utilisez SHA-256 ou équivalent."
    },
    "nudges": {
      "zh": [
        "先检查加法：题面把 5 个 ASCII 值都列出来了，逐个相加，别漏项也别多数。",
        "把总和除以 5，余数就是索引；用这个索引回表里取词，再按第三关学过的 ROT-13 还原。"
      ],
      "en": [
        "Check the addition first: all five ASCII values are listed in the task — add them one by one.",
        "Divide the total by 5; the remainder is the index. Take that table entry and decode it with ROT-13."
      ],
      "fr": [
        "Vérifiez d’abord l’addition : les cinq valeurs ASCII sont données dans l’énoncé, additionnez-les une à une.",
        "Divisez le total par 5 ; le reste est l’index. Prenez l’entrée correspondante et déchiffrez-la en ROT-13."
      ]
    }
  },
  "pwd_protocol": {
    "key": "pwd_protocol",
    "code": "EN-01",
    "tag": {
      "zh": "口令编码",
      "en": "Password",
      "fr": "Mot de passe"
    },
    "title": {
      "zh": "口令生成协议",
      "en": "Password generation protocol",
      "fr": "Protocole de génération de mot de passe"
    },
    "brief": {
      "zh": "截获的通信显示，IT 负责人用一份《口令编码表》生成了 5 个汉字的口令。",
      "en": "The IT lead generated the new password with a five-dice word method. Decode the intercepted sequence.",
      "fr": "Le responsable IT a généré le nouveau mot de passe avec la méthode des cinq dés. Décodez la séquence interceptée."
    },
    "content": {
      "zh": "\n        <p><strong>截获的 IT 负责人通信：</strong></p>\n        <div class=\"data-block\">\n          <p><strong>加密邮件：</strong>「新协议已启用。按老办法，用我们的《口令编码表》把 5 个汉字编码。」</p>\n          <p><strong>加密短信：</strong>「启动序列：<span class=\"mono\">2125231554326254543646133</span>」</p>\n          <p><strong>内部备注：</strong>「提醒：把序列按每 5 位一组切开，再到《口令编码表》里查对应的汉字。」</p>\n        </div>\n        <p><strong>《口令编码表》（按汉字拼音排序）：</strong></p>\n        <table class=\"data-table\">\n          <thead>\n            <tr><th>编码</th><th>汉字</th></tr>\n          </thead>\n          <tbody>\n            <tr><td><span class=\"mono\">31554</span></td><td>层</td></tr>\n            <tr><td><span class=\"mono\">32625</span></td><td>防</td></tr>\n            <tr><td><span class=\"mono\">45436</span></td><td>火</td></tr>\n            <tr><td><span class=\"mono\">46133</span></td><td>墙</td></tr>\n            <tr><td><span class=\"mono\">21252</span></td><td>双</td></tr>\n          </tbody>\n        </table>\n        <p><strong>任务：</strong>解码启动序列，得到 5 个汉字的口令。</p>\n      ",
      "en": "\n        <p><strong>Intercepted message from the IT lead:</strong></p>\n        <div class=\"data-block\">\n          <p><strong>Encrypted email:</strong> \"New protocol activated. Use our usual five-dice method as agreed.\"</p>\n          <p><strong>Encrypted SMS:</strong> \"Launch sequence: <span class=\"mono\">2125231554326254543646133</span>\"</p>\n          <p><strong>Internal note:</strong> \"Reminder: split the sequence into groups of five digits, then look each group up in the standard French five-dice word list.\"</p>\n        </div>\n        <div class=\"note\">The standard French five-dice word list maps every five-digit group to one French word; the full table is provided with the exercise.</div>\n        <p><strong>Mission:</strong> decode the launch sequence to obtain the generated password.</p>\n      ",
      "fr": "\n        <p><strong>Message intercepté du responsable IT :</strong></p>\n        <div class=\"data-block\">\n          <p><strong>E-mail sécurisé :</strong> « Nouveau protocole activé. Utilise notre méthode habituelle à 5 dés comme convenu. »</p>\n          <p><strong>SMS crypté :</strong> « Séquence de lancement : <span class=\"mono\">2125231554326254543646133</span> »</p>\n          <p><strong>Note interne :</strong> « Rappel : diviser la séquence par groupes de 5 chiffres, puis référencer le document standard français. »</p>\n        </div>\n        <div class=\"note\">La table standard française de la méthode à 5 dés associe chaque groupe de 5 chiffres à un mot français ; la table complète est fournie avec l'exercice.</div>\n        <p><strong>Mission :</strong> décodez cette séquence pour obtenir le mot de passe généré.</p>\n      "
    },
    "answer": {
      "zh": "双层防火墙",
      "en": "CAR FREIN GILET ONYX OUVRE",
      "fr": "CAR FREIN GILET ONYX OUVRE"
    },
    "accept": [
      "双层防火墙",
      "双 层 防 火 墙",
      "CAR FREIN GILET ONYX OUVRE",
      "CARFREINGILETONYXOUVRE"
    ],
    "answerNote": {
      "zh": "格式：5 个汉字，按密文顺序排列，无空格",
      "en": "Format: five French words in capitals, separated by spaces",
      "fr": "Format : cinq mots français en majuscules, séparés par des espaces"
    },
    "hints": {
      "zh": [
        "先把 25 位数字按每 5 位一组切开，得到 5 个编码。",
        "拿每个编码到《口令编码表》里查出对应汉字，例如 21252 对应「双」。",
        "按密文顺序把查到的 5 个汉字连起来，就是 IT 负责人设置的口令。"
      ],
      "en": [
        "Split the 25-digit sequence into groups of five digits.",
        "Look each group up in the standard French five-dice word list — for example 21252 = CAR.",
        "Exact matches: 21252=CAR, 31554=FREIN, 32625=GILET, 45436=ONYX, 46133=OUVRE."
      ],
      "fr": [
        "Découpez la séquence de 25 chiffres par groupes de 5 chiffres.",
        "Cherchez chaque groupe dans la table standard française de la méthode à 5 dés — par exemple 21252 = CAR.",
        "Correspondances exactes : 21252=CAR, 31554=FREIN, 32625=GILET, 45436=ONYX, 46133=OUVRE."
      ]
    },
    "explain": {
      "zh": "用固定编码表把字符替换成数字，属于替换式密码：只要拿到对照表，任何人都能还原，安全性为零。可迁移实践：口令不应依赖固定规律或编码表，应使用密码管理器生成并保管随机长口令，重要账号再配合双因素认证。",
      "en": "Replacing characters with numbers through a fixed code table is a substitution cipher: anyone holding the table can decode it, so it offers no security. Good practice: never derive passwords from a fixed rule or codebook — generate and store random long passwords in a password manager, and add two-factor authentication on important accounts.",
      "fr": "Remplacer des caractères par des nombres via une table fixe, c'est un chiffre de substitution : quiconque possède la table peut tout décoder, donc aucune sécurité. À retenir : ne tirez jamais un mot de passe d'une règle ou d'un codebook fixe ; générez et stockez des mots de passe longs et aléatoires dans un gestionnaire de mots de passe, et ajoutez la double authentification sur les comptes sensibles."
    },
    "nudges": {
      "zh": [
        "先只做切分：25 位数字每 5 位一组，应该得到 5 组，别让相邻两组粘在一起。",
        "对每组数字，在编码表「编码」列找到完全相同的 5 位数，抄它右边的汉字，再按组序排好。"
      ],
      "en": [
        "Before looking anything up, check your cuts: the sequence must become five groups of exactly five digits.",
        "For each group, find the matching five-digit entry in the word list and write its French word; keep the group order."
      ],
      "fr": [
        "Avant de chercher, vérifiez les coupures : la séquence doit donner cinq groupes de exactement cinq chiffres.",
        "Pour chaque groupe, trouvez l’entrée identique dans la table et notez son mot français ; gardez l’ordre des groupes."
      ]
    }
  },
  "pwd_classic": {
    "key": "pwd_classic",
    "code": "EN-01",
    "tag": {
      "zh": "口令解码",
      "en": "Password",
      "fr": "Mot de passe"
    },
    "title": {
      "zh": "被截获的管理员口令",
      "en": "Intercepted administrator password",
      "fr": "MOT DE PASSE COMPROMIS"
    },
    "brief": {
      "zh": "黑客截获了系统管理员使用的加密口令，请解码后进入系统。",
      "en": "Hackers intercepted the encrypted password used by the system administrator. Decode it to access the system.",
      "fr": "Les hackers ont intercepté un mot de passe chiffré utilisé par l'administrateur système. Décodez-le pour accéder au système !"
    },
    "content": {
      "zh": "<p><strong>被截获的内部通信：</strong></p>\n<div class=\"data-block\">\n  <p><strong>IT 负责人的留言：</strong>「我按老规矩改了管理员口令，用的是你熟悉的数字编号。新的访问码是 <strong>12-15-7-9-14</strong>。和往常一样，末尾照旧接上咱们的参考年份 <strong>2024</strong>。」</p>\n  <p><strong>系统管理员回复：</strong>「收到，我按我们惯用的字母表规则解码后录入。」</p>\n</div>\n<p><strong>任务：</strong>还原完整的管理员口令。</p>\n<div class=\"note\">口令由「单词 + 年份」构成，全部使用大写英文字母与数字。</div>",
      "en": "<p><strong>Intercepted internal message:</strong></p>\n<div class=\"data-block\">\n  <p><strong>Note from the IT manager:</strong> \"I changed the administrator password as agreed. I used our usual method with the numbers you know. The new access code is <strong>12-15-7-9-14</strong>. As always, append our reference year <strong>2024</strong> at the end for extra security.\"</p>\n  <p><strong>Reply from the sysadmin:</strong> \"Got it — I will decode it with our usual alphabet rule and enter it.\"</p>\n</div>\n<p><strong>Your mission:</strong> rebuild the complete administrator password.</p>\n<div class=\"note\">The password is made of a word plus a year, written in uppercase letters and digits.</div>",
      "fr": "<p><strong>Communication interceptée :</strong></p>\n<div class=\"data-block\">\n  <p><strong>Message du responsable IT :</strong> « J'ai changé le mot de passe comme convenu. J'ai utilisé notre méthode habituelle avec les numéros que tu connais. Le nouveau code d'accès est <strong>12-15-7-9-14</strong>. Comme toujours, on ajoute notre année de référence <strong>2024</strong> à la fin pour plus de sécurité. »</p>\n  <p><strong>Réponse de l'administrateur :</strong> « Bien reçu, je le décode avec notre règle alphabétique habituelle et je le saisis. »</p>\n</div>\n<p><strong>Votre mission :</strong> reconstituer le mot de passe administrateur complet.</p>\n<div class=\"note\">Le mot de passe se compose d'un mot suivi d'une année, en majuscules et en chiffres.</div>"
    },
    "answer": "LOGIN2024",
    "answerNote": {
      "zh": "格式：5 个大写字母 + 4 位年份，无空格",
      "en": "Format: 5 uppercase letters + 4-digit year, no spaces",
      "fr": "Format : 5 lettres majuscules + année sur 4 chiffres, sans espace"
    },
    "hints": {
      "zh": [
        "数字代表字母在字母表中的位置：A=1、B=2……Z=26。",
        "把 12、15、7、9、14 依次换算成字母，就得到口令的单词部分。",
        "在换算出的 5 个字母后面直接接上当前年份 2024，不加空格，就是完整口令。"
      ],
      "en": [
        "Each number is a letter position in the alphabet: A=1, B=2 … Z=26.",
        "Convert 12, 15, 7, 9 and 14 into letters one by one to get the word part of the password.",
        "Append the current year 2024 directly after those 5 letters, with no space, to get the complete password."
      ],
      "fr": [
        "Chaque nombre correspond à la position d'une lettre dans l'alphabet : A=1, B=2 … Z=26.",
        "Convertissez un à un 12, 15, 7, 9 et 14 en lettres pour obtenir la partie « mot » du mot de passe.",
        "Ajoutez directement l'année 2024 après ces 5 lettres, sans espace, pour obtenir le mot de passe complet."
      ]
    },
    "explain": {
      "zh": "把字母替换成它在字母表中的序号，是最简单的替换密码之一：只要知道 A=1、B=2 的对应关系，就能手工还原。可迁移的安全实践是——口令应使用长且随机的字符串，不要把单词和年份这类可预测信息拼在末尾，因为攻击者会优先尝试这种组合。",
      "en": "Replacing letters with their position in the alphabet is one of the simplest substitution ciphers: knowing that A=1 and B=2 is enough to decode it by hand. The takeaway: passwords should be long and random — never append predictable pieces such as a word and a year, because attackers try those combinations first.",
      "fr": "Remplacer chaque lettre par son rang dans l'alphabet est le plus simple des chiffres de substitution : savoir que A=1 et B=2 suffit à décoder à la main. À retenir : un mot de passe doit être long et aléatoire — ne collez jamais un mot et une année à la fin, car les attaquants testent ces combinaisons en premier."
    },
    "nudges": {
      "zh": [
        "先别拼口令：把每个数字当成字母的「座位号」，回字母表里找对应字母。",
        "从最小的数字开始逐位写字母；拼完后，把题面给的年份原样接在末尾。"
      ],
      "en": [
        "Don't guess the word yet: treat each number as a letter's seat number and find that letter in the alphabet.",
        "Start from the smallest number and write one letter at a time; then append the puzzle's year unchanged."
      ],
      "fr": [
        "Ne devine pas encore le mot : chaque nombre est le numéro de place d'une lettre dans l'alphabet.",
        "Commence par le plus petit nombre et écris les lettres une à une ; ajoute ensuite l'année telle quelle."
      ]
    }
  },
  "phishing_classic": {
    "key": "phishing_classic",
    "code": "EN-02",
    "tag": {
      "zh": "钓鱼邮件",
      "en": "Phishing",
      "fr": "Phishing"
    },
    "title": {
      "zh": "钓鱼邮件识别",
      "en": "Spotting phishing emails",
      "fr": "DÉTECTION DE PHISHING"
    },
    "brief": {
      "zh": "安全团队截获了多封可疑邮件，请识别出其中的钓鱼尝试。",
      "en": "The security team intercepted several suspicious emails. Identify the phishing attempts before you fall for them.",
      "fr": "L'équipe de sécurité a intercepté plusieurs emails suspects. Identifiez les tentatives de phishing pour éviter le piège !"
    },
    "content": {
      "zh": "<p><strong>安全团队截获了 6 封邮件：</strong></p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>编号</th><th>发件人</th><th>主题</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td><span class=\"mono\">securite@bank-creditt-agricol.com</span></td><td>紧急：请验证您的账户</td></tr>\n    <tr><td>2</td><td><span class=\"mono\">notifications@paypal.com</span></td><td>月度对账单</td></tr>\n    <tr><td>3</td><td><span class=\"mono\">support@amazone-livraison.tk</span></td><td>您的订单出现问题</td></tr>\n    <tr><td>4</td><td><span class=\"mono\">admin@university-campus.edu</span></td><td>计划内维护</td></tr>\n    <tr><td>5</td><td><span class=\"mono\">security@microsoft.com</span></td><td>Office 365 安全警报</td></tr>\n    <tr><td>6</td><td><span class=\"mono\">noreply@googIe-security.ml</span></td><td>检测到可疑活动</td></tr>\n  </tbody>\n</table>\n<p><strong>任务：</strong>找出其中的钓鱼邮件，按下述格式作答。</p>\n<div class=\"note\">作答格式：邮件编号用半角逗号分隔，不加空格。示例：<strong>2,4</strong>（仅示意格式）。</div>\n<p><strong>排查线索：</strong>拼写错误、可疑域名、异常扩展名……</p>\n<div class=\"warn\"><strong>提醒：</strong>现实中不要点击可疑邮件里的链接，也不要回复或提供任何账号信息。</div>",
      "en": "<p><strong>The security team intercepted 6 emails:</strong></p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>#</th><th>Sender</th><th>Subject</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td><span class=\"mono\">securite@bank-creditt-agricol.com</span></td><td>URGENT: verify your account</td></tr>\n    <tr><td>2</td><td><span class=\"mono\">notifications@paypal.com</span></td><td>Monthly statement</td></tr>\n    <tr><td>3</td><td><span class=\"mono\">support@amazone-livraison.tk</span></td><td>Problem with your order</td></tr>\n    <tr><td>4</td><td><span class=\"mono\">admin@university-campus.edu</span></td><td>Scheduled maintenance</td></tr>\n    <tr><td>5</td><td><span class=\"mono\">security@microsoft.com</span></td><td>Office 365 security alert</td></tr>\n    <tr><td>6</td><td><span class=\"mono\">noreply@googIe-security.ml</span></td><td>Suspicious activity detected</td></tr>\n  </tbody>\n</table>\n<p><strong>Your mission:</strong> identify the phishing emails and answer in the format below.</p>\n<div class=\"note\">Answer format: email numbers separated by commas, no spaces. Example: <strong>2,4</strong> (format only).</div>\n<p><strong>Clues to look for:</strong> spelling mistakes, suspicious domains, unusual extensions…</p>\n<div class=\"warn\"><strong>Reminder:</strong> in real life, never click links in a suspicious email and never reply with account details.</div>",
      "fr": "<p><strong>L'équipe de sécurité a intercepté 6 emails :</strong></p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>N°</th><th>Expéditeur</th><th>Objet</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td><span class=\"mono\">securite@bank-creditt-agricol.com</span></td><td>Vérifiez votre compte URGENT</td></tr>\n    <tr><td>2</td><td><span class=\"mono\">notifications@paypal.com</span></td><td>Récapitulatif mensuel</td></tr>\n    <tr><td>3</td><td><span class=\"mono\">support@amazone-livraison.tk</span></td><td>Problème avec votre commande</td></tr>\n    <tr><td>4</td><td><span class=\"mono\">admin@university-campus.edu</span></td><td>Maintenance programmée</td></tr>\n    <tr><td>5</td><td><span class=\"mono\">security@microsoft.com</span></td><td>Alerte sécurité Office 365</td></tr>\n    <tr><td>6</td><td><span class=\"mono\">noreply@googIe-security.ml</span></td><td>Activité suspecte détectée</td></tr>\n  </tbody>\n</table>\n<p><strong>Votre mission :</strong> identifiez les emails de phishing et répondez au format ci-dessous.</p>\n<div class=\"note\">Format de réponse : numéros des emails séparés par des virgules, sans espaces. Exemple : <strong>2,4</strong> (format uniquement).</div>\n<p><strong>Indices à rechercher :</strong> fautes d'orthographe, domaines suspects, extensions inhabituelles…</p>\n<div class=\"warn\"><strong>Attention :</strong> dans la réalité, ne cliquez jamais sur les liens d'un email suspect et ne répondez jamais avec vos identifiants.</div>"
    },
    "answer": "1,3,6",
    "accept": [
      "1,3,6",
      "1, 3, 6",
      "1，3，6",
      "1、3、6"
    ],
    "answerNote": {
      "zh": "格式：邮件编号，用半角逗号分隔，不加空格",
      "en": "Format: email numbers separated by commas, no spaces",
      "fr": "Format : numéros des emails séparés par des virgules, sans espace"
    },
    "hints": {
      "zh": [
        "逐一核对每封邮件的发件人地址，不要只看发件人显示名。",
        "留意异常扩展名：.tk 和 .ml 常被诈骗者免费注册后用于钓鱼。",
        "再找形近字符与多余字母：creditt-agricol（多一个 t）、amazone（拼写错误）、googIe（大写 I）——这三封就是钓鱼邮件。"
      ],
      "en": [
        "Check the sender address of every email, not just the display name.",
        "Watch the extensions: .tk and .ml are often registered for free and abused by scammers.",
        "Then look for look-alike spellings and extra letters: creditt-agricol (an extra t), amazone (misspelt) and the capital I in googIe — those three are the phishing emails."
      ],
      "fr": [
        "Regardez attentivement l'adresse de chaque expéditeur, pas seulement le nom affiché.",
        "Repérez les extensions inhabituelles : .tk et .ml sont souvent enregistrées gratuitement puis utilisées par les fraudeurs.",
        "Cherchez enfin les ressemblances et les lettres en trop : creditt-agricol (un t de trop), amazone (mal orthographié) et googIe (avec un I majuscule) — ces trois emails sont les tentatives de phishing."
      ]
    },
    "explain": {
      "zh": "钓鱼邮件最常用的伪装是「形近域名」：把字母换成外形相似的字符（如 googIe 中的大写 I）、多加一个字母（creditt），或改用 .tk、.ml 这类廉价域名冒充知名品牌。可迁移的做法是——不点邮件里的链接，逐字核对发件域名，并通过官方 App 或手动输入网址处理账户问题。",
      "en": "Phishing emails usually rely on look-alike domains: swapping a letter for a similar glyph (the capital I in googIe), adding one letter (creditt), or using cheap domains such as .tk and .ml to impersonate well-known brands. The transferable habit: never click links in the email — check every letter of the sender domain and reach the service through its official app or by typing the address yourself.",
      "fr": "Les emails de phishing reposent souvent sur des domaines ressemblants : une lettre remplacée par un caractère similaire (le I majuscule de googIe), une lettre ajoutée (creditt), ou un domaine bon marché en .tk / .ml qui usurpe une marque connue. Le réflexe à garder : ne cliquez jamais sur les liens de l'email, vérifiez chaque lettre du domaine de l'expéditeur et passez par l'application officielle ou l'adresse saisie à la main."
    },
    "nudges": {
      "zh": [
        "别只读主题和翻译——把视线移到 @ 后面的域名，一个字母一个字母地看。",
        "找三类痕迹：多一个字母、少一个字母、形近字符；再核对后缀是否常见。"
      ],
      "en": [
        "Don't stop at the subject line — look at the part after the @ and read it letter by letter.",
        "Look for three traces: an extra letter, a missing letter, a look-alike character; then check the suffix."
      ],
      "fr": [
        "Ne t'arrête pas à l'objet : regarde la partie après le @ et lis-la lettre par lettre.",
        "Cherche trois traces : une lettre en trop, une lettre manquante, un caractère ressemblant ; vérifie ensuite le suffixe."
      ]
    }
  },
  "qr_classic": {
    "key": "qr_classic",
    "code": "EN-03",
    "tag": {
      "zh": "二维码",
      "en": "QR code",
      "fr": "QR code"
    },
    "title": {
      "zh": "被切碎的二维码",
      "en": "Fragmented QR code",
      "fr": "DÉCHIFFREMENT QR"
    },
    "brief": {
      "zh": "二维码被切成三块碎片，请重新拼合，取出隐藏的解密钥匙。",
      "en": "The QR code was cut into three fragments. Reassemble them to reveal the hidden decryption key.",
      "fr": "Reconstituez le QR code fragmenté pour obtenir la clé de déchiffrement !"
    },
    "content": {
      "zh": "<p>二维码被切成了三块。碎片 1 是定位图案，碎片 2 和碎片 3 保存着数据字符：</p>\n<div class=\"fragments\">\n  <div class=\"fragment\">\n    <p><strong>碎片 1</strong></p>\n    <pre class=\"code\">█████\n█ █ █\n█████</pre>\n  </div>\n  <div class=\"fragment\">\n    <p><strong>碎片 2</strong></p>\n    <pre class=\"code\">DE\nCR\nYP</pre>\n  </div>\n  <div class=\"fragment\">\n    <p><strong>碎片 3</strong></p>\n    <pre class=\"code\">T7\n##\n[]</pre>\n  </div>\n</div>\n<p>读取规则：碎片 2 每行两个字符，按「从左到右、从上到下」读出；碎片 3 只有第一行是有效数据。把两段按顺序拼起来，就是二维码隐藏的 8 位口令。</p>",
      "en": "<p>The QR code has been cut into three fragments. Fragment 1 is the finder pattern; fragments 2 and 3 carry the data characters:</p>\n<div class=\"fragments\">\n  <div class=\"fragment\">\n    <p><strong>Fragment 1</strong></p>\n    <pre class=\"code\">█████\n█ █ █\n█████</pre>\n  </div>\n  <div class=\"fragment\">\n    <p><strong>Fragment 2</strong></p>\n    <pre class=\"code\">DE\nCR\nYP</pre>\n  </div>\n  <div class=\"fragment\">\n    <p><strong>Fragment 3</strong></p>\n    <pre class=\"code\">T7\n##\n[]</pre>\n  </div>\n</div>\n<p>Reading rule: fragment 2 contains two characters per line — read each line left to right, lines from top to bottom. In fragment 3, only the first line holds valid data. Concatenate the two parts in order to get the 8-character code hidden in the QR code.</p>",
      "fr": "<p>Le QR code a été fragmenté. Le fragment 1 est le motif de repérage ; les fragments 2 et 3 contiennent les caractères de données :</p>\n<div class=\"fragments\">\n  <div class=\"fragment\">\n    <p><strong>Fragment 1</strong></p>\n    <pre class=\"code\">█████\n█ █ █\n█████</pre>\n  </div>\n  <div class=\"fragment\">\n    <p><strong>Fragment 2</strong></p>\n    <pre class=\"code\">DE\nCR\nYP</pre>\n  </div>\n  <div class=\"fragment\">\n    <p><strong>Fragment 3</strong></p>\n    <pre class=\"code\">T7\n##\n[]</pre>\n  </div>\n</div>\n<p>Règle de lecture : le fragment 2 contient deux caractères par ligne, à lire de gauche à droite puis de haut en bas ; dans le fragment 3, seule la première ligne contient des données. Concaténez les deux parties dans l'ordre pour obtenir le code de 8 caractères caché dans le QR code.</p>"
    },
    "answer": "DECRYPT7",
    "answerNote": {
      "zh": "格式：7 个大写字母 + 1 位数字（共 8 位）",
      "en": "Format: 7 uppercase letters followed by 1 digit (8 characters total)",
      "fr": "Format : 7 lettres majuscules suivies d'un chiffre (8 caractères au total)"
    },
    "hints": {
      "zh": [
        "拼出来的是一串「英文单词 + 数字」，共 8 位。",
        "碎片 2 逐行读得 DECRYP；碎片 3 的第一行以 T 开头，后面跟着一个数字。",
        "把碎片 2 的 6 个字母与碎片 3 第一行的两个字符按顺序接上，就是最终口令（末尾的数字是 7）。"
      ],
      "en": [
        "The result is an English word followed by a digit — 8 characters in total.",
        "Reading fragment 2 line by line gives DECRYP; the first line of fragment 3 starts with T and ends with a digit.",
        "Concatenate the 6 letters of fragment 2 with the two characters on the first line of fragment 3 to get the final code (the last digit is 7)."
      ],
      "fr": [
        "Le résultat est un mot anglais suivi d'un chiffre, soit 8 caractères au total.",
        "Le fragment 2 se lit ligne par ligne : DECRYP ; la première ligne du fragment 3 commence par T et se termine par un chiffre.",
        "Concaténez les 6 lettres du fragment 2 et les deux caractères de la première ligne du fragment 3 pour obtenir le code final (le chiffre final est 7)."
      ]
    },
    "explain": {
      "zh": "二维码本质上是把文本编码成黑白模块，再按行列顺序排列；只要按正确的读取顺序把碎片里的字符依次拼接，就能还原出原始内容。安全上要注意：二维码本身无法辨别真伪，扫来源不明的二维码可能直接打开钓鱼网站，所以只扫描可信来源的码，并在打开后先核对网址。",
      "en": "A QR code simply encodes text as black and white modules arranged in rows and columns; concatenate the characters in the right reading order and the original content comes back. Security note: a QR code cannot be authenticated by eye — scanning an unknown code may open a phishing site, so only scan codes from trusted sources and check the URL before interacting.",
      "fr": "Un QR code n'est rien d'autre qu'un texte encodé en modules noirs et blancs rangés en lignes et en colonnes : concaténez les caractères dans le bon ordre de lecture et le contenu d'origine réapparaît. Côté sécurité : un QR code ne se vérifie pas à l'œil — scanner un code inconnu peut ouvrir un site de phishing, donc ne scannez que des codes de confiance et vérifiez l'URL avant d'agir."
    },
    "nudges": {
      "zh": [
        "先分清楚哪块是定位图案、哪块装数据，别急着拼单词。",
        "按「从左到右、从上到下」一格一格读，跳过填充用的符号。"
      ],
      "en": [
        "Separate the finder pattern from the data first — don't rush to guess a word.",
        "Read left to right, then top to bottom, one cell at a time, and skip the filler symbols."
      ],
      "fr": [
        "Sépare d'abord le motif de repérage des données : ne devine pas un mot trop vite.",
        "Lis de gauche à droite puis de haut en bas, case par case, et ignore les symboles de remplissage."
      ]
    }
  },
  "wifi_classic": {
    "key": "wifi_classic",
    "code": "EN-04",
    "tag": {
      "zh": "无线网络",
      "en": "Wi-Fi",
      "fr": "Wi-Fi"
    },
    "title": {
      "zh": "危险的 Wi-Fi 网络",
      "en": "Dangerous Wi-Fi networks",
      "fr": "RÉSEAUX WI-FI MALVEILLANTS"
    },
    "brief": {
      "zh": "请找出这些 Wi-Fi 网络中需要避开的那几个。",
      "en": "Identify the Wi-Fi networks you should avoid.",
      "fr": "Identifiez les réseaux Wi-Fi dangereux !"
    },
    "content": {
      "zh": "<p><strong>校园里扫描到 8 个 Wi-Fi 网络：</strong></p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>编号</th><th>网络名称</th><th>安全配置</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td><span class=\"mono\">Campus-WiFi-Secure</span></td><td>WPA2，需要密码</td></tr>\n    <tr><td>2</td><td><span class=\"mono\">Eduroam</span></td><td>WPA2-Enterprise，需要身份认证</td></tr>\n    <tr><td>3</td><td><span class=\"mono\">WiFi-Gratuit</span></td><td>开放网络，无任何加密</td></tr>\n    <tr><td>4</td><td><span class=\"mono\">Bibliotheque-Etudiant</span></td><td>WPA2，密码公开张贴</td></tr>\n    <tr><td>5</td><td><span class=\"mono\">Free-Internet-Fast</span></td><td>开放网络，名称通用</td></tr>\n    <tr><td>6</td><td><span class=\"mono\">BBOX-7A2F91</span></td><td>WPA2，运营商光猫默认名称</td></tr>\n    <tr><td>7</td><td><span class=\"mono\">Campus-IT-Admin</span></td><td>WPA2，管理员专用网络</td></tr>\n    <tr><td>8</td><td><span class=\"mono\">Linksys</span></td><td>WEP，出厂默认配置</td></tr>\n  </tbody>\n</table>\n<p><strong>任务：</strong>找出应当避开的 Wi-Fi 网络，并按下述格式作答。</p>\n<div class=\"note\">作答格式：网络编号用半角逗号分隔，不加空格。示例：<strong>2,4</strong>（仅示意格式）。</div>",
      "en": "<p><strong>Eight Wi-Fi networks are detected on campus:</strong></p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>#</th><th>Network name</th><th>Security</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td><span class=\"mono\">Campus-WiFi-Secure</span></td><td>WPA2, password required</td></tr>\n    <tr><td>2</td><td><span class=\"mono\">Eduroam</span></td><td>WPA2-Enterprise, authentication required</td></tr>\n    <tr><td>3</td><td><span class=\"mono\">WiFi-Gratuit</span></td><td>Open network, no encryption</td></tr>\n    <tr><td>4</td><td><span class=\"mono\">Bibliotheque-Etudiant</span></td><td>WPA2, password publicly posted</td></tr>\n    <tr><td>5</td><td><span class=\"mono\">Free-Internet-Fast</span></td><td>Open network, generic name</td></tr>\n    <tr><td>6</td><td><span class=\"mono\">BBOX-7A2F91</span></td><td>WPA2, default carrier-box name</td></tr>\n    <tr><td>7</td><td><span class=\"mono\">Campus-IT-Admin</span></td><td>WPA2, administrator-only network</td></tr>\n    <tr><td>8</td><td><span class=\"mono\">Linksys</span></td><td>WEP, factory default configuration</td></tr>\n  </tbody>\n</table>\n<p><strong>Your mission:</strong> identify the Wi-Fi networks to avoid and answer in the format below.</p>\n<div class=\"note\">Answer format: network numbers separated by commas, no spaces. Example: <strong>2,4</strong> (format only).</div>",
      "fr": "<p><strong>Huit réseaux Wi-Fi sont détectés sur le campus :</strong></p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>N°</th><th>Nom du réseau</th><th>Sécurité</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>1</td><td><span class=\"mono\">Campus-WiFi-Secure</span></td><td>WPA2, mot de passe requis</td></tr>\n    <tr><td>2</td><td><span class=\"mono\">Eduroam</span></td><td>WPA2-Enterprise, authentification</td></tr>\n    <tr><td>3</td><td><span class=\"mono\">WiFi-Gratuit</span></td><td>Ouvert, aucune sécurité</td></tr>\n    <tr><td>4</td><td><span class=\"mono\">Bibliotheque-Etudiant</span></td><td>WPA2, mot de passe affiché</td></tr>\n    <tr><td>5</td><td><span class=\"mono\">Free-Internet-Fast</span></td><td>Ouvert, nom générique</td></tr>\n    <tr><td>6</td><td><span class=\"mono\">BBOX-7A2F91</span></td><td>WPA2, nom par défaut box</td></tr>\n    <tr><td>7</td><td><span class=\"mono\">Campus-IT-Admin</span></td><td>WPA2, réseau administrateur</td></tr>\n    <tr><td>8</td><td><span class=\"mono\">Linksys</span></td><td>WEP, configuration par défaut</td></tr>\n  </tbody>\n</table>\n<p><strong>Votre mission :</strong> identifiez les réseaux Wi-Fi à éviter et répondez au format ci-dessous.</p>\n<div class=\"note\">Format de réponse : numéros des réseaux séparés par des virgules, sans espaces. Exemple : <strong>2,4</strong> (format uniquement).</div>"
    },
    "answer": "3,5,8",
    "accept": [
      "3,5,8",
      "3, 5, 8",
      "3，5，8",
      "3、5、8"
    ],
    "answerNote": {
      "zh": "格式：网络编号，用半角逗号分隔，不加空格",
      "en": "Format: network numbers separated by commas, no spaces",
      "fr": "Format : numéros des réseaux séparés par des virgules, sans espace"
    },
    "hints": {
      "zh": [
        "先看加密方式：开放网络意味着完全不加密，同一热点下的人可以直接抓包。",
        "再查协议与配置：WEP 已被淘汰、几分钟即可破解；仍保持出厂默认配置（如 Linksys）的节点同样危险。",
        "数一数：完全开放的热点 2 个、WEP 默认配置的 1 个，把它们全部避开即可。"
      ],
      "en": [
        "Start with encryption: an open network is not encrypted at all, so anyone on the same hotspot can capture traffic.",
        "Then check the protocol and setup: WEP is obsolete and can be cracked in minutes, and a node still on its factory default configuration (e.g. Linksys) is just as dangerous.",
        "Tally them up: two fully open hotspots and one WEP node with default settings — all of them should be avoided."
      ],
      "fr": [
        "Commencez par le chiffrement : un réseau ouvert n'est pas chiffré du tout, n'importe qui sur le même point d'accès peut capturer le trafic.",
        "Vérifiez ensuite le protocole et la configuration : le WEP est obsolète et cassable en quelques minutes, et un point d'accès resté en configuration d'usine (par exemple Linksys) est tout aussi dangereux.",
        "Récapitulez : deux points d'accès entièrement ouverts et un point d'accès WEP en configuration par défaut — tous sont à éviter."
      ]
    },
    "explain": {
      "zh": "开放网络没有任何加密，攻击者可以在同一热点上抓包、伪造热点做中间人攻击；WEP 加密已被证明可在几分钟内破解，出厂默认的 SSID 和口令也早被公开。可迁移的安全习惯：优先连接 WPA2/WPA3-Enterprise 网络，关闭设备的「自动连接开放 Wi-Fi」，处理敏感事务时改用手机热点。",
      "en": "An open network has no encryption, so an attacker on the same hotspot can sniff traffic or run a rogue hotspot for a man-in-the-middle attack; WEP encryption has long been broken in minutes, and factory-default SSIDs and passwords are public knowledge. Good habits: prefer WPA2/WPA3-Enterprise networks, turn off automatic connection to open Wi-Fi, and use your phone hotspot for sensitive tasks.",
      "fr": "Un réseau ouvert n'est pas chiffré : un attaquant sur le même point d'accès peut capturer le trafic ou monter un faux hotspot pour une attaque de l'intermédiaire ; le WEP est cassable en quelques minutes et les SSID/mots de passe d'usine sont publics. Les bons réflexes : privilégier un réseau WPA2/WPA3-Enterprise, désactiver la connexion automatique aux Wi-Fi ouverts et utiliser le partage de connexion du téléphone pour les opérations sensibles."
    },
    "nudges": {
      "zh": [
        "先只看加密方式这一列，别被网络名字里的「免费」「快速」带跑。",
        "开放＝不用密码就能连；WEP＝老旧加密；默认名称和默认配置也是线索。"
      ],
      "en": [
        "Read only the security column first — don't be swayed by names like “free” or “fast”.",
        "Open means no password needed; WEP is an old cipher; default names and factory defaults are clues too."
      ],
      "fr": [
        "Regarde d'abord uniquement la colonne sécurité, sans te laisser influencer par le nom du réseau.",
        "Ouvert = pas de mot de passe ; WEP = vieux chiffrement ; noms et réglages d'usine sont aussi des indices."
      ]
    }
  },
  "backup_classic": {
    "key": "backup_classic",
    "code": "EN-05",
    "tag": {
      "zh": "备份口令",
      "en": "Backup",
      "fr": "Sauvegarde"
    },
    "title": {
      "zh": "紧急备份的口令",
      "en": "Emergency backup password",
      "fr": "RÉCUPÉRATION DE SAUVEGARDE"
    },
    "brief": {
      "zh": "请还原紧急备份的口令，它由管理员的个人信息拼成。",
      "en": "Recover the emergency backup password, which is built from the administrator's personal details.",
      "fr": "La sauvegarde d'urgence est protégée par un mot de passe personnel du responsable IT. Retrouvez-le !"
    },
    "content": {
      "zh": "<p>紧急备份由一个「个人信息拼接」的口令保护着。管理员档案如下：</p>\n<dl class=\"kv\">\n  <dt>姓名</dt><dd>Marcus Johnson</dd>\n  <dt>出生城市</dt><dd>Rome</dd>\n  <dt>宠物</dt><dd>Rex（他养的狗）</dd>\n  <dt>入职年份</dt><dd>2018</dd>\n  <dt>爱好</dt><dd>意大利旅行</dd>\n</dl>\n<p>口令沿用经典格式：<strong>[出生城市][宠物名][入职年份]</strong>。</p>",
      "en": "<p>The emergency backup is protected by a password built from personal details. Here is the administrator's profile:</p>\n<dl class=\"kv\">\n  <dt>Name</dt><dd>Marcus Johnson</dd>\n  <dt>Birth city</dt><dd>Rome</dd>\n  <dt>Pet</dt><dd>Rex (his dog)</dd>\n  <dt>Hire year</dt><dd>2018</dd>\n  <dt>Hobby</dt><dd>Travels in Italy</dd>\n</dl>\n<p>The password follows the classic pattern: <strong>[birth city][pet name][hire year]</strong>.</p>",
      "fr": "<p>La sauvegarde d'urgence est protégée par un mot de passe personnel du responsable IT :</p>\n<dl class=\"kv\">\n  <dt>Nom</dt><dd>Marcus Johnson</dd>\n  <dt>Ville de naissance</dt><dd>Rome</dd>\n  <dt>Animal préféré</dt><dd>Rex (son chien)</dd>\n  <dt>Année d'embauche</dt><dd>2018</dd>\n  <dt>Passion</dt><dd>Voyages en Italie</dd>\n</dl>\n<p>Le mot de passe suit le pattern classique : <strong>[lieu][animal][année]</strong>.</p>"
    },
    "answer": "RomeRex2018",
    "answerNote": {
      "zh": "格式：[出生城市][宠物名][入职年份]，每部分首字母大写，不加空格",
      "en": "Format: [birth city][pet name][hire year], each part capitalised, no spaces",
      "fr": "Format : [ville][animal][année], une majuscule au début de chaque partie, sans espace"
    },
    "hints": {
      "zh": [
        "口令由三段依次拼接：出生城市、宠物名、入职年份。",
        "三段都藏在管理员档案里：城市是意大利的首都，宠物是他那只狗的名字，年份取他的入职年份。",
        "按格式拼起来：Rome + Rex + 2018，每段首字母大写、中间不加空格。"
      ],
      "en": [
        "The password is three parts concatenated in order: birth city, pet name, hire year.",
        "All three come from the profile: the city is the capital of Italy, the pet is his dog's name, and the year is the year he was hired.",
        "Put them together: Rome + Rex + 2018 — capitalise each part and add no spaces."
      ],
      "fr": [
        "Le mot de passe est composé de trois parties concaténées dans cet ordre : ville de naissance, nom de l'animal, année d'embauche.",
        "Les trois se trouvent dans le profil : la ville est la capitale de l'Italie, l'animal est le nom de son chien et l'année est celle de son embauche.",
        "Assemblez-les : Rome + Rex + 2018 — une majuscule au début de chaque partie, sans espace."
      ]
    },
    "explain": {
      "zh": "出生地、宠物名、入职年份这类信息很容易从社交媒体和公开资料里收集齐，用它们拼口令正是社会工程学的典型切入点。安全实践：口令应由密码管理器生成和保管的随机字符串承担，重要备份与账户一律开启双因素认证。",
      "en": "Details such as a birthplace, a pet's name and a hire year are easy to collect from social media and public records — combining them into a password is a classic social-engineering entry point. Security practice: let a password manager generate and store random passwords, and enable two-factor authentication on important backups and accounts.",
      "fr": "Le lieu de naissance, le nom de l'animal, l'année d'embauche : ces informations se collectent facilement sur les réseaux sociaux et dans les documents publics, et les assembler en mot de passe est une entrée classique d'ingénierie sociale. Bonne pratique : laisser un gestionnaire de mots de passe générer et conserver des chaînes aléatoires, et activer la double authentification sur les sauvegardes et comptes sensibles."
    },
    "nudges": {
      "zh": [
        "先把三类信息各写一行放在旁边，别急着拼——顺序错了会白搭。",
        "照题面方括号的顺序摆好三段，再只调整大小写和空格。"
      ],
      "en": [
        "Write the three details on separate lines first — don't rush to join them, the wrong order wastes the answer.",
        "Put the three parts in the bracket order from the puzzle, then adjust only capitals and spaces."
      ],
      "fr": [
        "Écris d'abord les trois informations sur trois lignes : ne les assemble pas trop vite, l'ordre compte.",
        "Place les trois parties dans l'ordre des crochets de l'énigme, puis ne règle que majuscules et espaces."
      ]
    }
  },
  "master_classic": {
    "key": "master_classic",
    "code": "EN-06",
    "tag": {
      "zh": "综合推算",
      "en": "Master code",
      "fr": "Code maître"
    },
    "title": {
      "zh": "最终主控代码",
      "en": "Final master code",
      "fr": "CODE MAÎTRE FINAL"
    },
    "brief": {
      "zh": "请算出能终止攻击的主控代码。",
      "en": "Work out the master code that neutralises the attack.",
      "fr": "Calculez le code de neutralisation de l'attaque !"
    },
    "content": {
      "zh": "<p>用前五关得到的数据，按下面的公式算出总数值：</p>\n<div class=\"data-block\">\n  <ul>\n    <li>第一关口令中的年份：<strong>2024</strong></li>\n    <li>第二关识别出的钓鱼邮件数量：<strong>3</strong></li>\n    <li>第三关口令中 DECRYPT 后面的数字：<strong>7</strong></li>\n    <li>第四关应避开的危险 Wi-Fi 数量：<strong>3</strong></li>\n    <li>第五关年份 2018 的各位数字之和：<strong>2+0+1+8 = 11</strong></li>\n  </ul>\n  <p><strong>总计</strong> = 2024 + 3 + 7 + 3 + 11</p>\n</div>\n<p>把总数值对照下面的码表，找出对应的主控代码：</p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>总数值</th><th>主控代码</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>2048</td><td><span class=\"mono\">REVENGE</span></td></tr>\n    <tr><td>2049</td><td><span class=\"mono\">SECURE</span></td></tr>\n    <tr><td>2050</td><td><span class=\"mono\">DEFEND</span></td></tr>\n    <tr><td>2051</td><td><span class=\"mono\">VICTORY</span></td></tr>\n  </tbody>\n</table>",
      "en": "<p>Use the data from the first five enigmas and compute the total with the formula below:</p>\n<div class=\"data-block\">\n  <ul>\n    <li>Year in the first password: <strong>2024</strong></li>\n    <li>Number of phishing emails identified in enigma 2: <strong>3</strong></li>\n    <li>Digit after DECRYPT in the enigma 3 code: <strong>7</strong></li>\n    <li>Number of dangerous Wi-Fi networks to avoid in enigma 4: <strong>3</strong></li>\n    <li>Sum of the digits of the year 2018: <strong>2+0+1+8 = 11</strong></li>\n  </ul>\n  <p><strong>Total</strong> = 2024 + 3 + 7 + 3 + 11</p>\n</div>\n<p>Look up the total in the code table below to find the matching master code:</p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>Total</th><th>Master code</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>2048</td><td><span class=\"mono\">REVENGE</span></td></tr>\n    <tr><td>2049</td><td><span class=\"mono\">SECURE</span></td></tr>\n    <tr><td>2050</td><td><span class=\"mono\">DEFEND</span></td></tr>\n    <tr><td>2051</td><td><span class=\"mono\">VICTORY</span></td></tr>\n  </tbody>\n</table>",
      "fr": "<p>Utilisez les données des cinq premières énigmes et calculez le total avec la formule ci-dessous :</p>\n<div class=\"data-block\">\n  <ul>\n    <li>Année du mot de passe de la 1re énigme : <strong>2024</strong></li>\n    <li>Nombre d'emails de phishing de la 2e énigme : <strong>3</strong></li>\n    <li>Chiffre situé après DECRYPT dans le code de la 3e énigme : <strong>7</strong></li>\n    <li>Nombre de réseaux Wi-Fi dangereux de la 4e énigme : <strong>3</strong></li>\n    <li>Somme des chiffres de l'année 2018 : <strong>2+0+1+8 = 11</strong></li>\n  </ul>\n  <p><strong>Total</strong> = 2024 + 3 + 7 + 3 + 11</p>\n</div>\n<p>Cherchez ce total dans la table de codes ci-dessous pour trouver le code maître correspondant :</p>\n<table class=\"data-table\">\n  <thead>\n    <tr><th>Total</th><th>Code maître</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>2048</td><td><span class=\"mono\">REVENGE</span></td></tr>\n    <tr><td>2049</td><td><span class=\"mono\">SECURE</span></td></tr>\n    <tr><td>2050</td><td><span class=\"mono\">DEFEND</span></td></tr>\n    <tr><td>2051</td><td><span class=\"mono\">VICTORY</span></td></tr>\n  </tbody>\n</table>"
    },
    "answer": "REVENGE",
    "answerNote": {
      "zh": "格式：1 个大写英文单词",
      "en": "Format: one uppercase English word",
      "fr": "Format : un mot anglais en majuscules"
    },
    "hints": {
      "zh": [
        "把 5 个数值相加：2024 + 3 + 7 + 3 + 11。",
        "总和是 2048。",
        "在码表中找到总数值 2048 所在的那一行，读出右侧的代码即可。"
      ],
      "en": [
        "Add the five values: 2024 + 3 + 7 + 3 + 11.",
        "The total is 2048.",
        "Find the row whose total is 2048 in the code table and read the code on its right."
      ],
      "fr": [
        "Additionnez les cinq valeurs : 2024 + 3 + 7 + 3 + 11.",
        "Le total est 2048.",
        "Trouvez dans la table la ligne dont le total vaut 2048 et lisez le code à sa droite."
      ]
    },
    "explain": {
      "zh": "把前几关的线索按公式汇总、再对照码表查出结果，本质上是一次「数据串联 + 索引映射」：单独的线索价值有限，串起来才能定位最终目标。现实中，能生成「主控代码」的密钥必须离线保管、分级授权并全程审计，避免一个环节失守导致全线失陷。",
      "en": "Collecting clues from earlier levels, summing them with a formula and looking the result up in a table is essentially data chaining plus index mapping: a single clue has little value until the pieces are linked. In real systems, keys that can generate a master code must be stored offline, access-controlled and fully audited, so that one compromised link does not bring down the whole chain.",
      "fr": "Rassembler les indices des énigmes précédentes, les additionner selon une formule puis consulter une table, c'est un enchaînement de données doublé d'une correspondance d'index : un indice isolé vaut peu, c'est leur mise en relation qui révèle la cible. En conditions réelles, les clés capables de générer un « code maître » doivent être conservées hors ligne, soumises à des droits hiérarchisés et auditées, pour qu'un seul maillon compromis ne fasse pas tomber toute la chaîne."
    },
    "nudges": {
      "zh": [
        "回题面把五段数据逐项核对，尤其别漏掉「各位数字之和」那一条。",
        "把加法拆成两步：先算前两项，再逐项累加；算出总数后再去表里定位。"
      ],
      "en": [
        "Go back to the puzzle and re-check all five data points, especially the digit-sum line.",
        "Split the addition in two: add the first two values, then add the rest one by one; only then look up the total."
      ],
      "fr": [
        "Reviens à l'énigme et vérifie les cinq données une par une, surtout la ligne de la somme des chiffres.",
        "Coupe l'addition en deux : d'abord les deux premières valeurs, puis les suivantes ; cherche le total seulement après."
      ]
    }
  }
};
