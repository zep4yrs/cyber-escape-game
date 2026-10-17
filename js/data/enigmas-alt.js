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
    learn: {
      title: {
        zh: '五位数字查表',
        en: 'French five-dice words',
        fr: 'Table des cinq dés'
      },
      goal: {
        zh: '读完这张卡，你会把密文按 5 位切组、逐组查编码表，再按顺序连成口令。',
        en: 'After this card you can split a digit sequence into groups of five and look each group up in the French word list.',
        fr: 'Après cette fiche, vous saurez découper une séquence de chiffres en groupes de cinq et chercher chaque groupe dans la table française.'
      },
      points: {
        zh: [
          '编码表把 5 位数字和一个汉字一一对应，像一本小型字典。',
          '密文要先每 5 位切一刀，切出来的每一组才算一个编码。',
          '可迁移：固定编码表不是加密，口令应当随机生成并妥善保管。'
        ],
        en: [
          'The five-dice method maps each five-digit group to one French word.',
          'Cut the sequence into groups of exactly five digits before looking anything up.',
          'Practice: a fixed codebook is not encryption; generate random passwords and store them safely.'
        ],
        fr: [
          'La méthode des cinq dés associe chaque groupe de cinq chiffres à un mot français.',
          'Découpez la séquence en groupes de cinq chiffres avant toute recherche.',
          'À retenir : une table fixe n’est pas un chiffrement ; générez des mots de passe aléatoires.'
        ]
      },
      steps: {
        zh: [
          '把启动序列抄下来，从左到右每 5 位画一条竖线。',
          '拿每组数字去《口令编码表》里找相同编码，抄下它右边的汉字。',
          '把抄下的汉字按组序连起来，就是口令。'
        ],
        en: [
          'Write the digit sequence down and mark a cut every five digits.',
          'Find each five-digit group in the French five-dice word list.',
          'Write the five words in sequence order, in capitals, separated by spaces.'
        ],
        fr: [
          'Recopiez la séquence de chiffres et marquez une coupure tous les cinq chiffres.',
          'Cherchez chaque groupe de cinq chiffres dans la table française de la méthode à 5 dés.',
          'Écrivez les cinq mots dans l’ordre, en majuscules et séparés par des espaces.'
        ]
      }
    },
    nudges: {
      zh: [
        '先只做切分：25 位数字每 5 位一组，应该得到 5 组，别让相邻两组粘在一起。',
        '对每组数字，在编码表「编码」列找到完全相同的 5 位数，抄它右边的汉字，再按组序排好。'
      ],
      en: [
        'Before looking anything up, check your cuts: the sequence must become five groups of exactly five digits.',
        'For each group, find the matching five-digit entry in the word list and write its French word; keep the group order.'
      ],
      fr: [
        'Avant de chercher, vérifiez les coupures : la séquence doit donner cinq groupes de exactement cinq chiffres.',
        'Pour chaque groupe, trouvez l’entrée identique dans la table et notez son mot français ; gardez l’ordre des groupes.'
      ]
    },
    walkthrough: {
      title: { zh: '跟我做一遍', en: 'Walk through it with me', fr: 'Faisons-le ensemble' },
      lead: {
        zh: '用一张只有两个词的迷你编码表演示，切分和查表的方法完全一样。',
        en: 'A tiny made-up word list shows the same method with just two entries.',
        fr: 'Une mini-table inventée de deux entrées montre la même méthode.'
      },
      steps: {
        zh: [
          { t: '先按 5 位切', b: '把示例密文 1000110002 每 5 位切开，得到 10001 和 10002。' },
          { t: '逐组查表', b: '迷你表里 10001=校、10002=园，把汉字抄在对应数字旁边。' },
          { t: '按顺序连读', b: '按密文顺序连起来是「校园」，这就是示例口令，不加空格。' }
        ],
        en: [
          { t: 'Cut every five', b: 'Take the sample sequence 1111122222 and cut it into 11111 and 22222.' },
          { t: 'Look each up', b: 'In the mini list, 11111 = CHAT and 22222 = LUNE; note both words.' },
          { t: 'Read in order', b: 'Join them in sequence order: CHAT LUNE. That is the sample password.' }
        ],
        fr: [
          { t: 'Couper par cinq', b: 'Prenez la séquence d’exemple 1111122222 et coupez-la en 11111 puis 22222.' },
          { t: 'Chercher', b: 'Dans la mini-table, 11111 = CHAT et 22222 = LUNE ; notez les deux mots.' },
          { t: 'Lire dans l’ordre', b: 'Joignez-les dans l’ordre : CHAT LUNE. C’est le mot de passe d’exemple.' }
        ]
      },
      closing: {
        zh: '现在回到题面，用真正的《口令编码表》解一次。',
        en: 'Now go back to the exercise and look up the real five words yourself.',
        fr: 'Revenez maintenant à l’exercice et cherchez vous-même les cinq vrais mots.'
      }
    },
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
