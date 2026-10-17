/* ==========================================================================
   口令协议模式 · 第 1 关（zh / en / fr）
   --------------------------------------------------------------------------
   内容来源：game2.html 内联 ENIGMAS 第 1 关（法文「五词密码」谜题，答案
   CAR FREIN GILET ONYX OUVRE）。
   zh 版按 CONTENT-SPEC 重写为中文「五位数字编码表」汉字口令谜题；
   en / fr 版保留原版法文五词谜题，仅把解说翻译为对应语言。
   本文件只注册 pwd_protocol 一个 key。
   ========================================================================== */
window.ENIGMAS = window.ENIGMAS || {};

Object.assign(window.ENIGMAS, {
  /* EN-01 · 中文版：5 位数字 ↔ 汉字编码表；法/英版：五位数字 ↔ 法文词 */
  pwd_protocol: {
    key: 'pwd_protocol',
    code: 'EN-01',
    tag: { zh: '口令编码', en: 'Password', fr: 'Mot de passe' },
    title: {
      zh: '口令生成协议',
      en: 'Password generation protocol',
      fr: 'Protocole de génération de mot de passe'
    },
    brief: {
      zh: '截获的通信显示，IT 负责人用一份《口令编码表》生成了 5 个汉字的口令。',
      en: 'The IT lead generated the new password with a five-dice word method. Decode the intercepted sequence.',
      fr: 'Le responsable IT a généré le nouveau mot de passe avec la méthode des cinq dés. Décodez la séquence interceptée.'
    },
    content: {
      zh: `
        <p><strong>截获的 IT 负责人通信：</strong></p>
        <div class="data-block">
          <p><strong>加密邮件：</strong>「新协议已启用。按老办法，用我们的《口令编码表》把 5 个汉字编码。」</p>
          <p><strong>加密短信：</strong>「启动序列：<span class="mono">2125231554326254543646133</span>」</p>
          <p><strong>内部备注：</strong>「提醒：把序列按每 5 位一组切开，再到《口令编码表》里查对应的汉字。」</p>
        </div>
        <p><strong>《口令编码表》（按汉字拼音排序）：</strong></p>
        <table class="data-table">
          <thead>
            <tr><th>编码</th><th>汉字</th></tr>
          </thead>
          <tbody>
            <tr><td><span class="mono">31554</span></td><td>层</td></tr>
            <tr><td><span class="mono">32625</span></td><td>防</td></tr>
            <tr><td><span class="mono">45436</span></td><td>火</td></tr>
            <tr><td><span class="mono">46133</span></td><td>墙</td></tr>
            <tr><td><span class="mono">21252</span></td><td>双</td></tr>
          </tbody>
        </table>
        <p><strong>任务：</strong>解码启动序列，得到 5 个汉字的口令。</p>
      `,
      en: `
        <p><strong>Intercepted message from the IT lead:</strong></p>
        <div class="data-block">
          <p><strong>Encrypted email:</strong> "New protocol activated. Use our usual five-dice method as agreed."</p>
          <p><strong>Encrypted SMS:</strong> "Launch sequence: <span class="mono">2125231554326254543646133</span>"</p>
          <p><strong>Internal note:</strong> "Reminder: split the sequence into groups of five digits, then look each group up in the standard French five-dice word list."</p>
        </div>
        <div class="note">The standard French five-dice word list maps every five-digit group to one French word; the full table is provided with the exercise.</div>
        <p><strong>Mission:</strong> decode the launch sequence to obtain the generated password.</p>
      `,
      fr: `
        <p><strong>Message intercepté du responsable IT :</strong></p>
        <div class="data-block">
          <p><strong>E-mail sécurisé :</strong> « Nouveau protocole activé. Utilise notre méthode habituelle à 5 dés comme convenu. »</p>
          <p><strong>SMS crypté :</strong> « Séquence de lancement : <span class="mono">2125231554326254543646133</span> »</p>
          <p><strong>Note interne :</strong> « Rappel : diviser la séquence par groupes de 5 chiffres, puis référencer le document standard français. »</p>
        </div>
        <div class="note">La table standard française de la méthode à 5 dés associe chaque groupe de 5 chiffres à un mot français ; la table complète est fournie avec l'exercice.</div>
        <p><strong>Mission :</strong> décodez cette séquence pour obtenir le mot de passe généré.</p>
      `
    },
    answer: {
      zh: '双层防火墙',
      en: 'CAR FREIN GILET ONYX OUVRE',
      fr: 'CAR FREIN GILET ONYX OUVRE'
    },
    answerNote: {
      zh: '格式：5 个汉字，按密文顺序排列，无空格',
      en: 'Format: five French words in capitals, separated by spaces',
      fr: 'Format : cinq mots français en majuscules, séparés par des espaces'
    },
    accept: [
      '双层防火墙',
      '双 层 防 火 墙',
      'CAR FREIN GILET ONYX OUVRE',
      'CARFREINGILETONYXOUVRE'
    ],
    hints: {
      zh: [
        '先把 25 位数字按每 5 位一组切开，得到 5 个编码。',
        '拿每个编码到《口令编码表》里查出对应汉字，例如 21252 对应「双」。',
        '按密文顺序把查到的 5 个汉字连起来，就是 IT 负责人设置的口令。'
      ],
      en: [
        'Split the 25-digit sequence into groups of five digits.',
        'Look each group up in the standard French five-dice word list — for example 21252 = CAR.',
        'Exact matches: 21252=CAR, 31554=FREIN, 32625=GILET, 45436=ONYX, 46133=OUVRE.'
      ],
      fr: [
        'Découpez la séquence de 25 chiffres par groupes de 5 chiffres.',
        'Cherchez chaque groupe dans la table standard française de la méthode à 5 dés — par exemple 21252 = CAR.',
        'Correspondances exactes : 21252=CAR, 31554=FREIN, 32625=GILET, 45436=ONYX, 46133=OUVRE.'
      ]
    },
    explain: {
      zh: '用固定编码表把字符替换成数字，属于替换式密码：只要拿到对照表，任何人都能还原，安全性为零。可迁移实践：口令不应依赖固定规律或编码表，应使用密码管理器生成并保管随机长口令，重要账号再配合双因素认证。',
      en: 'Replacing characters with numbers through a fixed code table is a substitution cipher: anyone holding the table can decode it, so it offers no security. Good practice: never derive passwords from a fixed rule or codebook — generate and store random long passwords in a password manager, and add two-factor authentication on important accounts.',
      fr: 'Remplacer des caractères par des nombres via une table fixe, c\'est un chiffre de substitution : quiconque possède la table peut tout décoder, donc aucune sécurité. À retenir : ne tirez jamais un mot de passe d\'une règle ou d\'un codebook fixe ; générez et stockez des mots de passe longs et aléatoires dans un gestionnaire de mots de passe, et ajoutez la double authentification sur les comptes sensibles.'
    }
  }
});
