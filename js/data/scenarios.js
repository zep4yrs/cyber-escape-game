/* ==========================================================================
   三种行动模式（场景）的元信息与关卡编排
   --------------------------------------------------------------------------
   每个模式由 js/game.js 读取：SCENARIOS[<html data-scenario>]
   enigmas 数组里的 key 对应 js/data/enigmas-*.js 注册到 window.ENIGMAS 的关卡。
   ========================================================================== */
(function (global) {
  'use strict';

  global.SCENARIOS = {
    /* 进阶模式：原 game.html */
    main: {
      key: 'main',
      code: 'OP-01',
      page: 'game.html',
      label: { zh: '进阶模式', en: 'Advanced', fr: 'Avancé' },
      title: {
        zh: '数字封锁 · 主线行动',
        en: 'Digital Lockdown · Main Operation',
        fr: 'Digital Lockdown · Opération principale'
      },
      briefing: {
        zh: '一条勒索攻击链正在校园网内横向移动。六道关卡对应六个真实攻击环节：口令重建、邮件取证、古典密码、无线审计、社会工程与反制算法。',
        en: 'A ransomware chain is moving laterally through the campus network. Six stages map to six real attack steps: password rebuilding, mail forensics, classical ciphers, wireless audit, social engineering and the countermeasure algorithm.',
        fr: 'Une chaîne de rançongiciel progresse dans le réseau du campus. Six énigmes correspondent à six étapes réelles : reconstitution de mot de passe, analyse de courriels, chiffrement classique, audit Wi-Fi, ingénierie sociale et algorithme de neutralisation.'
      },
      difficulty: 3,
      enigmas: ['pwd_intercept', 'email_forensics', 'rot13', 'wifi_audit', 'social_eng', 'final_algo']
    },

    /* 经典模式：原 game1.html */
    classic: {
      key: 'classic',
      code: 'OP-02',
      page: 'game1.html',
      label: { zh: '经典模式', en: 'Classic', fr: 'Classique' },
      title: {
        zh: '数字封锁 · 经典行动',
        en: 'Digital Lockdown · Classic Operation',
        fr: 'Digital Lockdown · Opération classique'
      },
      briefing: {
        zh: '最适合第一次上手的版本：从字母序号口令、钓鱼邮件识别、二维码碎片拼合，到恶意 Wi-Fi 与备份恢复，六关循序推进。',
        en: 'The best first run: letter-index passwords, phishing detection, QR fragments, rogue Wi-Fi and backup recovery — six stages that build up gradually.',
        fr: 'La version idéale pour commencer : mot de passe par indices de lettres, détection de phishing, fragments de QR, Wi-Fi malveillant et récupération de sauvegarde — six étapes progressives.'
      },
      difficulty: 2,
      enigmas: ['pwd_classic', 'phishing_classic', 'qr_classic', 'wifi_classic', 'backup_classic', 'master_classic']
    },

    /* 口令协议模式：原 game2.html（共享进阶模式后五关） */
    alt: {
      key: 'alt',
      code: 'OP-03',
      page: 'game2.html',
      label: { zh: '口令协议', en: 'Codebook', fr: 'Codebook' },
      title: {
        zh: '数字封锁 · 口令协议',
        en: 'Digital Lockdown · Codebook Protocol',
        fr: 'Digital Lockdown · Protocole Codebook'
      },
      briefing: {
        zh: '攻击者用一份内部编码表批量生成口令。中文版把谜题重写为「五位数字 ↔ 五字口令」，法文与英文版保留原始五词密码。',
        en: 'Attackers generate passwords from an internal codebook. The English and French versions keep the original five-word cipher; the Chinese version uses a five-character codebook.',
        fr: 'Les attaquants génèrent les mots de passe à partir d’un codebook interne. Les versions anglaise et française conservent le chiffrement à cinq mots d’origine.'
      },
      difficulty: 2,
      enigmas: ['pwd_protocol', 'email_forensics', 'rot13', 'wifi_audit', 'social_eng', 'final_algo']
    }
  };
})(window);
