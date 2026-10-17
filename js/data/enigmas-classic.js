/* 经典模式 · 关卡数据（zh / en / fr）
 * 来源：game1.html 内联 ENIGMAS 数组（经典模式 6 关）。
 * 按 CONTENT-SPEC 重写为三语数据：题面只使用主题 CSS 约定的标签与类名，无内联样式。
 * 加载方式：经典 <script src>，向 window.ENIGMAS 注册本模式关卡。
 */
window.ENIGMAS = window.ENIGMAS || {};

Object.assign(window.ENIGMAS, {
  // 经典模式第 1 关：来源 game1.html「MOT DE PASSE COMPROMIS」（原答案 LOGIN2024）
  pwd_classic: {
    key: 'pwd_classic',
    code: 'EN-01',
    tag: {
      zh: '口令解码',
      en: 'Password',
      fr: 'Mot de passe'
    },
    title: {
      zh: '被截获的管理员口令',
      en: 'Intercepted administrator password',
      fr: 'MOT DE PASSE COMPROMIS'
    },
    brief: {
      zh: '黑客截获了系统管理员使用的加密口令，请解码后进入系统。',
      en: 'Hackers intercepted the encrypted password used by the system administrator. Decode it to access the system.',
      fr: "Les hackers ont intercepté un mot de passe chiffré utilisé par l'administrateur système. Décodez-le pour accéder au système !"
    },
    content: {
      zh: `<p><strong>被截获的内部通信：</strong></p>
<div class="data-block">
  <p><strong>IT 负责人的留言：</strong>「我按老规矩改了管理员口令，用的是你熟悉的数字编号。新的访问码是 <strong>12-15-7-9-14</strong>。和往常一样，末尾照旧接上咱们的参考年份 <strong>2024</strong>。」</p>
  <p><strong>系统管理员回复：</strong>「收到，我按我们惯用的字母表规则解码后录入。」</p>
</div>
<p><strong>任务：</strong>还原完整的管理员口令。</p>
<div class="note">口令由「单词 + 年份」构成，全部使用大写英文字母与数字。</div>`,
      en: `<p><strong>Intercepted internal message:</strong></p>
<div class="data-block">
  <p><strong>Note from the IT manager:</strong> "I changed the administrator password as agreed. I used our usual method with the numbers you know. The new access code is <strong>12-15-7-9-14</strong>. As always, append our reference year <strong>2024</strong> at the end for extra security."</p>
  <p><strong>Reply from the sysadmin:</strong> "Got it — I will decode it with our usual alphabet rule and enter it."</p>
</div>
<p><strong>Your mission:</strong> rebuild the complete administrator password.</p>
<div class="note">The password is made of a word plus a year, written in uppercase letters and digits.</div>`,
      fr: `<p><strong>Communication interceptée :</strong></p>
<div class="data-block">
  <p><strong>Message du responsable IT :</strong> « J'ai changé le mot de passe comme convenu. J'ai utilisé notre méthode habituelle avec les numéros que tu connais. Le nouveau code d'accès est <strong>12-15-7-9-14</strong>. Comme toujours, on ajoute notre année de référence <strong>2024</strong> à la fin pour plus de sécurité. »</p>
  <p><strong>Réponse de l'administrateur :</strong> « Bien reçu, je le décode avec notre règle alphabétique habituelle et je le saisis. »</p>
</div>
<p><strong>Votre mission :</strong> reconstituer le mot de passe administrateur complet.</p>
<div class="note">Le mot de passe se compose d'un mot suivi d'une année, en majuscules et en chiffres.</div>`
    },
    answer: 'LOGIN2024',
    answerNote: {
      zh: '格式：5 个大写字母 + 4 位年份，无空格',
      en: 'Format: 5 uppercase letters + 4-digit year, no spaces',
      fr: "Format : 5 lettres majuscules + année sur 4 chiffres, sans espace"
    },
    hints: {
      zh: [
        '数字代表字母在字母表中的位置：A=1、B=2……Z=26。',
        '把 12、15、7、9、14 依次换算成字母，就得到口令的单词部分。',
        '在换算出的 5 个字母后面直接接上当前年份 2024，不加空格，就是完整口令。'
      ],
      en: [
        'Each number is a letter position in the alphabet: A=1, B=2 … Z=26.',
        'Convert 12, 15, 7, 9 and 14 into letters one by one to get the word part of the password.',
        'Append the current year 2024 directly after those 5 letters, with no space, to get the complete password.'
      ],
      fr: [
        "Chaque nombre correspond à la position d'une lettre dans l'alphabet : A=1, B=2 … Z=26.",
        'Convertissez un à un 12, 15, 7, 9 et 14 en lettres pour obtenir la partie « mot » du mot de passe.',
        "Ajoutez directement l'année 2024 après ces 5 lettres, sans espace, pour obtenir le mot de passe complet."
      ]
    },
    explain: {
      zh: '把字母替换成它在字母表中的序号，是最简单的替换密码之一：只要知道 A=1、B=2 的对应关系，就能手工还原。可迁移的安全实践是——口令应使用长且随机的字符串，不要把单词和年份这类可预测信息拼在末尾，因为攻击者会优先尝试这种组合。',
      en: 'Replacing letters with their position in the alphabet is one of the simplest substitution ciphers: knowing that A=1 and B=2 is enough to decode it by hand. The takeaway: passwords should be long and random — never append predictable pieces such as a word and a year, because attackers try those combinations first.',
      fr: "Remplacer chaque lettre par son rang dans l'alphabet est le plus simple des chiffres de substitution : savoir que A=1 et B=2 suffit à décoder à la main. À retenir : un mot de passe doit être long et aléatoire — ne collez jamais un mot et une année à la fin, car les attaquants testent ces combinaisons en premier."
    }
  },

  // 经典模式第 2 关：来源 game1.html「DÉTECTION DE PHISHING」（原答案 1,3,6）
  phishing_classic: {
    key: 'phishing_classic',
    code: 'EN-02',
    tag: {
      zh: '钓鱼邮件',
      en: 'Phishing',
      fr: 'Phishing'
    },
    title: {
      zh: '钓鱼邮件识别',
      en: 'Spotting phishing emails',
      fr: 'DÉTECTION DE PHISHING'
    },
    brief: {
      zh: '安全团队截获了多封可疑邮件，请识别出其中的钓鱼尝试。',
      en: 'The security team intercepted several suspicious emails. Identify the phishing attempts before you fall for them.',
      fr: "L'équipe de sécurité a intercepté plusieurs emails suspects. Identifiez les tentatives de phishing pour éviter le piège !"
    },
    content: {
      zh: `<p><strong>安全团队截获了 6 封邮件：</strong></p>
<table class="data-table">
  <thead>
    <tr><th>编号</th><th>发件人</th><th>主题</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><span class="mono">securite@bank-creditt-agricol.com</span></td><td>紧急：请验证您的账户</td></tr>
    <tr><td>2</td><td><span class="mono">notifications@paypal.com</span></td><td>月度对账单</td></tr>
    <tr><td>3</td><td><span class="mono">support@amazone-livraison.tk</span></td><td>您的订单出现问题</td></tr>
    <tr><td>4</td><td><span class="mono">admin@university-campus.edu</span></td><td>计划内维护</td></tr>
    <tr><td>5</td><td><span class="mono">security@microsoft.com</span></td><td>Office 365 安全警报</td></tr>
    <tr><td>6</td><td><span class="mono">noreply@googIe-security.ml</span></td><td>检测到可疑活动</td></tr>
  </tbody>
</table>
<p><strong>任务：</strong>找出其中的钓鱼邮件，按下述格式作答。</p>
<div class="note">作答格式：邮件编号用半角逗号分隔，不加空格。示例：<strong>2,4</strong>（仅示意格式）。</div>
<p><strong>排查线索：</strong>拼写错误、可疑域名、异常扩展名……</p>
<div class="warn"><strong>提醒：</strong>现实中不要点击可疑邮件里的链接，也不要回复或提供任何账号信息。</div>`,
      en: `<p><strong>The security team intercepted 6 emails:</strong></p>
<table class="data-table">
  <thead>
    <tr><th>#</th><th>Sender</th><th>Subject</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><span class="mono">securite@bank-creditt-agricol.com</span></td><td>URGENT: verify your account</td></tr>
    <tr><td>2</td><td><span class="mono">notifications@paypal.com</span></td><td>Monthly statement</td></tr>
    <tr><td>3</td><td><span class="mono">support@amazone-livraison.tk</span></td><td>Problem with your order</td></tr>
    <tr><td>4</td><td><span class="mono">admin@university-campus.edu</span></td><td>Scheduled maintenance</td></tr>
    <tr><td>5</td><td><span class="mono">security@microsoft.com</span></td><td>Office 365 security alert</td></tr>
    <tr><td>6</td><td><span class="mono">noreply@googIe-security.ml</span></td><td>Suspicious activity detected</td></tr>
  </tbody>
</table>
<p><strong>Your mission:</strong> identify the phishing emails and answer in the format below.</p>
<div class="note">Answer format: email numbers separated by commas, no spaces. Example: <strong>2,4</strong> (format only).</div>
<p><strong>Clues to look for:</strong> spelling mistakes, suspicious domains, unusual extensions…</p>
<div class="warn"><strong>Reminder:</strong> in real life, never click links in a suspicious email and never reply with account details.</div>`,
      fr: `<p><strong>L'équipe de sécurité a intercepté 6 emails :</strong></p>
<table class="data-table">
  <thead>
    <tr><th>N°</th><th>Expéditeur</th><th>Objet</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><span class="mono">securite@bank-creditt-agricol.com</span></td><td>Vérifiez votre compte URGENT</td></tr>
    <tr><td>2</td><td><span class="mono">notifications@paypal.com</span></td><td>Récapitulatif mensuel</td></tr>
    <tr><td>3</td><td><span class="mono">support@amazone-livraison.tk</span></td><td>Problème avec votre commande</td></tr>
    <tr><td>4</td><td><span class="mono">admin@university-campus.edu</span></td><td>Maintenance programmée</td></tr>
    <tr><td>5</td><td><span class="mono">security@microsoft.com</span></td><td>Alerte sécurité Office 365</td></tr>
    <tr><td>6</td><td><span class="mono">noreply@googIe-security.ml</span></td><td>Activité suspecte détectée</td></tr>
  </tbody>
</table>
<p><strong>Votre mission :</strong> identifiez les emails de phishing et répondez au format ci-dessous.</p>
<div class="note">Format de réponse : numéros des emails séparés par des virgules, sans espaces. Exemple : <strong>2,4</strong> (format uniquement).</div>
<p><strong>Indices à rechercher :</strong> fautes d'orthographe, domaines suspects, extensions inhabituelles…</p>
<div class="warn"><strong>Attention :</strong> dans la réalité, ne cliquez jamais sur les liens d'un email suspect et ne répondez jamais avec vos identifiants.</div>`
    },
    answer: '1,3,6',
    answerNote: {
      zh: '格式：邮件编号，用半角逗号分隔，不加空格',
      en: 'Format: email numbers separated by commas, no spaces',
      fr: 'Format : numéros des emails séparés par des virgules, sans espace'
    },
    accept: ['1,3,6', '1, 3, 6', '1，3，6', '1、3、6'],
    hints: {
      zh: [
        '逐一核对每封邮件的发件人地址，不要只看发件人显示名。',
        '留意异常扩展名：.tk 和 .ml 常被诈骗者免费注册后用于钓鱼。',
        '再找形近字符与多余字母：creditt-agricol（多一个 t）、amazone（拼写错误）、googIe（大写 I）——这三封就是钓鱼邮件。'
      ],
      en: [
        'Check the sender address of every email, not just the display name.',
        'Watch the extensions: .tk and .ml are often registered for free and abused by scammers.',
        'Then look for look-alike spellings and extra letters: creditt-agricol (an extra t), amazone (misspelt) and the capital I in googIe — those three are the phishing emails.'
      ],
      fr: [
        "Regardez attentivement l'adresse de chaque expéditeur, pas seulement le nom affiché.",
        'Repérez les extensions inhabituelles : .tk et .ml sont souvent enregistrées gratuitement puis utilisées par les fraudeurs.',
        "Cherchez enfin les ressemblances et les lettres en trop : creditt-agricol (un t de trop), amazone (mal orthographié) et googIe (avec un I majuscule) — ces trois emails sont les tentatives de phishing."
      ]
    },
    explain: {
      zh: '钓鱼邮件最常用的伪装是「形近域名」：把字母换成外形相似的字符（如 googIe 中的大写 I）、多加一个字母（creditt），或改用 .tk、.ml 这类廉价域名冒充知名品牌。可迁移的做法是——不点邮件里的链接，逐字核对发件域名，并通过官方 App 或手动输入网址处理账户问题。',
      en: 'Phishing emails usually rely on look-alike domains: swapping a letter for a similar glyph (the capital I in googIe), adding one letter (creditt), or using cheap domains such as .tk and .ml to impersonate well-known brands. The transferable habit: never click links in the email — check every letter of the sender domain and reach the service through its official app or by typing the address yourself.',
      fr: "Les emails de phishing reposent souvent sur des domaines ressemblants : une lettre remplacée par un caractère similaire (le I majuscule de googIe), une lettre ajoutée (creditt), ou un domaine bon marché en .tk / .ml qui usurpe une marque connue. Le réflexe à garder : ne cliquez jamais sur les liens de l'email, vérifiez chaque lettre du domaine de l'expéditeur et passez par l'application officielle ou l'adresse saisie à la main."
    }
  },

  // 经典模式第 3 关：来源 game1.html「DÉCHIFFREMENT QR」（原答案 DECRYPT7）
  qr_classic: {
    key: 'qr_classic',
    code: 'EN-03',
    tag: {
      zh: '二维码',
      en: 'QR code',
      fr: 'QR code'
    },
    title: {
      zh: '被切碎的二维码',
      en: 'Fragmented QR code',
      fr: 'DÉCHIFFREMENT QR'
    },
    brief: {
      zh: '二维码被切成三块碎片，请重新拼合，取出隐藏的解密钥匙。',
      en: 'The QR code was cut into three fragments. Reassemble them to reveal the hidden decryption key.',
      fr: 'Reconstituez le QR code fragmenté pour obtenir la clé de déchiffrement !'
    },
    content: {
      zh: `<p>二维码被切成了三块。碎片 1 是定位图案，碎片 2 和碎片 3 保存着数据字符：</p>
<div class="fragments">
  <div class="fragment">
    <p><strong>碎片 1</strong></p>
    <pre class="code">█████
█ █ █
█████</pre>
  </div>
  <div class="fragment">
    <p><strong>碎片 2</strong></p>
    <pre class="code">DE
CR
YP</pre>
  </div>
  <div class="fragment">
    <p><strong>碎片 3</strong></p>
    <pre class="code">T7
##
[]</pre>
  </div>
</div>
<p>读取规则：碎片 2 每行两个字符，按「从左到右、从上到下」读出；碎片 3 只有第一行是有效数据。把两段按顺序拼起来，就是二维码隐藏的 8 位口令。</p>`,
      en: `<p>The QR code has been cut into three fragments. Fragment 1 is the finder pattern; fragments 2 and 3 carry the data characters:</p>
<div class="fragments">
  <div class="fragment">
    <p><strong>Fragment 1</strong></p>
    <pre class="code">█████
█ █ █
█████</pre>
  </div>
  <div class="fragment">
    <p><strong>Fragment 2</strong></p>
    <pre class="code">DE
CR
YP</pre>
  </div>
  <div class="fragment">
    <p><strong>Fragment 3</strong></p>
    <pre class="code">T7
##
[]</pre>
  </div>
</div>
<p>Reading rule: fragment 2 contains two characters per line — read each line left to right, lines from top to bottom. In fragment 3, only the first line holds valid data. Concatenate the two parts in order to get the 8-character code hidden in the QR code.</p>`,
      fr: `<p>Le QR code a été fragmenté. Le fragment 1 est le motif de repérage ; les fragments 2 et 3 contiennent les caractères de données :</p>
<div class="fragments">
  <div class="fragment">
    <p><strong>Fragment 1</strong></p>
    <pre class="code">█████
█ █ █
█████</pre>
  </div>
  <div class="fragment">
    <p><strong>Fragment 2</strong></p>
    <pre class="code">DE
CR
YP</pre>
  </div>
  <div class="fragment">
    <p><strong>Fragment 3</strong></p>
    <pre class="code">T7
##
[]</pre>
  </div>
</div>
<p>Règle de lecture : le fragment 2 contient deux caractères par ligne, à lire de gauche à droite puis de haut en bas ; dans le fragment 3, seule la première ligne contient des données. Concaténez les deux parties dans l'ordre pour obtenir le code de 8 caractères caché dans le QR code.</p>`
    },
    answer: 'DECRYPT7',
    answerNote: {
      zh: '格式：7 个大写字母 + 1 位数字（共 8 位）',
      en: 'Format: 7 uppercase letters followed by 1 digit (8 characters total)',
      fr: "Format : 7 lettres majuscules suivies d'un chiffre (8 caractères au total)"
    },
    hints: {
      zh: [
        '拼出来的是一串「英文单词 + 数字」，共 8 位。',
        '碎片 2 逐行读得 DECRYP；碎片 3 的第一行以 T 开头，后面跟着一个数字。',
        '把碎片 2 的 6 个字母与碎片 3 第一行的两个字符按顺序接上，就是最终口令（末尾的数字是 7）。'
      ],
      en: [
        'The result is an English word followed by a digit — 8 characters in total.',
        'Reading fragment 2 line by line gives DECRYP; the first line of fragment 3 starts with T and ends with a digit.',
        'Concatenate the 6 letters of fragment 2 with the two characters on the first line of fragment 3 to get the final code (the last digit is 7).'
      ],
      fr: [
        "Le résultat est un mot anglais suivi d'un chiffre, soit 8 caractères au total.",
        'Le fragment 2 se lit ligne par ligne : DECRYP ; la première ligne du fragment 3 commence par T et se termine par un chiffre.',
        'Concaténez les 6 lettres du fragment 2 et les deux caractères de la première ligne du fragment 3 pour obtenir le code final (le chiffre final est 7).'
      ]
    },
    explain: {
      zh: '二维码本质上是把文本编码成黑白模块，再按行列顺序排列；只要按正确的读取顺序把碎片里的字符依次拼接，就能还原出原始内容。安全上要注意：二维码本身无法辨别真伪，扫来源不明的二维码可能直接打开钓鱼网站，所以只扫描可信来源的码，并在打开后先核对网址。',
      en: 'A QR code simply encodes text as black and white modules arranged in rows and columns; concatenate the characters in the right reading order and the original content comes back. Security note: a QR code cannot be authenticated by eye — scanning an unknown code may open a phishing site, so only scan codes from trusted sources and check the URL before interacting.',
      fr: "Un QR code n'est rien d'autre qu'un texte encodé en modules noirs et blancs rangés en lignes et en colonnes : concaténez les caractères dans le bon ordre de lecture et le contenu d'origine réapparaît. Côté sécurité : un QR code ne se vérifie pas à l'œil — scanner un code inconnu peut ouvrir un site de phishing, donc ne scannez que des codes de confiance et vérifiez l'URL avant d'agir."
    }
  },

  // 经典模式第 4 关：来源 game1.html「RÉSEAUX WI-FI MALVEILLANTS」（原答案 3,5,8）
  wifi_classic: {
    key: 'wifi_classic',
    code: 'EN-04',
    tag: {
      zh: '无线网络',
      en: 'Wi-Fi',
      fr: 'Wi-Fi'
    },
    title: {
      zh: '危险的 Wi-Fi 网络',
      en: 'Dangerous Wi-Fi networks',
      fr: 'RÉSEAUX WI-FI MALVEILLANTS'
    },
    brief: {
      zh: '请找出这些 Wi-Fi 网络中需要避开的那几个。',
      en: 'Identify the Wi-Fi networks you should avoid.',
      fr: 'Identifiez les réseaux Wi-Fi dangereux !'
    },
    content: {
      zh: `<p><strong>校园里扫描到 8 个 Wi-Fi 网络：</strong></p>
<table class="data-table">
  <thead>
    <tr><th>编号</th><th>网络名称</th><th>安全配置</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><span class="mono">Campus-WiFi-Secure</span></td><td>WPA2，需要密码</td></tr>
    <tr><td>2</td><td><span class="mono">Eduroam</span></td><td>WPA2-Enterprise，需要身份认证</td></tr>
    <tr><td>3</td><td><span class="mono">WiFi-Gratuit</span></td><td>开放网络，无任何加密</td></tr>
    <tr><td>4</td><td><span class="mono">Bibliotheque-Etudiant</span></td><td>WPA2，密码公开张贴</td></tr>
    <tr><td>5</td><td><span class="mono">Free-Internet-Fast</span></td><td>开放网络，名称通用</td></tr>
    <tr><td>6</td><td><span class="mono">BBOX-7A2F91</span></td><td>WPA2，运营商光猫默认名称</td></tr>
    <tr><td>7</td><td><span class="mono">Campus-IT-Admin</span></td><td>WPA2，管理员专用网络</td></tr>
    <tr><td>8</td><td><span class="mono">Linksys</span></td><td>WEP，出厂默认配置</td></tr>
  </tbody>
</table>
<p><strong>任务：</strong>找出应当避开的 Wi-Fi 网络，并按下述格式作答。</p>
<div class="note">作答格式：网络编号用半角逗号分隔，不加空格。示例：<strong>2,4</strong>（仅示意格式）。</div>`,
      en: `<p><strong>Eight Wi-Fi networks are detected on campus:</strong></p>
<table class="data-table">
  <thead>
    <tr><th>#</th><th>Network name</th><th>Security</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><span class="mono">Campus-WiFi-Secure</span></td><td>WPA2, password required</td></tr>
    <tr><td>2</td><td><span class="mono">Eduroam</span></td><td>WPA2-Enterprise, authentication required</td></tr>
    <tr><td>3</td><td><span class="mono">WiFi-Gratuit</span></td><td>Open network, no encryption</td></tr>
    <tr><td>4</td><td><span class="mono">Bibliotheque-Etudiant</span></td><td>WPA2, password publicly posted</td></tr>
    <tr><td>5</td><td><span class="mono">Free-Internet-Fast</span></td><td>Open network, generic name</td></tr>
    <tr><td>6</td><td><span class="mono">BBOX-7A2F91</span></td><td>WPA2, default carrier-box name</td></tr>
    <tr><td>7</td><td><span class="mono">Campus-IT-Admin</span></td><td>WPA2, administrator-only network</td></tr>
    <tr><td>8</td><td><span class="mono">Linksys</span></td><td>WEP, factory default configuration</td></tr>
  </tbody>
</table>
<p><strong>Your mission:</strong> identify the Wi-Fi networks to avoid and answer in the format below.</p>
<div class="note">Answer format: network numbers separated by commas, no spaces. Example: <strong>2,4</strong> (format only).</div>`,
      fr: `<p><strong>Huit réseaux Wi-Fi sont détectés sur le campus :</strong></p>
<table class="data-table">
  <thead>
    <tr><th>N°</th><th>Nom du réseau</th><th>Sécurité</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td><span class="mono">Campus-WiFi-Secure</span></td><td>WPA2, mot de passe requis</td></tr>
    <tr><td>2</td><td><span class="mono">Eduroam</span></td><td>WPA2-Enterprise, authentification</td></tr>
    <tr><td>3</td><td><span class="mono">WiFi-Gratuit</span></td><td>Ouvert, aucune sécurité</td></tr>
    <tr><td>4</td><td><span class="mono">Bibliotheque-Etudiant</span></td><td>WPA2, mot de passe affiché</td></tr>
    <tr><td>5</td><td><span class="mono">Free-Internet-Fast</span></td><td>Ouvert, nom générique</td></tr>
    <tr><td>6</td><td><span class="mono">BBOX-7A2F91</span></td><td>WPA2, nom par défaut box</td></tr>
    <tr><td>7</td><td><span class="mono">Campus-IT-Admin</span></td><td>WPA2, réseau administrateur</td></tr>
    <tr><td>8</td><td><span class="mono">Linksys</span></td><td>WEP, configuration par défaut</td></tr>
  </tbody>
</table>
<p><strong>Votre mission :</strong> identifiez les réseaux Wi-Fi à éviter et répondez au format ci-dessous.</p>
<div class="note">Format de réponse : numéros des réseaux séparés par des virgules, sans espaces. Exemple : <strong>2,4</strong> (format uniquement).</div>`
    },
    answer: '3,5,8',
    answerNote: {
      zh: '格式：网络编号，用半角逗号分隔，不加空格',
      en: 'Format: network numbers separated by commas, no spaces',
      fr: 'Format : numéros des réseaux séparés par des virgules, sans espace'
    },
    accept: ['3,5,8', '3, 5, 8', '3，5，8', '3、5、8'],
    hints: {
      zh: [
        '先看加密方式：开放网络意味着完全不加密，同一热点下的人可以直接抓包。',
        '再查协议与配置：WEP 已被淘汰、几分钟即可破解；仍保持出厂默认配置（如 Linksys）的节点同样危险。',
        '数一数：完全开放的热点 2 个、WEP 默认配置的 1 个，把它们全部避开即可。'
      ],
      en: [
        'Start with encryption: an open network is not encrypted at all, so anyone on the same hotspot can capture traffic.',
        'Then check the protocol and setup: WEP is obsolete and can be cracked in minutes, and a node still on its factory default configuration (e.g. Linksys) is just as dangerous.',
        'Tally them up: two fully open hotspots and one WEP node with default settings — all of them should be avoided.'
      ],
      fr: [
        "Commencez par le chiffrement : un réseau ouvert n'est pas chiffré du tout, n'importe qui sur le même point d'accès peut capturer le trafic.",
        "Vérifiez ensuite le protocole et la configuration : le WEP est obsolète et cassable en quelques minutes, et un point d'accès resté en configuration d'usine (par exemple Linksys) est tout aussi dangereux.",
        'Récapitulez : deux points d\'accès entièrement ouverts et un point d\'accès WEP en configuration par défaut — tous sont à éviter.'
      ]
    },
    explain: {
      zh: '开放网络没有任何加密，攻击者可以在同一热点上抓包、伪造热点做中间人攻击；WEP 加密已被证明可在几分钟内破解，出厂默认的 SSID 和口令也早被公开。可迁移的安全习惯：优先连接 WPA2/WPA3-Enterprise 网络，关闭设备的「自动连接开放 Wi-Fi」，处理敏感事务时改用手机热点。',
      en: 'An open network has no encryption, so an attacker on the same hotspot can sniff traffic or run a rogue hotspot for a man-in-the-middle attack; WEP encryption has long been broken in minutes, and factory-default SSIDs and passwords are public knowledge. Good habits: prefer WPA2/WPA3-Enterprise networks, turn off automatic connection to open Wi-Fi, and use your phone hotspot for sensitive tasks.',
      fr: "Un réseau ouvert n'est pas chiffré : un attaquant sur le même point d'accès peut capturer le trafic ou monter un faux hotspot pour une attaque de l'intermédiaire ; le WEP est cassable en quelques minutes et les SSID/mots de passe d'usine sont publics. Les bons réflexes : privilégier un réseau WPA2/WPA3-Enterprise, désactiver la connexion automatique aux Wi-Fi ouverts et utiliser le partage de connexion du téléphone pour les opérations sensibles."
    }
  },

  // 经典模式第 5 关：来源 game1.html「RÉCUPÉRATION DE SAUVEGARDE」（原答案 RomeRex2018）
  backup_classic: {
    key: 'backup_classic',
    code: 'EN-05',
    tag: {
      zh: '备份口令',
      en: 'Backup',
      fr: 'Sauvegarde'
    },
    title: {
      zh: '紧急备份的口令',
      en: 'Emergency backup password',
      fr: 'RÉCUPÉRATION DE SAUVEGARDE'
    },
    brief: {
      zh: '请还原紧急备份的口令，它由管理员的个人信息拼成。',
      en: 'Recover the emergency backup password, which is built from the administrator\'s personal details.',
      fr: "La sauvegarde d'urgence est protégée par un mot de passe personnel du responsable IT. Retrouvez-le !"
    },
    content: {
      zh: `<p>紧急备份由一个「个人信息拼接」的口令保护着。管理员档案如下：</p>
<dl class="kv">
  <dt>姓名</dt><dd>Marcus Johnson</dd>
  <dt>出生城市</dt><dd>Rome</dd>
  <dt>宠物</dt><dd>Rex（他养的狗）</dd>
  <dt>入职年份</dt><dd>2018</dd>
  <dt>爱好</dt><dd>意大利旅行</dd>
</dl>
<p>口令沿用经典格式：<strong>[出生城市][宠物名][入职年份]</strong>。</p>`,
      en: `<p>The emergency backup is protected by a password built from personal details. Here is the administrator's profile:</p>
<dl class="kv">
  <dt>Name</dt><dd>Marcus Johnson</dd>
  <dt>Birth city</dt><dd>Rome</dd>
  <dt>Pet</dt><dd>Rex (his dog)</dd>
  <dt>Hire year</dt><dd>2018</dd>
  <dt>Hobby</dt><dd>Travels in Italy</dd>
</dl>
<p>The password follows the classic pattern: <strong>[birth city][pet name][hire year]</strong>.</p>`,
      fr: `<p>La sauvegarde d'urgence est protégée par un mot de passe personnel du responsable IT :</p>
<dl class="kv">
  <dt>Nom</dt><dd>Marcus Johnson</dd>
  <dt>Ville de naissance</dt><dd>Rome</dd>
  <dt>Animal préféré</dt><dd>Rex (son chien)</dd>
  <dt>Année d'embauche</dt><dd>2018</dd>
  <dt>Passion</dt><dd>Voyages en Italie</dd>
</dl>
<p>Le mot de passe suit le pattern classique : <strong>[lieu][animal][année]</strong>.</p>`
    },
    answer: 'RomeRex2018',
    answerNote: {
      zh: '格式：[出生城市][宠物名][入职年份]，每部分首字母大写，不加空格',
      en: 'Format: [birth city][pet name][hire year], each part capitalised, no spaces',
      fr: "Format : [ville][animal][année], une majuscule au début de chaque partie, sans espace"
    },
    hints: {
      zh: [
        '口令由三段依次拼接：出生城市、宠物名、入职年份。',
        '三段都藏在管理员档案里：城市是意大利的首都，宠物是他那只狗的名字，年份取他的入职年份。',
        '按格式拼起来：Rome + Rex + 2018，每段首字母大写、中间不加空格。'
      ],
      en: [
        'The password is three parts concatenated in order: birth city, pet name, hire year.',
        'All three come from the profile: the city is the capital of Italy, the pet is his dog\'s name, and the year is the year he was hired.',
        'Put them together: Rome + Rex + 2018 — capitalise each part and add no spaces.'
      ],
      fr: [
        'Le mot de passe est composé de trois parties concaténées dans cet ordre : ville de naissance, nom de l\'animal, année d\'embauche.',
        "Les trois se trouvent dans le profil : la ville est la capitale de l'Italie, l'animal est le nom de son chien et l'année est celle de son embauche.",
        'Assemblez-les : Rome + Rex + 2018 — une majuscule au début de chaque partie, sans espace.'
      ]
    },
    explain: {
      zh: '出生地、宠物名、入职年份这类信息很容易从社交媒体和公开资料里收集齐，用它们拼口令正是社会工程学的典型切入点。安全实践：口令应由密码管理器生成和保管的随机字符串承担，重要备份与账户一律开启双因素认证。',
      en: 'Details such as a birthplace, a pet\'s name and a hire year are easy to collect from social media and public records — combining them into a password is a classic social-engineering entry point. Security practice: let a password manager generate and store random passwords, and enable two-factor authentication on important backups and accounts.',
      fr: "Le lieu de naissance, le nom de l'animal, l'année d'embauche : ces informations se collectent facilement sur les réseaux sociaux et dans les documents publics, et les assembler en mot de passe est une entrée classique d'ingénierie sociale. Bonne pratique : laisser un gestionnaire de mots de passe générer et conserver des chaînes aléatoires, et activer la double authentification sur les sauvegardes et comptes sensibles."
    }
  },

  // 经典模式第 6 关：来源 game1.html「CODE MAÎTRE FINAL」（原答案 REVENGE，求和 2048 后查表）
  master_classic: {
    key: 'master_classic',
    code: 'EN-06',
    tag: {
      zh: '综合推算',
      en: 'Master code',
      fr: 'Code maître'
    },
    title: {
      zh: '最终主控代码',
      en: 'Final master code',
      fr: 'CODE MAÎTRE FINAL'
    },
    brief: {
      zh: '请算出能终止攻击的主控代码。',
      en: 'Work out the master code that neutralises the attack.',
      fr: "Calculez le code de neutralisation de l'attaque !"
    },
    content: {
      zh: `<p>用前五关得到的数据，按下面的公式算出总数值：</p>
<div class="data-block">
  <ul>
    <li>第一关口令中的年份：<strong>2024</strong></li>
    <li>第二关识别出的钓鱼邮件数量：<strong>3</strong></li>
    <li>第三关口令中 DECRYPT 后面的数字：<strong>7</strong></li>
    <li>第四关应避开的危险 Wi-Fi 数量：<strong>3</strong></li>
    <li>第五关年份 2018 的各位数字之和：<strong>2+0+1+8 = 11</strong></li>
  </ul>
  <p><strong>总计</strong> = 2024 + 3 + 7 + 3 + 11</p>
</div>
<p>把总数值对照下面的码表，找出对应的主控代码：</p>
<table class="data-table">
  <thead>
    <tr><th>总数值</th><th>主控代码</th></tr>
  </thead>
  <tbody>
    <tr><td>2048</td><td><span class="mono">REVENGE</span></td></tr>
    <tr><td>2049</td><td><span class="mono">SECURE</span></td></tr>
    <tr><td>2050</td><td><span class="mono">DEFEND</span></td></tr>
    <tr><td>2051</td><td><span class="mono">VICTORY</span></td></tr>
  </tbody>
</table>`,
      en: `<p>Use the data from the first five enigmas and compute the total with the formula below:</p>
<div class="data-block">
  <ul>
    <li>Year in the first password: <strong>2024</strong></li>
    <li>Number of phishing emails identified in enigma 2: <strong>3</strong></li>
    <li>Digit after DECRYPT in the enigma 3 code: <strong>7</strong></li>
    <li>Number of dangerous Wi-Fi networks to avoid in enigma 4: <strong>3</strong></li>
    <li>Sum of the digits of the year 2018: <strong>2+0+1+8 = 11</strong></li>
  </ul>
  <p><strong>Total</strong> = 2024 + 3 + 7 + 3 + 11</p>
</div>
<p>Look up the total in the code table below to find the matching master code:</p>
<table class="data-table">
  <thead>
    <tr><th>Total</th><th>Master code</th></tr>
  </thead>
  <tbody>
    <tr><td>2048</td><td><span class="mono">REVENGE</span></td></tr>
    <tr><td>2049</td><td><span class="mono">SECURE</span></td></tr>
    <tr><td>2050</td><td><span class="mono">DEFEND</span></td></tr>
    <tr><td>2051</td><td><span class="mono">VICTORY</span></td></tr>
  </tbody>
</table>`,
      fr: `<p>Utilisez les données des cinq premières énigmes et calculez le total avec la formule ci-dessous :</p>
<div class="data-block">
  <ul>
    <li>Année du mot de passe de la 1re énigme : <strong>2024</strong></li>
    <li>Nombre d'emails de phishing de la 2e énigme : <strong>3</strong></li>
    <li>Chiffre situé après DECRYPT dans le code de la 3e énigme : <strong>7</strong></li>
    <li>Nombre de réseaux Wi-Fi dangereux de la 4e énigme : <strong>3</strong></li>
    <li>Somme des chiffres de l'année 2018 : <strong>2+0+1+8 = 11</strong></li>
  </ul>
  <p><strong>Total</strong> = 2024 + 3 + 7 + 3 + 11</p>
</div>
<p>Cherchez ce total dans la table de codes ci-dessous pour trouver le code maître correspondant :</p>
<table class="data-table">
  <thead>
    <tr><th>Total</th><th>Code maître</th></tr>
  </thead>
  <tbody>
    <tr><td>2048</td><td><span class="mono">REVENGE</span></td></tr>
    <tr><td>2049</td><td><span class="mono">SECURE</span></td></tr>
    <tr><td>2050</td><td><span class="mono">DEFEND</span></td></tr>
    <tr><td>2051</td><td><span class="mono">VICTORY</span></td></tr>
  </tbody>
</table>`
    },
    answer: 'REVENGE',
    answerNote: {
      zh: '格式：1 个大写英文单词',
      en: 'Format: one uppercase English word',
      fr: 'Format : un mot anglais en majuscules'
    },
    hints: {
      zh: [
        '把 5 个数值相加：2024 + 3 + 7 + 3 + 11。',
        '总和是 2048。',
        '在码表中找到总数值 2048 所在的那一行，读出右侧的代码即可。'
      ],
      en: [
        'Add the five values: 2024 + 3 + 7 + 3 + 11.',
        'The total is 2048.',
        'Find the row whose total is 2048 in the code table and read the code on its right.'
      ],
      fr: [
        'Additionnez les cinq valeurs : 2024 + 3 + 7 + 3 + 11.',
        'Le total est 2048.',
        'Trouvez dans la table la ligne dont le total vaut 2048 et lisez le code à sa droite.'
      ]
    },
    explain: {
      zh: '把前几关的线索按公式汇总、再对照码表查出结果，本质上是一次「数据串联 + 索引映射」：单独的线索价值有限，串起来才能定位最终目标。现实中，能生成「主控代码」的密钥必须离线保管、分级授权并全程审计，避免一个环节失守导致全线失陷。',
      en: 'Collecting clues from earlier levels, summing them with a formula and looking the result up in a table is essentially data chaining plus index mapping: a single clue has little value until the pieces are linked. In real systems, keys that can generate a master code must be stored offline, access-controlled and fully audited, so that one compromised link does not bring down the whole chain.',
      fr: "Rassembler les indices des énigmes précédentes, les additionner selon une formule puis consulter une table, c'est un enchaînement de données doublé d'une correspondance d'index : un indice isolé vaut peu, c'est leur mise en relation qui révèle la cible. En conditions réelles, les clés capables de générer un « code maître » doivent être conservées hors ligne, soumises à des droits hiérarchisés et auditées, pour qu'un seul maillon compromis ne fasse pas tomber toute la chaîne."
    }
  }
});
