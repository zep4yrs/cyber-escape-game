/* ==========================================================================
   进阶模式（原 game.html）· 关卡数据（zh / en / fr）
   --------------------------------------------------------------------------
   内容来源：game.html 内联 ENIGMAS 数组，答案与原关卡保持一致。
   本文件只注册数据，不含渲染与判定逻辑；关卡顺序见 js/data/scenarios.js。
   题面只使用主题 CSS 约定的标签与类名，无内联样式、无图标字符。
   ========================================================================== */
window.ENIGMAS = window.ENIGMAS || {};

Object.assign(window.ENIGMAS, {
  /* EN-01 · 原 game.html 第 1 关：取 CYBERSECURITY 的奇数位字母 + 年份后缀 */
  pwd_intercept: {
    key: 'pwd_intercept',
    code: 'EN-01',
    tag: { zh: '口令重建', en: 'Password', fr: 'Mot de passe' },
    title: {
      zh: '被截获的管理员口令',
      en: 'Intercepted administrator password',
      fr: 'Mot de passe administrateur intercepté'
    },
    brief: {
      zh: '攻击者截获了三段内部通信，请从碎片线索中还原管理员口令。',
      en: 'Attackers intercepted three internal messages. Rebuild the administrator password from the fragments.',
      fr: 'Les hackers ont intercepté trois communications internes. Reconstituez le mot de passe administrateur à partir des fragments.'
    },
    content: {
      zh: `
        <p><strong>被截获的通信：</strong></p>
        <div class="data-block">
          <p><strong>邮件 1（IT 经理）：</strong>「新口令沿用我们的老规则：取 CYBERSECURITY 的奇数位字母。」</p>
          <p><strong>短信（管理员）：</strong>「位置 1,3,5,7,9,11。老习惯：把提取出的第 4、5 个字母对调。后缀 = 2024。」</p>
          <p><strong>内部便笺：</strong>「最终格式：[提取出的字母][年份]」</p>
        </div>
        <p><strong>任务：</strong>还原完整的管理员口令。</p>
      `,
      en: `
        <p><strong>Intercepted communications:</strong></p>
        <div class="data-block">
          <p><strong>Email 1 (IT manager):</strong> "The new password follows our old rule: take the ODD-position letters of CYBERSECURITY."</p>
          <p><strong>SMS (admin):</strong> "Positions 1,3,5,7,9,11 of the word CYBERSECURITY. Usual habit: swap the 4th and 5th extracted letters. Suffix = 2024."</p>
          <p><strong>Internal note:</strong> "Final format: [EXTRACTED_LETTERS][YEAR]"</p>
        </div>
        <p><strong>Mission:</strong> rebuild the full administrator password.</p>
      `,
      fr: `
        <p><strong>Communications interceptées :</strong></p>
        <div class="data-block">
          <p><strong>E-mail 1 (responsable IT) :</strong> « Le nouveau mot de passe suit notre ancienne règle : prenez les lettres IMPAIRES de CYBERSECURITY. »</p>
          <p><strong>SMS (administrateur) :</strong> « Positions 1,3,5,7,9,11 du mot CYBERSECURITY. Habitude maison : échangez les 4e et 5e lettres extraites. Suffixe = 2024. »</p>
          <p><strong>Note interne :</strong> « Format final : [LETTRES_EXTRAITES][ANNÉE] »</p>
        </div>
        <p><strong>Mission :</strong> reconstituez le mot de passe administrateur complet.</p>
      `
    },
    answer: 'CBRUEI2024',
    answerNote: {
      zh: '格式：6 个大写字母 + 4 位年份，中间无空格',
      en: 'Format: 6 uppercase letters + 4-digit year, no spaces',
      fr: 'Format : 6 lettres majuscules + année sur 4 chiffres, sans espace'
    },
    accept: ['CBRUEI2024', 'cbruei2024'],
    hints: {
      zh: [
        'CYBERSECURITY 共 13 个字母，先给它逐位编号，再挑出所有奇数位。',
        '按位编号：C(1) Y(2) B(3) E(4) R(5) S(6) E(7) C(8) U(9) R(10) I(11) T(12) Y(13)；奇数位依次是 C、B、R、E、U、I。',
        '按短信要求把第 4、5 个字母对调：C、B、R、U、E、I，再接上后缀 2024 即可。'
      ],
      en: [
        'CYBERSECURITY has 13 letters. Number them and keep only the odd positions.',
        'Numbering: C(1) Y(2) B(3) E(4) R(5) S(6) E(7) C(8) U(9) R(10) I(11) T(12) Y(13); the odd positions give C, B, R, E, U, I.',
        'Swap the 4th and 5th extracted letters as the SMS asks: C, B, R, U, E, I; then append the 2024 suffix.'
      ],
      fr: [
        'CYBERSECURITY compte 13 lettres. Numérotez-les, puis ne gardez que les positions impaires.',
        'Numérotation : C(1) Y(2) B(3) E(4) R(5) S(6) E(7) C(8) U(9) R(10) I(11) T(12) Y(13) ; les positions impaires donnent C, B, R, E, U, I.',
        'Échangez les 4e et 5e lettres extraites comme demandé par le SMS : C, B, R, U, E, I ; ajoutez le suffixe 2024.'
      ]
    },
    explain: {
      zh: '「取奇数位」这类规律变换只是把口令换了个写法，并不增加熵：攻击者一旦猜到规则，就能立刻还原。可迁移实践：不要用可预测的规则派生口令，改用密码管理器生成随机长口令，并为重要账号开启双因素认证。',
      en: 'Deriving a password with a predictable rule (take the odd letters) provides no real security: once an attacker guesses the rule, the password is recovered instantly. Good practice: never derive passwords from rules — generate random ones with a password manager and enable two-factor authentication on important accounts.',
      fr: 'Dériver un mot de passe par une règle prévisible (prendre les lettres impaires) n\'apporte aucune sécurité : si l\'attaquant devine la règle, il reconstitue le mot de passe immédiatement. À retenir : ne dérivez pas vos mots de passe d\'une règle ; générez-les au hasard avec un gestionnaire de mots de passe et activez la double authentification sur les comptes sensibles.'
    }
  },

  /* EN-02 · 原 game.html 第 2 关：邮件头 SPF / DKIM 与仿冒域名识别 */
  email_forensics: {
    key: 'email_forensics',
    code: 'EN-02',
    tag: { zh: '邮件取证', en: 'Email', fr: 'E-mail' },
    title: {
      zh: '邮件头取证分析',
      en: 'Email header forensics',
      fr: 'Analyse forensique d\'e-mails'
    },
    brief: {
      zh: '分析邮件头中的发件域名与认证结果，找出所有可疑邮件。',
      en: 'Analyse the sender domains and authentication results in the email headers, and find every suspicious email.',
      fr: 'Analysez les domaines expéditeurs et les résultats d\'authentification des en-têtes, puis identifiez tous les e-mails suspects.'
    },
    content: {
      zh: `
        <p><strong>任务：</strong>只根据下方的发件人与认证结果，找出所有可疑邮件。</p>
        <div class="note">作答格式：邮件编号按从小到大排列，用英文逗号分隔，例如 <span class="mono">2,4,6</span>。</div>
        <table class="data-table">
          <thead>
            <tr><th>编号</th><th>发件人</th><th>SPF</th><th>DKIM</th><th>主题</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><span class="mono">security@payp4l.com</span></td><td>FAIL</td><td>PASS</td><td>Urgent verification needed</td></tr>
            <tr><td>2</td><td><span class="mono">admin@university-paris.edu</span></td><td>PASS</td><td>PASS</td><td>System maintenance tonight</td></tr>
            <tr><td>3</td><td><span class="mono">support@microsooft.com</span></td><td>PASS</td><td>FAIL</td><td>Account suspended</td></tr>
            <tr><td>4</td><td><span class="mono">notifications@github.com</span></td><td>PASS</td><td>PASS</td><td>Push to main branch</td></tr>
            <tr><td>5</td><td><span class="mono">noreply@amazon.co</span></td><td>PASS</td><td>PASS</td><td>Order confirmation #A7821</td></tr>
            <tr><td>6</td><td><span class="mono">alerts@bank-agricole.fr</span></td><td>PASS</td><td>PASS</td><td>Transaction alert</td></tr>
            <tr><td>7</td><td><span class="mono">service@gmai1.com</span></td><td>FAIL</td><td>FAIL</td><td>Storage full notification</td></tr>
            <tr><td>8</td><td><span class="mono">team@slack.com</span></td><td>PASS</td><td>PASS</td><td>New message from @john</td></tr>
          </tbody>
        </table>
        <div class="warn"><strong>注意：</strong>在核对发件域名之前，不要点击邮件中的链接，也不要在邮件页面输入任何账号凭据。</div>
      `,
      en: `
        <p><strong>Mission:</strong> using only the sender and authentication data below, find every suspicious email.</p>
        <div class="note">Answer format: email numbers in ascending order, separated by commas, e.g. <span class="mono">2,4,6</span>.</div>
        <table class="data-table">
          <thead>
            <tr><th>No.</th><th>Sender</th><th>SPF</th><th>DKIM</th><th>Subject</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><span class="mono">security@payp4l.com</span></td><td>FAIL</td><td>PASS</td><td>Urgent verification needed</td></tr>
            <tr><td>2</td><td><span class="mono">admin@university-paris.edu</span></td><td>PASS</td><td>PASS</td><td>System maintenance tonight</td></tr>
            <tr><td>3</td><td><span class="mono">support@microsooft.com</span></td><td>PASS</td><td>FAIL</td><td>Account suspended</td></tr>
            <tr><td>4</td><td><span class="mono">notifications@github.com</span></td><td>PASS</td><td>PASS</td><td>Push to main branch</td></tr>
            <tr><td>5</td><td><span class="mono">noreply@amazon.co</span></td><td>PASS</td><td>PASS</td><td>Order confirmation #A7821</td></tr>
            <tr><td>6</td><td><span class="mono">alerts@bank-agricole.fr</span></td><td>PASS</td><td>PASS</td><td>Transaction alert</td></tr>
            <tr><td>7</td><td><span class="mono">service@gmai1.com</span></td><td>FAIL</td><td>FAIL</td><td>Storage full notification</td></tr>
            <tr><td>8</td><td><span class="mono">team@slack.com</span></td><td>PASS</td><td>PASS</td><td>New message from @john</td></tr>
          </tbody>
        </table>
        <div class="warn"><strong>Caution:</strong> before checking the sender domain, do not click any link in the email and do not type credentials on the page it opens.</div>
      `,
      fr: `
        <p><strong>Mission :</strong> à partir des seuls expéditeurs et résultats d'authentification ci-dessous, identifiez tous les e-mails suspects.</p>
        <div class="note">Format de réponse : numéros d'e-mails par ordre croissant, séparés par des virgules, par exemple <span class="mono">2,4,6</span>.</div>
        <table class="data-table">
          <thead>
            <tr><th>N°</th><th>Expéditeur</th><th>SPF</th><th>DKIM</th><th>Objet</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td><span class="mono">security@payp4l.com</span></td><td>FAIL</td><td>PASS</td><td>Urgent verification needed</td></tr>
            <tr><td>2</td><td><span class="mono">admin@university-paris.edu</span></td><td>PASS</td><td>PASS</td><td>System maintenance tonight</td></tr>
            <tr><td>3</td><td><span class="mono">support@microsooft.com</span></td><td>PASS</td><td>FAIL</td><td>Account suspended</td></tr>
            <tr><td>4</td><td><span class="mono">notifications@github.com</span></td><td>PASS</td><td>PASS</td><td>Push to main branch</td></tr>
            <tr><td>5</td><td><span class="mono">noreply@amazon.co</span></td><td>PASS</td><td>PASS</td><td>Order confirmation #A7821</td></tr>
            <tr><td>6</td><td><span class="mono">alerts@bank-agricole.fr</span></td><td>PASS</td><td>PASS</td><td>Transaction alert</td></tr>
            <tr><td>7</td><td><span class="mono">service@gmai1.com</span></td><td>FAIL</td><td>FAIL</td><td>Storage full notification</td></tr>
            <tr><td>8</td><td><span class="mono">team@slack.com</span></td><td>PASS</td><td>PASS</td><td>New message from @john</td></tr>
          </tbody>
        </table>
        <div class="warn"><strong>Attention :</strong> avant de vérifier le domaine de l'expéditeur, ne cliquez sur aucun lien et ne saisissez aucun identifiant sur la page ouverte.</div>
      `
    },
    answer: '1,3,5,7',
    answerNote: {
      zh: '格式：邮件编号用英文逗号分隔，按升序排列，不加空格',
      en: 'Format: email numbers separated by commas, ascending, no spaces',
      fr: 'Format : numéros d\'e-mails séparés par des virgules, par ordre croissant, sans espace'
    },
    accept: ['1,3,5,7', '1, 3, 5, 7', '1、3、5、7', '1357'],
    hints: {
      zh: [
        '先逐个核对发件域名：有没有用数字或形近字母替换（payp4l、gmai1、microsooft），或者顶级域不对（amazon.co 而非 amazon.com）？',
        '再看认证列：SPF 或 DKIM 只要出现 FAIL，就说明这封信的发件人身份未通过验证。',
        '域名可疑或认证失败的一共有四封，编号都是奇数；按升序写出来即可。'
      ],
      en: [
        'Check each sender domain first: any digit or look-alike substitution (payp4l, gmai1, microsooft), or a wrong top-level domain (amazon.co instead of amazon.com)?',
        'Then read the authentication columns: any SPF or DKIM FAIL means the sender identity was not verified.',
        'Four emails fail on domain or authentication, and all four have odd numbers; list them in ascending order.'
      ],
      fr: [
        'Vérifiez d\'abord chaque domaine expéditeur : substitution par un chiffre ou un caractère proche (payp4l, gmai1, microsooft), ou mauvaise extension (amazon.co au lieu de amazon.com) ?',
        'Regardez ensuite les colonnes d\'authentification : un SPF ou un DKIM en FAIL signifie que l\'identité de l\'expéditeur n\'est pas vérifiée.',
        'Quatre e-mails échouent sur le domaine ou l\'authentification, et tous les quatre portent un numéro impair ; listez-les par ordre croissant.'
      ]
    },
    explain: {
      zh: 'SPF 与 DKIM 是邮件身份认证机制：前者校验发件服务器是否被该域名授权，后者用数字签名证明邮件未被伪造或篡改；任一失败都应高度警惕。可迁移实践：核对发件人的完整域名（留意同形字符与错误顶级域），重要账号一律开启双因素认证。',
      en: 'SPF and DKIM authenticate email senders: SPF checks that the sending server is authorised by the domain, and DKIM uses a digital signature to prove the message was not forged or altered. A single FAIL deserves suspicion. Good practice: always verify the full sender domain (look-alike characters, wrong top-level domain) and enable two-factor authentication on important accounts.',
      fr: 'SPF et DKIM sont des mécanismes d\'authentification des e-mails : SPF vérifie que le serveur expéditeur est autorisé par le domaine, DKIM vérifie par signature numérique que le message n\'a pas été usurpé ni modifié. Un seul échec doit suffire à éveiller la méfiance. À retenir : vérifiez toujours le domaine complet de l\'expéditeur (homoglyphes, mauvaise extension) et activez la double authentification sur les comptes importants.'
    }
  },

  /* EN-03 · 原 game.html 第 3 关：ROT-13 解出 RESECURITY */
  rot13: {
    key: 'rot13',
    code: 'EN-03',
    tag: { zh: '古典密码', en: 'Cipher', fr: 'Chiffrement' },
    title: {
      zh: '改写版凯撒密码',
      en: 'Modified Caesar cipher',
      fr: 'Cryptanalyse César modifié'
    },
    brief: {
      zh: '系统遭到一版定制加密的破坏，破解密文即可取回恢复密钥。',
      en: 'The system was compromised by a custom encryption. Break the cipher to recover the restoration key.',
      fr: 'Le système a été compromis par un chiffrement personnalisé. Cassez le code pour obtenir la clé de restauration.'
    },
    content: {
      zh: `
        <p><strong>被截获的密文：</strong></p>
        <pre class="code">ERFRPHEVGL</pre>
        <div class="data-block">
          <p><strong>日志中的上下文：</strong></p>
          <ul>
            <li>检测到的算法：ROT-13（字母表整体平移 13 位）</li>
            <li>攻击者留言：「我用的就是经典的 ROT-13。」</li>
            <li>解密后的明文即恢复密钥。</li>
          </ul>
        </div>
        <p><strong>目标：</strong>用 ROT-13 解出恢复密钥。</p>
      `,
      en: `
        <p><strong>Intercepted ciphertext:</strong></p>
        <pre class="code">ERFRPHEVGL</pre>
        <div class="data-block">
          <p><strong>Context found in the logs:</strong></p>
          <ul>
            <li>Detected algorithm: ROT-13 (shift of 13 letters in the alphabet)</li>
            <li>Attacker's note: "I used the classic ROT-13."</li>
            <li>The decrypted plaintext is the restoration key.</li>
          </ul>
        </div>
        <p><strong>Objective:</strong> decrypt the message with ROT-13.</p>
      `,
      fr: `
        <p><strong>Message chiffré intercepté :</strong></p>
        <pre class="code">ERFRPHEVGL</pre>
        <div class="data-block">
          <p><strong>Contexte trouvé dans les journaux :</strong></p>
          <ul>
            <li>Algorithme détecté : ROT-13 (décalage de 13 lettres)</li>
            <li>Note de l'attaquant : « J'ai utilisé le classique ROT-13. »</li>
            <li>Le message déchiffré donne la clé de restauration.</li>
          </ul>
        </div>
        <p><strong>Objectif :</strong> déchiffrez le message avec ROT-13.</p>
      `
    },
    answer: 'RESECURITY',
    answerNote: {
      zh: '格式：10 个大写字母，无空格',
      en: 'Format: 10 uppercase letters, no spaces',
      fr: 'Format : 10 lettres majuscules, sans espace'
    },
    accept: ['RESECURITY', 'resecurity'],
    hints: {
      zh: [
        'ROT-13 把每个字母沿字母表平移 13 位；因为 13 + 13 = 26，加密和解密是同一个操作。',
        '逐字母对映：E→R、R→E、F→S、R→E、P→C、H→U、E→R、V→I、G→T、L→Y。',
        '把 10 个结果字母依次连起来就是恢复密钥；它由 RE 和 SECURITY 两部分组成。'
      ],
      en: [
        'ROT-13 shifts every letter 13 places along the alphabet; since 13 + 13 = 26, encryption and decryption are the same operation.',
        'Letter by letter: E→R, R→E, F→S, R→E, P→C, H→U, E→R, V→I, G→T, L→Y.',
        'Join the ten resulting letters in order to get the restoration key; it reads as RE + SECURITY.'
      ],
      fr: [
        'ROT-13 décale chaque lettre de 13 positions dans l\'alphabet ; comme 13 + 13 = 26, chiffrer et déchiffrer sont la même opération.',
        'Lettre par lettre : E→R, R→E, F→S, R→E, P→C, H→U, E→R, V→I, G→T, L→Y.',
        'Concaténez les dix lettres obtenues pour former la clé de récupération ; elle se lit RE + SECURITY.'
      ]
    },
    explain: {
      zh: 'ROT-13 是固定偏移的替换密码：对称、可逆，但计算强度为零，一段脚本毫秒级即可破解。可迁移实践：固定偏移或替换不等于加密；敏感数据应使用 AES 等现代算法，口令存储应使用 Argon2、bcrypt 等加盐慢哈希。',
      en: 'ROT-13 is a fixed-shift substitution cipher: symmetric and reversible, but with no computational strength at all — a one-line script breaks it in milliseconds. Good practice: a fixed shift or substitution is not encryption; protect sensitive data with AES or another modern cipher, and store passwords with a slow salted hash such as Argon2 or bcrypt.',
      fr: 'ROT-13 est un chiffrement par substitution à décalage fixe : symétrique et réversible, mais sans aucune résistance au calcul — un simple script le casse en une fraction de seconde. À retenir : un décalage ou une substitution fixe n\'est pas du chiffrement ; pour des données sensibles, utilisez AES ou un algorithme moderne, et pour stocker des mots de passe, un hachage lent salé comme Argon2 ou bcrypt.'
    }
  },

  /* EN-04 · 原 game.html 第 4 关：WEP / 开放网络 / WPS + 默认配置 三个高风险项 */
  wifi_audit: {
    key: 'wifi_audit',
    code: 'EN-04',
    tag: { zh: '网络审计', en: 'Wi-Fi', fr: 'Wi-Fi' },
    title: {
      zh: '无线网络安全审计',
      en: 'Wireless network audit',
      fr: 'Audit de sécurité réseau'
    },
    brief: {
      zh: '审计一份无线网络清单，找出可被直接利用的高风险配置。',
      en: 'Audit a list of wireless networks and find the configurations that can be exploited directly.',
      fr: 'Auditez une liste de réseaux sans fil et identifiez les configurations directement exploitables.'
    },
    content: {
      zh: `
        <p><strong>审计对象：</strong>扫描到的 8 个无线网络。</p>
        <div class="note">作答格式：网络编号按从小到大排列，用英文逗号分隔，例如 <span class="mono">1,3,6</span>。</div>
        <table class="data-table">
          <thead>
            <tr><th>编号</th><th>SSID</th><th>加密方式</th><th>关键配置</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Campus-WiFi-5G</td><td>WPA3</td><td>Password: Random64char · MAC Filtering: ON</td></tr>
            <tr><td>2</td><td>NETGEAR_DEFAULT</td><td>WEP</td><td>Password: "password123" · Broadcast: ON</td></tr>
            <tr><td>3</td><td>IT-Department-Secure</td><td>WPA2-Enterprise</td><td>RADIUS Auth · Hidden SSID</td></tr>
            <tr><td>4</td><td>Guest-Network</td><td>OPEN</td><td>Captive Portal · Bandwidth: Limited</td></tr>
            <tr><td>5</td><td>Conference-Room-A</td><td>WPA2</td><td>Password: ConferenceRoom2024! · Guest Access</td></tr>
            <tr><td>6</td><td>Eduroam</td><td>WPA2-Enterprise</td><td>Certificate Auth · Academic Network</td></tr>
            <tr><td>7</td><td>TP-Link_8A7B</td><td>WPS Enabled</td><td>Default Admin · Firmware: 2019</td></tr>
            <tr><td>8</td><td>Administration</td><td>WPA3</td><td>Certificate + Biometric · Air-gapped</td></tr>
          </tbody>
        </table>
        <div class="warn"><strong>注意：</strong>以上为教学模拟数据，请勿在真实环境中尝试连接来源不明的无线网络。</div>
        <p><strong>任务：</strong>找出存在严重安全风险、可被直接利用的网络。</p>
      `,
      en: `
        <p><strong>Audit target:</strong> eight scanned wireless networks.</p>
        <div class="note">Answer format: network numbers in ascending order, separated by commas, e.g. <span class="mono">1,3,6</span>.</div>
        <table class="data-table">
          <thead>
            <tr><th>No.</th><th>SSID</th><th>Encryption</th><th>Configuration</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Campus-WiFi-5G</td><td>WPA3</td><td>Password: Random64char · MAC Filtering: ON</td></tr>
            <tr><td>2</td><td>NETGEAR_DEFAULT</td><td>WEP</td><td>Password: "password123" · Broadcast: ON</td></tr>
            <tr><td>3</td><td>IT-Department-Secure</td><td>WPA2-Enterprise</td><td>RADIUS Auth · Hidden SSID</td></tr>
            <tr><td>4</td><td>Guest-Network</td><td>OPEN</td><td>Captive Portal · Bandwidth: Limited</td></tr>
            <tr><td>5</td><td>Conference-Room-A</td><td>WPA2</td><td>Password: ConferenceRoom2024! · Guest Access</td></tr>
            <tr><td>6</td><td>Eduroam</td><td>WPA2-Enterprise</td><td>Certificate Auth · Academic Network</td></tr>
            <tr><td>7</td><td>TP-Link_8A7B</td><td>WPS Enabled</td><td>Default Admin · Firmware: 2019</td></tr>
            <tr><td>8</td><td>Administration</td><td>WPA3</td><td>Certificate + Biometric · Air-gapped</td></tr>
          </tbody>
        </table>
        <div class="warn"><strong>Caution:</strong> this is simulated teaching data; do not try to connect to unknown wireless networks in a real environment.</div>
        <p><strong>Mission:</strong> find the networks with critical, directly exploitable weaknesses.</p>
      `,
      fr: `
        <p><strong>Cible de l'audit :</strong> huit réseaux sans fil détectés.</p>
        <div class="note">Format de réponse : numéros de réseaux par ordre croissant, séparés par des virgules, par exemple <span class="mono">1,3,6</span>.</div>
        <table class="data-table">
          <thead>
            <tr><th>N°</th><th>SSID</th><th>Chiffrement</th><th>Configuration</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Campus-WiFi-5G</td><td>WPA3</td><td>Password: Random64char · MAC Filtering: ON</td></tr>
            <tr><td>2</td><td>NETGEAR_DEFAULT</td><td>WEP</td><td>Password: "password123" · Broadcast: ON</td></tr>
            <tr><td>3</td><td>IT-Department-Secure</td><td>WPA2-Enterprise</td><td>RADIUS Auth · Hidden SSID</td></tr>
            <tr><td>4</td><td>Guest-Network</td><td>OPEN</td><td>Captive Portal · Bandwidth: Limited</td></tr>
            <tr><td>5</td><td>Conference-Room-A</td><td>WPA2</td><td>Password: ConferenceRoom2024! · Guest Access</td></tr>
            <tr><td>6</td><td>Eduroam</td><td>WPA2-Enterprise</td><td>Certificate Auth · Academic Network</td></tr>
            <tr><td>7</td><td>TP-Link_8A7B</td><td>WPS Enabled</td><td>Default Admin · Firmware: 2019</td></tr>
            <tr><td>8</td><td>Administration</td><td>WPA3</td><td>Certificate + Biometric · Air-gapped</td></tr>
          </tbody>
        </table>
        <div class="warn"><strong>Attention :</strong> données de simulation pédagogique ; ne tentez pas de vous connecter à des réseaux inconnus dans un environnement réel.</div>
        <p><strong>Mission :</strong> identifiez les réseaux présentant des risques critiques, directement exploitables.</p>
      `
    },
    answer: '2,4,7',
    answerNote: {
      zh: '格式：网络编号用英文逗号分隔，按升序排列，不加空格',
      en: 'Format: network numbers separated by commas, ascending, no spaces',
      fr: 'Format : numéros de réseaux séparés par des virgules, par ordre croissant, sans espace'
    },
    accept: ['2,4,7', '2, 4, 7', '2、4、7', '247'],
    hints: {
      zh: [
        'WEP 已被证明可在数分钟内破解，即使口令不弱；OPEN 网络则完全没有加密，流量可被直接嗅探。',
        'WPS 是另一种弱入口：WPS 仍开启、固件停留在 2019 年、管理员还是默认口令，这一组合足以被利用。',
        '按「加密方式失效 / 完全开放 / 设备默认配置可被利用」筛一遍，会得到三个高风险网络；按升序写出编号。'
      ],
      en: [
        'WEP has long been broken within minutes, even with a strong password; an OPEN network has no encryption at all, so traffic can be sniffed directly.',
        'WPS is another weak entry point: WPS still enabled, firmware stuck in 2019 and the default admin password — that combination is exploitable.',
        'Filter by "broken encryption / fully open / exploitable default configuration" and three high-risk networks remain; write their numbers in ascending order.'
      ],
      fr: [
        'Le WEP se casse en quelques minutes, même avec un mot de passe solide ; un réseau OPEN n\'a aucun chiffrement, le trafic peut être intercepté directement.',
        'Le WPS est une autre porte d\'entrée faible : WPS encore actif, firmware de 2019 et mot de passe administrateur par défaut — la combinaison est exploitable.',
        'Filtrez selon « chiffrement obsolète / réseau ouvert / configuration d\'usine exploitable » : trois réseaux ressortent, listez leurs numéros par ordre croissant.'
      ]
    },
    explain: {
      zh: '无线网络的安全性取决于加密协议、认证方式与出厂配置：WEP 基于 RC4，密钥可被统计分析恢复；WPS 的 PIN 可被暴力枚举。可迁移实践：优先使用 WPA3 或 WPA2-Enterprise，关闭 WPS，修改默认管理员口令，并及时更新固件。',
      en: 'Wireless security depends on the encryption protocol, the authentication mode and the device\'s factory configuration. WEP relies on RC4 with keys recoverable through statistical attacks, and the WPS PIN can be brute-forced. Good practice: prefer WPA3 or WPA2-Enterprise, disable WPS, change the default admin password and keep the firmware up to date.',
      fr: 'La sécurité d\'un réseau sans fil dépend du protocole de chiffrement, du mode d\'authentification et de la configuration d\'usine. Le WEP repose sur RC4 avec des clés récupérables par attaque statistique, et le PIN WPS peut être énuméré par force brute. À retenir : privilégiez WPA3 ou WPA2-Enterprise, désactivez le WPS, changez le mot de passe administrateur par défaut et mettez à jour le firmware.'
    }
  },

  /* EN-05 · 原 game.html 第 5 关：用公开社交信息拼出 RomeCaesarAES2018 */
  social_eng: {
    key: 'social_eng',
    code: 'EN-05',
    tag: { zh: '社会工程', en: 'Social engineering', fr: 'Ingénierie sociale' },
    title: {
      zh: '进阶社会工程学',
      en: 'Advanced social engineering',
      fr: 'Ingénierie sociale avancée'
    },
    brief: {
      zh: '根据被泄露的社交资料，拼出应急备份口令。',
      en: 'Use the leaked social-media profile to piece together the emergency backup password.',
      fr: 'À partir des données personnelles divulguées, reconstituez le mot de passe de la sauvegarde d\'urgence.'
    },
    content: {
      zh: `
        <p><strong>社交媒体资料——Marcus Johnson（IT 管理员）：</strong></p>
        <dl class="kv">
          <dt>LinkedIn</dt>
          <dd>「2018 年，我以一篇关于 AES 的毕业论文开启网络安全之路。」</dd>
          <dt>Facebook</dt>
          <dd>「在 CyberTech Inc 工作满 5 周年！2019 年 6 月入职。」</dd>
          <dt>Instagram</dt>
          <dd>「我的德国牧羊犬 Caesar 今天 7 岁啦！#GermanShepherd #BestFriend」</dd>
          <dt>Twitter</dt>
          <dd>「Rome 不是一天建成的，但我的网络安全是！#InfoSec」</dd>
          <dt>GitHub</dt>
          <dd>「AESCryptTools——大学时期（2018）的教学项目。」</dd>
          <dt>交友资料</dt>
          <dd>「出生在永恒之城，每年夏天都会回去旅行。」</dd>
        </dl>
        <div class="note"><strong>检测到的口令模式：</strong>[出生城市][动物][密码学][论文年份]</div>
        <p><strong>任务：</strong>按照该模式拼出完整的备份口令。</p>
      `,
      en: `
        <p><strong>Social-media profile — Marcus Johnson (IT administrator):</strong></p>
        <dl class="kv">
          <dt>LinkedIn</dt>
          <dd>"Passionate about cybersecurity since my thesis on AES in 2018."</dd>
          <dt>Facebook</dt>
          <dd>"Happy 5th anniversary at CyberTech Inc! Started June 2019."</dd>
          <dt>Instagram</dt>
          <dd>"My dog Caesar is 7 years old today! #GermanShepherd #BestFriend"</dd>
          <dt>Twitter</dt>
          <dd>"Rome wasn't built in a day, but my network security was! #InfoSec"</dd>
          <dt>GitHub</dt>
          <dd>"AESCryptTools — educational project from university (2018)."</dd>
          <dt>Dating profile</dt>
          <dd>"Born in the eternal city, love travelling back every summer."</dd>
        </dl>
        <div class="note"><strong>Detected password pattern:</strong> [BIRTH_CITY][ANIMAL][CRYPTO][THESIS_YEAR]</div>
        <p><strong>Mission:</strong> assemble the complete backup password following that pattern.</p>
      `,
      fr: `
        <p><strong>Profil de réseaux sociaux — Marcus Johnson (administrateur IT) :</strong></p>
        <dl class="kv">
          <dt>LinkedIn</dt>
          <dd>« Passionné de cybersécurité depuis ma thèse sur AES en 2018. »</dd>
          <dt>Facebook</dt>
          <dd>« 5 ans chez CyberTech Inc ! Arrivé en juin 2019. »</dd>
          <dt>Instagram</dt>
          <dd>« Mon chien Caesar fête ses 7 ans aujourd'hui ! #GermanShepherd #BestFriend »</dd>
          <dt>Twitter</dt>
          <dd>« Rome ne s'est pas construite en un jour, mais ma sécurité réseau, si ! #InfoSec »</dd>
          <dt>GitHub</dt>
          <dd>« AESCryptTools — projet pédagogique de l'université (2018). »</dd>
          <dt>Profil de rencontre</dt>
          <dd>« Né dans la ville éternelle, j'y retourne chaque été. »</dd>
        </dl>
        <div class="note"><strong>Motif de mot de passe détecté :</strong> [VILLE_DE_NAISSANCE][ANIMAL][CRYPTO][ANNÉE_DE_THÈSE]</div>
        <p><strong>Mission :</strong> reconstituez le mot de passe de sauvegarde complet selon ce motif.</p>
      `
    },
    answer: 'RomeCaesarAES2018',
    answerNote: {
      zh: '格式：四段内容依次直接相连，不加分隔符',
      en: 'Format: the four parts joined directly, no separators',
      fr: 'Format : les quatre parties concaténées sans séparateur'
    },
    accept: ['RomeCaesarAES2018', 'ROMECAESARAES2018', 'romecaesaraes2018', 'ROME CAESAR AES 2018'],
    hints: {
      zh: [
        '城市：Twitter 与交友资料都指向 Rome（「永恒之城」）。',
        '动物：Instagram 上那只德国牧羊犬叫 Caesar；密码学方向：LinkedIn 与 GitHub 都提到 AES。',
        '年份取论文发表那年，把 [城市][动物][密码学][年份] 四段按顺序直接相连，不加分隔符。'
      ],
      en: [
        'City: Twitter and the dating profile both point to Rome ("the eternal city").',
        'Animal: the German Shepherd on Instagram is called Caesar; crypto: LinkedIn and GitHub both mention AES.',
        'Take the thesis year, then chain [city][animal][crypto][year] in that order with no separator.'
      ],
      fr: [
        'Ville : Twitter et le profil de rencontre renvoient à Rome (« la ville éternelle »).',
        'Animal : le berger allemand d\'Instagram s\'appelle Caesar ; cryptographie : LinkedIn et GitHub mentionnent AES.',
        'Prenez l\'année de la thèse, puis concaténez [ville][animal][crypto][année] dans cet ordre, sans séparateur.'
      ]
    },
    explain: {
      zh: '社会工程学把公开信息（城市、宠物、学校、毕业年份）拼成可猜测的口令——「个人信息 + 可预测组合」是最弱的一类口令。可迁移实践：收敛社交平台的可见范围，避免用宠物名、日期与城市等元素，重要账号叠加双因素认证。',
      en: 'Social engineering turns public information (city, pet, school, graduation year) into a guessable password: "personal facts + a predictable combination" is the weakest possible password. Good practice: limit the visibility of your profiles, avoid pet names, dates and cities in passwords, and add two-factor authentication on important accounts.',
      fr: 'L\'ingénierie sociale exploite des informations publiques (ville, animal, école, année de diplôme) pour reconstituer un mot de passe devinable : « informations personnelles + combinaison prévisible » est le pire des mots de passe. À retenir : limitez la visibilité de vos profils, évitez les noms d\'animaux, dates et villes dans vos mots de passe, et ajoutez la double authentification sur les comptes importants.'
    }
  },

  /* EN-06 · 原 game.html 第 6 关：ASCII 求和 + 取模索引得 PHOENIX。
     代码表以 ROT-13 密文呈现，避免最终答案在题面中逐字出现。 */
  final_algo: {
    key: 'final_algo',
    code: 'EN-06',
    tag: { zh: '算法推理', en: 'Algorithm', fr: 'Algorithme' },
    title: {
      zh: '最终中和算法',
      en: 'Final neutralization algorithm',
      fr: 'Algorithme de neutralisation final'
    },
    brief: {
      zh: '运行简化哈希算法，生成终止攻击的中和代码。',
      en: 'Run the simplified hash algorithm to generate the code that stops the attack.',
      fr: 'Utilisez l\'algorithme de hachage simplifié pour générer le code de neutralisation de l\'attaque.'
    },
    content: {
      zh: `
        <p><strong>检测到的中和算法：</strong></p>
        <div class="data-block">
          <p><strong>第 1 步 — 取算法固定字符的 ASCII 码：</strong></p>
          <ul>
            <li>字符 <span class="mono">C</span> = 67</li>
            <li>字符 <span class="mono">1</span> = 49</li>
            <li>字符 <span class="mono">R</span> = 82</li>
            <li>字符 <span class="mono">2</span> = 50</li>
            <li>字符 <span class="mono">R</span> = 82</li>
          </ul>
          <p><strong>第 2 步 — 求和：</strong>67 + 49 + 82 + 50 + 82 = 330</p>
          <p><strong>第 3 步 — 取模：</strong>330 MOD 5 = 0，即取代码表中索引 0 的项。</p>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>索引</th><th>代码词（ROT-13 加密）</th></tr>
          </thead>
          <tbody>
            <tr><td>0</td><td><span class="mono">CUBRAVK</span></td></tr>
            <tr><td>1</td><td><span class="mono">FGBEZ</span></td></tr>
            <tr><td>2</td><td><span class="mono">GVGNA</span></td></tr>
            <tr><td>3</td><td><span class="mono">IBEGRK</span></td></tr>
            <tr><td>4</td><td><span class="mono">MRAVGU</span></td></tr>
          </tbody>
        </table>
        <div class="note">表中的代码词都经过 ROT-13 处理，解码后的词才是最终的中和口令。</div>
      `,
      en: `
        <p><strong>Detected neutralization algorithm:</strong></p>
        <div class="data-block">
          <p><strong>Step 1 — take the ASCII codes of the fixed characters:</strong></p>
          <ul>
            <li>Character <span class="mono">C</span> = 67</li>
            <li>Character <span class="mono">1</span> = 49</li>
            <li>Character <span class="mono">R</span> = 82</li>
            <li>Character <span class="mono">2</span> = 50</li>
            <li>Character <span class="mono">R</span> = 82</li>
          </ul>
          <p><strong>Step 2 — sum:</strong> 67 + 49 + 82 + 50 + 82 = 330</p>
          <p><strong>Step 3 — modulo:</strong> 330 MOD 5 = 0, i.e. take the entry at index 0 of the code table.</p>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>Index</th><th>Code word (ROT-13 encrypted)</th></tr>
          </thead>
          <tbody>
            <tr><td>0</td><td><span class="mono">CUBRAVK</span></td></tr>
            <tr><td>1</td><td><span class="mono">FGBEZ</span></td></tr>
            <tr><td>2</td><td><span class="mono">GVGNA</span></td></tr>
            <tr><td>3</td><td><span class="mono">IBEGRK</span></td></tr>
            <tr><td>4</td><td><span class="mono">MRAVGU</span></td></tr>
          </tbody>
        </table>
        <div class="note">Every code word in the table went through ROT-13; the decoded word is the final neutralization code.</div>
      `,
      fr: `
        <p><strong>Algorithme de neutralisation détecté :</strong></p>
        <div class="data-block">
          <p><strong>Étape 1 — codes ASCII des caractères fixes :</strong></p>
          <ul>
            <li>Caractère <span class="mono">C</span> = 67</li>
            <li>Caractère <span class="mono">1</span> = 49</li>
            <li>Caractère <span class="mono">R</span> = 82</li>
            <li>Caractère <span class="mono">2</span> = 50</li>
            <li>Caractère <span class="mono">R</span> = 82</li>
          </ul>
          <p><strong>Étape 2 — somme :</strong> 67 + 49 + 82 + 50 + 82 = 330</p>
          <p><strong>Étape 3 — modulo :</strong> 330 MOD 5 = 0, on prend donc l'entrée d'index 0 de la table.</p>
        </div>
        <table class="data-table">
          <thead>
            <tr><th>Index</th><th>Mot de code (chiffré en ROT-13)</th></tr>
          </thead>
          <tbody>
            <tr><td>0</td><td><span class="mono">CUBRAVK</span></td></tr>
            <tr><td>1</td><td><span class="mono">FGBEZ</span></td></tr>
            <tr><td>2</td><td><span class="mono">GVGNA</span></td></tr>
            <tr><td>3</td><td><span class="mono">IBEGRK</span></td></tr>
            <tr><td>4</td><td><span class="mono">MRAVGU</span></td></tr>
          </tbody>
        </table>
        <div class="note">Chaque mot de code du tableau a été chiffré en ROT-13 ; le mot déchiffré est le code de neutralisation final.</div>
      `
    },
    answer: 'PHOENIX',
    answerNote: {
      zh: '格式：6 个大写字母，无空格',
      en: 'Format: 6 uppercase letters, no spaces',
      fr: 'Format : 6 lettres majuscules, sans espace'
    },
    accept: ['PHOENIX', 'phoenix'],
    hints: {
      zh: [
        '先把 ASCII 码相加：67 + 49 + 82 + 50 + 82 = 330。',
        '330 ÷ 5 = 66 余 0，取模结果 0 对应代码表的索引 0。',
        '索引 0 的代码词是 CUBRAVK；用第三关学过的 ROT-13 解码即得最终口令。'
      ],
      en: [
        'First add the ASCII codes: 67 + 49 + 82 + 50 + 82 = 330.',
        '330 ÷ 5 = 66 remainder 0, so the modulo result points to index 0 in the code table.',
        'The code word at index 0 is CUBRAVK; decode it with ROT-13 (as in stage 3) to get the final code word.'
      ],
      fr: [
        'Additionnez d\'abord les codes ASCII : 67 + 49 + 82 + 50 + 82 = 330.',
        '330 ÷ 5 = 66 reste 0 : le résultat du modulo désigne l\'index 0 de la table.',
        'Le mot de code à l\'index 0 est CUBRAVK ; déchiffrez-le avec ROT-13 (comme à l\'étape 3) pour obtenir le mot final.'
      ]
    },
    explain: {
      zh: '把任意输入压缩成固定范围的索引，正是哈希与校验和的思路；简单的求和取模会大量碰撞，不能提供任何保护。可迁移实践：口令存储使用 Argon2、bcrypt 等加盐慢哈希，完整性校验使用 SHA-256 等加密哈希。',
      en: 'Compressing any input into a fixed-size index is the essence of hashing and checksums; a plain sum plus a modulo collides constantly and protects nothing. Good practice: store passwords with a slow salted hash such as Argon2 or bcrypt, and use SHA-256 or better for integrity checks.',
      fr: 'Compresser une entrée quelconque en un index de taille fixe, c\'est le principe d\'un hachage ou d\'une somme de contrôle ; une simple somme suivie d\'un modulo crée énormément de collisions et ne protège rien. À retenir : pour stocker des mots de passe, utilisez Argon2 ou bcrypt (hachage lent et salé) ; pour vérifier l\'intégrité, utilisez SHA-256 ou équivalent.'
    }
  }
});
