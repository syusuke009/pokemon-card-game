SkillList = {
"1_1":{"name":"やどりぎのタネ","cost":["leaf","leaf"],"damage":"20","description":"相手にダメージを与えたら、自分のダメージカウンターを1つとりのぞく。","effect":"skill_1_1","timing":"after-damage"},
"2_1":{"name":"つるのむち","cost":["leaf","normal","normal"],"damage":"30","description":""},
"2_2":{"name":"どくのこな","cost":["leaf","leaf","leaf"],"damage":"20","description":"相手を「どく」状態にする。","effect":"skill_2_2","timing":"after-damage"},
"3_1":{"name":"ソーラービーム","cost":["leaf","leaf","leaf","leaf"],"damage":"60","description":""},
"4_1":{"name":"ひっかく","cost":["normal"],"damage":"10","description":""},
"4_2":{"name":"ひのこ","cost":["fire","normal"],"damage":"30","description":"自分の「炎」エネルギーカードを1枚トラッシュする。","effect":"skill_4_2","timing":"before-damage"},
"5_1":{"name":"きりさく","cost":["normal","normal","normal"],"damage":"30","description":""},
"5_2":{"name":"かえんほうしゃ","cost":["fire","fire","normal"],"damage":"50","description":"自分の「炎」エネルギーカードを1枚トラッシュする。","effect":"skill_5_2","timing":"before-damage"},
"6_1":{"name":"ほのおのうず","cost":["fire","fire","fire","fire"],"damage":"100","description":"自分の「炎」エネルギーカードを2枚トラッシュする。","effect":"skill_6_1","timing":"before-damage"},
"7_1":{"name":"あわ","cost":["aqua"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_7_1","timing":"after-damage"},
"7_2":{"name":"からにこもる","cost":["aqua","normal"],"damage":"","description":"コインを投げて「おもて」なら、次の相手の番にうけるダメージが0になる。","effect":"skill_7_2","timing":"after-damage"},
"8_1":{"name":"からにこもる","cost":["aqua","normal"],"damage":"","description":"コインを投げて「おもて」なら、次の相手の番にうけるダメージが0になる。","effect":"skill_8_1","timing":"after-damage"},
"8_2":{"name":"かみつく","cost":["aqua","normal","normal"],"damage":"40","description":""},
"9_1":{"name":"ハイドロポンプ","cost":["aqua","aqua","aqua","aqua"],"damage":"40","damageCaption":"40＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_9_1","timing":"calc-damage"},
"10_1":{"name":"いとをはく","cost":["leaf"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_10_1","timing":"after-damage"},
"11_1":{"name":"かたまる","cost":["normal","normal"],"damage":"","description":"コインを投げて「おもて」なら、次の相手の番にうけるダメージが0になる。","effect":"skill_11_1","timing":"after-damage"},
"11_2":{"name":"しびれごな","cost":["leaf","leaf"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_11_2","timing":"after-damage"},
// "12_1":{"name":"ふきとばし","cost":["normal","normal"],"damage":"20","description":"相手の対戦ポケモンを控えポケモンと入れ替える。控えポケモンは相手がえらぶ。相手に控えポケモンがいないときには入れ替えはおこらない。","effect":"skill_12_1","timing":"after-damage"},
// "12_2":{"name":"メガドレイン","cost":["leaf","leaf","leaf","leaf"],"damage":"40","description":"相手に与えたダメージの半分(切り上げ)のダメージカウンターを自分からとりのぞく。","effect":"skill_12_2","timing":"after-damage"},
"13_1":{"name":"どくばり","cost":["leaf"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_13_1","timing":"after-damage"},
"14_1":{"name":"かたまる","cost":["normal","normal"],"damage":"","description":"コインを投げて「おもて」なら、次の相手の番にうけるダメージが0になる。","effect":"skill_14_1","timing":"after-damage"},
"14_2":{"name":"どくのこな","cost":["leaf","leaf"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_14_2","timing":"after-damage"},
"15_1":{"name":"ダブルニードル","cost":["normal","normal","normal"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の出た数×30のダメージ。","effect":"skill_15_1","timing":"calc-damage"},
"15_2":{"name":"どくばり","cost":["leaf","leaf","leaf"],"damage":"40","description":"コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_15_2","timing":"after-damage"},
// "16_1":{"name":"ふきとばし","cost":["normal","normal"],"damage":"10","description":"相手の対戦ポケモンを控えポケモンと入れ替える。控えポケモンは相手がえらぶ。相手に控えポケモンがいないときには入れ替えはおこらない。","effect":"skill_16_1","timing":"after-damage"},
// "17_1":{"name":"ふきとばし","cost":["normal","normal"],"damage":"20","description":"相手の対戦ポケモンを控えポケモンと入れ替える。控えポケモンは相手がえらぶ。相手に控えポケモンがいないときには入れ替えはおこらない。","effect":"skill_17_1","timing":"after-damage"},
// "17_2":{"name":"オウムがえし","cost":["normal","normal","normal"],"damage":"","description":"前の相手の番で受けた「ワザ」と同じ「ワザ」をだす。","effect":"skill_17_2","timing":"before-damage"},
// "18_1":{"name":"つばさでうつ","cost":["normal","normal"],"damage":"20","description":""},
// "18_2":{"name":"ハリケーン","cost":["normal","normal","normal","normal"],"damage":"30","description":"相手の対戦ポケモンが「きぜつ」しなければ、そのカードにのっていたダメージカウンターをとりのぞき、そのカードを持ち主の手札に戻す。そのカードについていた全てのカードも持ち主の手札にもどす。","effect":"skill_18_2","timing":"after-damage"},
"19_1":{"name":"かみつく","cost":["normal"],"damage":"20","description":""},
"20_1":{"name":"かみつく","cost":["normal"],"damage":"20","description":""},
"20_2":{"name":"いかりのまえば","cost":["normal","normal","normal"],"damage":"","description":"相手の残りのHPの半分(切り上げ)のダメージをあたえる。","effect":"skill_20_2","timing":"calc-damage"},
// "21_1":{"name":"つつく","cost":["normal"],"damage":"10","description":""},
// "21_2":{"name":"オウムがえし","cost":["normal","normal","normal"],"damage":"","description":"前の相手の番で受けた「ワザ」と同じ「ワザ」をだす。","effect":"skill_21_2","timing":"before-damage"},
// "22_1":{"name":"こうそくいどう","cost":["normal","normal","normal"],"damage":"20","description":コインを投げて「おもて」なら、次の相手の番の「ワザ」をうけない。","effect":"skill_22_1","timing":"after-damage"},
// "22_2":{"name":"ドリルくちばし","cost":["normal","normal","normal","normal"],"damage":"40","description":""},
"23_1":{"name":"どくえき","cost":["leaf"],"damage":"","description":"コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_23_1","timing":"after-damage"},
"23_2":{"name":"まきつく","cost":["leaf","normal"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_23_2","timing":"after-damage"},
// "24_1":{"name":"いかくこうげき","cost":["leaf"],"damage":"10","description":"相手の対戦ポケモンを控えポケモンと入れ替える。控えポケモンは相手がえらぶ。相手に控えポケモンがいないときには入れ替えはおこらない。","effect":"skill_24_1","timing":"after-damage"},
// "24_2":{"name":"どくのきば","cost":["leaf","leaf","normal"],"damage":"20","description":"相手を「どく」状態にする。","effect":"skill_24_2","timing":"after-damage"},
"25_1":{"name":"かじる","cost":["normal"],"damage":"10","description":""},
"25_2":{"name":"でんげき","cost":["thunder","normal"],"damage":"30","description":"コインを投げて「うら」なら、自分にも10ダメージ。","effect":"skill_25_2","timing":"after-damage"},
"26_1":{"name":"こうそくいどう","cost":["thunder","normal","normal"],"damage":"20","description":"コインを投げて「おもて」なら、次の相手の番の「ワザ」をうけない。","effect":"skill_26_1","timing":"after-damage"},
"26_2":{"name":"かみなり","cost":["thunder","thunder","thunder","normal"],"damage":"60","description":"コインを投げて「うら」なら、自分にも30ダメージ。","effect":"skill_26_2","timing":"after-damage"},
// "27_1":{"name":"すなかけ","cost":["fight"],"damage":"10","description":"「すなかけ」を受けた相手は、次の相手の番に「ワザ」を使うときにコインを投げ、「うら」ならワザは失敗する。","effect":"skill_27_1","timing":"after-damage"},
// "28_1":{"name":"きりさく","cost":["normal","normal"],"damage":"20","description":""},
// "28_2":{"name":"みだれひっかき","cost":["fight","fight"],"damage":"20","damageCaption":"20×","description":"コインを3枚投げて「おもて」の数×20のダメージ。","effect":"skill_28_2","timing":"calc-damage"},
// "29_1":{"name":"みだれひっかき","cost":["leaf"],"damage":"10","damageCaption":"10×","description":"コインを3枚投げて「おもて」の数×10のダメージ。","effect":"skill_29_1","timing":"calc-damage"},
// "29_2":{"name":"なかまをよぶ","cost":["leaf","leaf"],"damage":"","description":"自分の山札から「ニドラン♂」または「ニドラン♀」を1枚ベンチにだす。その後、その山札をよくきる。自分のベンチに空きがなければ使えない。","effect":"skill_29_2","timing":"after-damage"},
// "30_1":{"name":"ちょうおんぱ","cost":["leaf"],"damage":"","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_30_1","timing":"after-damage"},
// "30_2":{"name":"にどげり","cost":["leaf","normal","normal"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の出た数×30のダメージ。","effect":"skill_30_2","timing":"calc-damage"},
// "31_1":{"name":"ラブラブアタック","cost":["leaf","normal"],"damage":"20","damageCaption":"20＋","description":"自分の場に出ている「ニドキング」の数×20のダメージを追加する。","effect":"skill_31_1","timing":"calc-damage"},
// "31_2":{"name":"メガトンパンチ","cost":["leaf","leaf","normal","normal"],"damage":"50","description":""},
"32_1":{"name":"つのでつく","cost":["leaf"],"damage":"30","description":"コインを投げて「うら」なら、このワザは失敗する。","effect":"skill_32_1","timing":"calc-damage"},
"33_1":{"name":"にどげり","cost":["leaf","normal","normal"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の出た数×30のダメージ。","effect":"skill_33_1","timing":"calc-damage"},
"33_2":{"name":"つのドリル","cost":["leaf","leaf","normal","normal"],"damage":"50","description":"","effect":""},
"34_1":{"name":"あばれる","cost":["leaf","normal","normal"],"damage":"30","damageCaption":"30＋","description":"コインを投げて「おもて」なら相手に追加10ダメージ、「うら」なら自分に10ダメージ。","effect":"skill_34_1","timing":"calc-damage"},
"34_2":{"name":"どくどく","cost":["leaf","leaf","leaf"],"damage":"20","description":"相手を「どくどく」状態にし、ポケモンチェックごとに20の「どく」ダメージ。","effect":"skill_34_2","timing":"after-damage"},
// "35_1":{"name":"うたう","cost":["normal"],"damage":"","description":"コインを投げて「おもて」なら、相手を「ねむり」状態にする。","effect":"skill_35_1","timing":"after-damage"},
// "35_2":{"name":"ゆびをふる","cost":["normal","normal","normal"],"damage":"","description":"相手のワザの中から1つを選び、それを自分のワザとして使う。そのワザを使うのに必要なエネルギーがついていなくてもかまわないが、ほかに必要な条件(エネルギーカードをトラッシュするなど)がたりないときには使えない。","effect":"skill_35_2","timing":"before-damage"},
// "36_1":{"name":"ゆびをふる","cost":["normal"],"damage":"","description":"相手のワザの中から1つを選び、それを自分のワザとして使う。そのワザを使うのに必要なエネルギーがついていなくてもかまわないが、ほかに必要な条件(エネルギーカードをトラッシュするなど)がたりないときには使えない。","effect":"skill_36_1","timing":"before-damage"},
// "36_2":{"name":"ちいさくなる","cost":["normal","normal"],"damage":"","description":"次の相手の番でこのカードが受けるダメージが20へる,"effect":"skill_36_2","timing":"after-damage"},
"37_1":{"name":"あやしいひかり","cost":["fire","fire"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_37_1","timing":"after-damage"},
"38_1":{"name":"かどわかす","cost":["normal","normal"],"damage":"","description":"相手の控えポケモンを選んで、相手の対戦ポケモンと入れ替える。","effect":"skill_38_1","timing":"after-damage"},
"38_2":{"name":"だいもんじ","cost":["fire","fire","fire","fire"],"damage":"80","description":"自分の「炎」エネルギーカードを1枚トラッシュする。","effect":"skill_38_2","timing":"before-damage"},
// "39_1":{"name":"こもりうた","cost":["normal"],"damage":"","description":"相手を「ねむり」状態にする。","effect":"skill_39_1","timing":"after-damage"},
// "39_2":{"name":"はたく","cost":["normal","normal"],"damage":"20","description":""},
// "40_1":{"name":"こもりうた","cost":["normal"],"damage":"","description":"相手を「ねむり」状態にする。","effect":"skill_40_1","timing":"after-damage"},
// "40_2":{"name":"ともだちのわ","cost":["normal","normal","normal"],"damage":"10","damageCaption":"10＋","description":"自分の控えポケモンの数×10ダメージを追加する。","effect":"skill_40_2","timing":"calc-damage"},
"41_1":{"name":"ちょうおんぱ","cost":["normal","normal"],"damage":"","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_41_1","timing":"after-damage"},
"41_2":{"name":"きゅうけつ","cost":["leaf","normal"],"damage":"10","description":"相手に与えたダメージぶんのダメージカウンターを自分からとりのぞく。","effect":"skill_41_2","timing":"after-damage"},
"42_1":{"name":"つばさでうつ","cost":["normal","normal","normal"],"damage":"30","description":""},
"42_2":{"name":"きゅうけつ","cost":["leaf","leaf","normal"],"damage":"20","description":"相手に与えたダメージぶんのダメージカウンターを自分からとりのぞく。","effect":"skill_42_2","timing":"after-damage"},
// "43_1":{"name":"しびれごな","cost":["leaf"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_43_1","timing":"after-damage"},
// "43_2":{"name":"ふえる","cost":["leaf","leaf"],"damage":"","description":"自分の山札から「ナゾノクサ」を1匹さがしてベンチにだす。その後、その山札をよくきる。自分のベンチに空きがなければ使えない。","effect":"skill_43_2","timing":"after-damage"},
// "44_1":{"name":"どくのこな","cost":["leaf"],"damage":"","description":"相手を「どく」状態にする。","effect":"skill_44_1","timing":"after-damage"},
// "44_2":{"name":"くさいにおい","cost":["leaf","leaf"],"damage":"20","description":"相手を「こんらん」状態にする。その後、自分も「こんらん」状態になる。","effect":"skill_44_2","timing":"after-damage"},
// "45_1":{"name":"はなびらのまい","cost":["leaf","leaf","leaf"],"damage":"40","damageCaption":"40×","description":"コインを3枚投げて「おもて」の数×40のダメージ。その後、自分は「こんらん」状態になる。","effect":"skill_45_1","timing":"calc-damage"},
"46_1":{"name":"ひっかく","cost":["normal","normal"],"damage":"20","description":""},
"46_2":{"name":"キノコのほうし","cost":["leaf","leaf"],"damage":"","description":"相手を「ねむり」状態にする。","effect":"skill_46_2","timing":"after-damage"},
"47_1":{"name":"キノコのほうし","cost":["leaf","leaf"],"damage":"","description":"相手を「ねむり」状態にする。","effect":"skill_47_1","timing":"after-damage"},
"47_2":{"name":"きりさく","cost":["normal","normal","normal"],"damage":"30","description":""},
"48_1":{"name":"しびれごな","cost":["leaf"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_48_1","timing":"after-damage"},
"48_2":{"name":"きゅうけつ","cost":["leaf","normal"],"damage":"10","description":"相手に与えたダメージぶんのダメージカウンターを自分からとりのぞく。","effect":"skill_48_2","timing":"after-damage"},
"49_1":{"name":"りんぷん","cost":["leaf","leaf"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「どく」と「こんらん」状態にする。","effect":"skill_49_1","timing":"after-damage"},
"50_1":{"name":"あなをほる","cost":["fight"],"damage":"10","description":""},
"50_2":{"name":"どろかけ","cost":["fight","fight"],"damage":"30","description":""},
"51_1":{"name":"きりさく","cost":["fight","fight","normal"],"damage":"40","description":""},
"51_2":{"name":"じしん","cost":["fight","fight","fight","fight"],"damage":"70","description":"自分の控えポケモン全員にも10ダメージ。","effect":"skill_51_2","timing":"after-damage"},
// "52_1":{"name":"ねこにこばん","cost":["normal","normal"],"damage":"10","description":"コインを投げて「おもて」なら、自分の山札の上からカードを1枚ひいて、手札に加える。","effect":"skill_52_1","timing":"after-damage"},
// "53_1":{"name":"ひっかく","cost":["normal","normal"],"damage":"20","description":""},
// "53_2":{"name":"かみつく","cost":["normal","normal","normal"],"damage":"30","description":"「かみつく」を受けた相手は、次の番でこのカードにワザを使う時、与えるダメージが10へる。","effect":"skill_52_1","timing":"after-damage"},
// "54_1":{"name":"ずつう","cost":["esper"],"damage":"10","description":"次の相手の番の終わりまで、相手プレイヤーはトレーナーカードを使うことができない。","effect":"skill_54_1","timing":"after-damage"},
// "54_2":{"name":"みだれひっかき","cost":["aqua"],"damage":"10","damageCaption":"10×","description":"コインを3枚投げて「おもて」の数×10のダメージ。","effect":"skill_54_2","timing":"calc-damage"},
// "55_1":{"name":"ねんりき","cost":["esper"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_55_1","timing":"after-damage"},
// "55_2":{"name":"はかいこうせん","cost":["aqua","aqua","normal"],"damage":"10","description":"相手の対戦ポケモンについているエネルギーカードを1枚選びトラッシュする。","effect":"skill_55_2","timing":"after-damage"},
// "56_1":{"name":"ひっかく","cost":["normal"],"damage":"10","description":""},
// "57_1":{"name":"みだれひっかき","cost":["fight","fight"],"damage":"20","damageCaption":"20×","description":"コインを3枚投げて「おもて」の出た数×20のダメージ。","effect":"skill_57_1","timing":"calc-damage"},
// "57_2":{"name":"あばれまわる","cost":["fight","fight","normal"],"damage":"50","description":"コインを投げて「うら」なら、自分は「こんらん」状態になる。","effect":"skill_57_2","timing":"after-damage"},
"58_1":{"name":"ほのお","cost":["fire","normal"],"damage":"20","description":""},
"59_1":{"name":"かえんほうしゃ","cost":["fire","fire","normal"],"damage":"50","description":"自分の「炎」エネルギーカードを1枚トラッシュする。","effect":"skill_59_1","timing":"before-damage"},
"59_2":{"name":"とっしん","cost":["fire","fire","normal","normal"],"damage":"80","description":"自分にも30ダメージ。","effect":"skill_59_2","timing":"after-damage"},
// "60_1":{"name":"みずでっぽう","cost":["aqua"],"damage":"10","damageCaption":"10＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_60_1","timing":"calc-damage"},
// "61_1":{"name":"ドわすれ","cost":["aqua","aqua"],"damage":"","description":"相手の対戦ポケモンの「ワザ」を1つ選ぶ。次の相手の番でその「ワザ」はつかえない。","effect":"skill_61_1","timing":"after-damage"},
// "61_2":{"name":"おうふくびんた","cost":["aqua","aqua","normal"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の数×30のダメージ。","effect":"skill_61_2","timing":"calc-damage"},
// "62_1":{"name":"みずでっぽう","cost":["aqua","aqua","normal"],"damage":"30","damageCaption":"30＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_62_1","timing":"calc-damage"},
// "62_2":{"name":"うずしお","cost":["aqua","aqua","normal","normal"],"damage":"40","description":"相手の対戦ポケモンについているエネルギーカードを1枚選びトラッシュする。","effect":"skill_62_2","timing":"after-damage"},
"63_1":{"name":"ねんりき","cost":["esper"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_63_1","timing":"after-damage"},
"64_1":{"name":"じこさいせい","cost":["esper","esper"],"damage":"","description":"自分の「超」エネルギーカードを1枚トラッシュすることによってダメージカウンターを全てとりのぞく。","effect":"skill_64_1","timing":"after-damage"},
"64_2":{"name":"ちょうねんりき","cost":["esper","esper","normal"],"damage":"50","description":""},
"65_1":{"name":"あやしいひかり","cost":["esper","esper","esper"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_65_1","timing":"after-damage"},
"66_1":{"name":"けたぐり","cost":["fight"],"damage":"20","description":"","effect":""},
"67_1":{"name":"からてチョップ","cost":["fight","fight","normal"],"damage":"50","damageCaption":"50－","description":"自分にのっているダメージカウンター×10だけ、相手にあたえるダメージがへる。","effect":"skill_67_1","timing":"calc-damage"},
"67_2":{"name":"じごくぐるま","cost":["fight","fight","normal","normal"],"damage":"60","description":"自分にも20ダメージ。","effect":"skill_67_2","timing":"after-damage"},
"68_1":{"name":"ちきゅうなげ","cost":["fight","fight","fight","normal"],"damage":"60","description":"","effect":""},
// "69_1":{"name":"つるのムチ","cost":["leaf"],"damage":"10","description":""},
// "69_2":{"name":"ふえる","cost":["leaf"],"damage":"","description":"自分の山札から「マダツボミ」を1匹さがしてベンチにだす。その後、その山札をよくきる。自分のベンチに空きがなければ使えない。","effect":"skill_69_2","timing":"after-damage"},
// "70_1":{"name":"どくのこな","cost":["leaf"],"damage":"10","description":""コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_70_1","timing":"after-damage"},
// "70_2":{"name":"はっぱカッター","cost":["leaf","leaf"],"damage":"30","description":""},
// "71_1":{"name":"さそうかおり","cost":["leaf"],"damage":"","description":"相手の控えポケモンを選んで、相手の対戦ポケモンと入れ替える。","effect":"skill_71_1","timing":"after-damage"},
// "71_2":{"name":"ようかいえき","cost":["leaf","leaf"],"damage":"20","description":"コインを投げて「おもて」なら、「ようかいえき」を受けた相手の対戦ポケモンは、次の相手の番に「にげる」ことができない。","effect":"skill_72_2","timing":"after-damage"},
"72_1":{"name":"ようかいえき","cost":["aqua"],"damage":"10","description":""},
"73_1":{"name":"ちょうおんぱ","cost":["aqua"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_73_1","timing":"after-damage"},
"73_2":{"name":"クラゲばり","cost":["aqua","aqua"],"damage":"10","description":"相手を「どく」状態にする。","effect":"skill_73_2","timing":"after-damage"},
// "74_1":{"name":"れんぞくいしなげ","cost":["fight","normal"],"damage":"10","damageCaption":"10×","description":"「うら」が出るまでコインを投げ続ける。その間に出た「おもて」の数×10のダメージ。","effect":"skill_74_1","timing":"calc-damage"},
// "75_1":{"name":"かたくなる","cost":["fight","fight"],"damage":"","description":"次の相手の番に受けるダメージが0になる。ただしダメージが40以上の場合は、そのままダメージをうける。","effect":"skill_75_1","timing":"after-damage"},
// "75_2":{"name":"いわおとし","cost":["fight","fight","normal"],"damage":"40","description":""},
// "76_1":{"name":"いわころがり","cost":["fight","fight","fight","normal"],"damage":"60","description":""},
// "76_2":{"name":"じばく","cost":["fight","fight","fight","fight"],"damage":"10","description":"自分と相手に100ダメージをあたえ、お互いの控えポケモン全員にも20ダメージ。","effect":"skill_76_2","timing":"after-damage"},
"77_1":{"name":"けとばす","cost":["normal","normal"],"damage":"20","description":""},
"77_2":{"name":"ほのおのしっぽ","cost":["fire","fire"],"damage":"30","description":""},
"78_1":{"name":"ふみつけ","cost":["normal","normal"],"damage":"20","damageCaption":"20＋","description":"コインを投げて「おもて」なら、10ダメージ追加する。","effect":"skill_78_1","timing":"calc-damage"},
"78_2":{"name":"こうそくいどう","cost":["fire","fire","normal"],"damage":"30","description":"コインを投げて「おもて」なら、次の相手の番の「ワザ」をうけない。","effect":"skill_78_2","timing":"after-damage"},
// "79_1":{"name":"ぼーっとする","cost":["normal"],"damage":"","description":"コインを投げて「おもて」なら、このカードからダメージカウンターを1つとりのぞく。このカードにダメージカウンターがのってない時には、このワザは使えない。","effect":"skill_79_1","timing":"after-damage"},
// "79_2":{"name":" ゴミあさり","cost":["esper","esper"],"damage":"","description":"このカードについている「超」エネルギーカードを1枚トラッシュする。自分のトラッシュの中からトレーナーカードを1枚選び、手札に加える。","effect":"skill_79_2","timing":"after-damage"},
// "80_1":{"name":"ねんりき","cost":["esper","esper"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_80_1","timing":"after-damage"},
"81_1":{"name":"でんじは","cost":["thunder"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_81_1","timing":"after-damage"},
"81_2":{"name":"じばく","cost":["thunder","normal"],"damage":"40","description":"自分と相手に40ダメージをあたえ、お互いの控えポケモン全員にも10ダメージ。","effect":"skill_81_2","timing":"after-damage"},
"82_1":{"name":"でんじは","cost":["thunder","thunder","normal"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_82_1","timing":"after-damage"},
"82_2":{"name":"じばく","cost":["thunder","thunder","normal","normal"],"damage":"80","description":"自分と相手に80ダメージをあたえ、お互いの控えポケモン全員にも20ダメージ。","effect":"skill_82_2","timing":"after-damage"},
// "83_1":{"name":"ネギでたたく","cost":["normal"],"damage":"30","description":"コインを2枚投げて「おもて」の数×10のダメージ。","effect":"skill_83_1","timing":"calc-damage"},
// "83_2":{"name":"ナベでたたく","cost":["normal","normal"],"damage":"30","description":""},
"84_1":{"name":"みだれづき","cost":["normal"],"damage":"10","damageCaption":"10×","description":"コインを2枚投げて「おもて」の数×10のダメージ。","effect":"skill_84_1","timing":"calc-damage"},
// "85_1":{"name":"いかり","cost":["normal","normal","normal"],"damage":"10","damageCaption":"10＋","description":"自分にのっているダメージカウンター×10のダメージを追加する。","effect":"skill_85_1","timing":"calc-damage"},
"86_1":{"name":"ずつき","cost":["aqua"],"damage":"10","description":""},
"87_1":{"name":"オーロラビーム","cost":["aqua","aqua","normal"],"damage":"50","description":""},
"87_2":{"name":"れいとうビーム","cost":["aqua","aqua","normal","normal"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_87_2","timing":"after-damage"},
// "88_1":{"name":"ベトベト","cost":["normal"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_88_1","timing":"after-damage"},
// "88_2":{"name":"ちいさくなる","cost":["normal","normal"],"damage":"","description":"次の相手の番でこのカードが受けるダメージが20へる,"effect":"skill_88_2","timing":"after-damage"},
// "89_1":{"name":"ヘドロこうげき","cost":["leaf","leaf","leaf"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_89_2","timing":"after-damage"},
"90_1":{"name":"ちょうおんぱ","cost":["aqua"],"damage":"","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_90_1","timing":"after-damage"},
"90_2":{"name":"からをとじる","cost":["aqua"],"damage":"","description":"コインを投げて「おもて」なら、次の相手の番にこのカードが受けるダメージは0になる。","effect":"skill_90_2","timing":"after-damage"},
"91_1":{"name":"からではさむ","cost":["aqua","aqua"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。「うら」なら、このワザは失敗する。","effect":"skill_91_1","timing":"calc-damage"},
"91_2":{"name":"とげキャノン","cost":["aqua","aqua"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の数×30のダメージ。","effect":"skill_91_2","timing":"calc-damage"},
// "92_1":{"name":"さいみんガス","cost":["esper"],"damage":"","description":"コインを投げて「おもて」なら、相手を「ねむり」状態にする。","effect":"skill_92_1","timing":"after-damage"},
// "92_2":{"name":"みちづれ","cost":["esper","normal"],"damage":"","description":"自分の「超」エネルギーカードを1枚トラッシュする。次の相手の番で自分が「きぜつ」したときには、相手の対戦ポケモンも「きぜつ」する。","effect":"skill_92_2","timing":"after-damage"},
// "93_1":{"name":"さいみんじゅつ","cost":["esper"],"damage":"","description":"相手を「ねむり」状態にする。","effect":"skill_93_1","timing":"after-damage"},
// "93_2":{"name":"ゆめくい","cost":["esper","esper"],"damage":"50","description":"相手が「ねむり」状態のときだけ、ダメージをあたえる。","effect":"skill_93_2","timing":"calc-damage"},
// "94_1":{"name":"ナイトヘッド","cost":["esper","esper","esper"],"damage":"30","description":"相手の控えポケモンから1匹選び10ダメージ。相手に控えポケモンがいない時には、この効果はない。","effect":"skill_94_1","timing":"after-damage"},
// "95_1":{"name":"いわおとし","cost":["fight"],"damage":"10","description":""},
// "95_2":{"name":"かたくなる","cost":["fight","fight"],"damage":"","description":"次の相手の番に受けるダメージが0になる。ただしダメージが40以上の場合は、そのままダメージをうける。","effect":"skill_95_2","timing":"after-damage"},
"96_1":{"name":"はたく","cost":["normal"],"damage":"10","description":""},
"96_2":{"name":"あやしいひかり","cost":["esper","esper"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_96_2","timing":"after-damage"},
// "97_1":{"name":"みらいよち","cost":["esper"],"damage":"","description":"自分または相手の山札の上から3枚まで見て、好きな順番に入れ替えて、もとの山札の上にもどす。","effect":"skill_97_1","timing":"after-damage"},
// "97_2":{"name":"ナイトヘッド","cost":["esper","esper","esper"],"damage":"30","description":"相手の控えポケモンから1匹選び10ダメージ。相手に控えポケモンがいない時には、この効果はない。","effect":"skill_97_2","timing":"after-damage"},
// "98_1":{"name":"なかまをよぶ","cost":["aqua"],"damage":"","description":"自分の山札から「クラブ」を1匹さがしてベンチにだす。その後、その山札をよくきる。自分のベンチに空きがなければ使えない。","effect":"skill_98_1","timing":"after-damage"},
// "98_2":{"name":"はさむ","cost":["aqua","normal"],"damage":"20","description":""},
// "99_1":{"name":"じたばた","cost":["aqua"],"damage":"10","damageCaption":"10×","description":"自分のダメージカウンターの数×10のダメージをあたえる。","effect":"skill_99_1","timing":"calc-damage"},
// "99_2":{"name":"クラブハンマー","cost":["aqua","aqua","normal"],"damage":"40","description":""},
"100_1":{"name":"たいあたり","cost":["normal"],"damage":"10","description":""},
"101_1":{"name":"でんげき","cost":["thunder","thunder","thunder"],"damage":"50","description":"コインを投げて「うら」なら、自分にも10ダメージ。","effect":"skill_101_1","timing":"after-damage"},
// "102_1":{"name":"さいみんじゅつ","cost":["esper"],"damage":"","description":"相手を「ねむり」状態にする。","effect":"skill_102_1","timing":"after-damage"},
// "102_2":{"name":"やどりぎのタネ","cost":["leaf","leaf"],"damage":"20","description":"相手にダメージを与えたら、自分のダメージカウンターを1つとりのぞく。","effect":"skill_102_2","timing":"after-damage"},
// "103_1":{"name":"テレポート","cost":["esper"],"damage":"","description":"自分の控えポケモンを選び、このカードと入れ替える。","effect":"skill_103_1","timing":"after-damage"},
// "103_2":{"name":"たまなげMAX","cost":["normal"],"damage":"20","damageCaption":"20×","description":"自分についているエネルギーの数だけコインを投げて「おもて」の数×20のダメージ。","effect":"skill_103_1","timing":"calc-damage"},
// "104_1":{"name":"なきつく","cost":["normal"],"damage":"","description":"「なきつく」を受けた相手は、次の番でこのカードにワザを使う時、与えるダメージが20へる。","effect":"skill_104_1","timing":"after-damage"},
// "104_2":{"name":"いかり","cost":["fight","fight"],"damage":"10","damageCaption":"10＋","description":"自分にのっているダメージカウンター×10のダメージを追加する。","effect":"skill_104_2","timing":"calc-damage"},
// "105_1":{"name":"ほねブーメラン","cost":["fight","fight"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の数×30のダメージ。","effect":"skill_105_1","timing":"calc-damage"},
// "105_2":{"name":"たすけをよぶ","cost":["fight","fight","normal"],"damage":"","description":"自分の山札から「闘」ポケモンを1匹選んでベンチにだす。その後、その山札をよくきる。進化カードは選べない。自分のベンチに空きがなければ使えない。","effect":"skill_105_2","timing":"after-damage"},
// "106_1":{"name":"のびるキック","cost":["fight","fight"],"damage":"","description":"相手の控えポケモンを1匹選び、そのポケモンに20ダメージ。相手に控えポケモンがいないとき、このワザは使えない。","effect":"skill_106_1","timing":"after-damage"},
// "106_2":{"name":"とびひざげり","cost":["fight","fight","fight"],"damage":"50","description":""},
"107_1":{"name":"ジャブ","cost":["fight"],"damage":"20","description":""},
"107_2":{"name":"スペシャルパンチ","cost":["fight","fight","normal"],"damage":"40","description":""},
"108_1":{"name":"まきつくベロ","cost":["normal"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_108_1","timing":"after-damage"},
"108_2":{"name":"ちょうおんぱ","cost":["normal","normal"],"damage":"","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_108_2","timing":"after-damage"},
"109_1":{"name":"くさいガス","cost":["leaf","leaf"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「どく」状態、「うら」なら「こんらん」状態にする。","effect":"skill_109_1","timing":"after-damage"},
"110_1":{"name":"スモッグ","cost":["leaf","leaf"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「どく」状態にする。","effect":"skill_110_1","timing":"after-damage"},
"110_2":{"name":"じばく","cost":["leaf","leaf","normal"],"damage":"60","description":"自分と相手に60ダメージをあたえ、お互いの控えポケモン全員にも10ダメージ。","effect":"skill_110_2","timing":"after-damage"},
// "111_1":{"name":"にらみつける","cost":["normal"],"damage":"","description":"コインを投げて「おもて」なら「にらみつける」を受けた相手の対戦ポケモンは、次の相手の番にワザをつかえない。","effect":"skill_111_1","timing":"after-damage"},
// "111_2":{"name":"つのでつく","cost":["fight","normal","normal"],"damage":"30","description":""},
// "112_1":{"name":"つのでつく","cost":["fight","normal","normal"],"damage":"30","description":""},
// "112_2":{"name":"げきとつ","cost":["fight","fight","fight","fight"],"damage":"50","description":"相手の対戦ポケモンを控えポケモンと入れ替える。控えポケモンは相手がえらぶ。相手に控えポケモンがいないときには入れ替えはおこらない。その後、自分にも20ダメージ。","effect":"skill_112_2","timing":"after-damage"},
"113_1":{"name":"まるまる","cost":["normal","normal"],"damage":"","description":"コインを投げて「おもて」なら、次の相手の番にうけるダメージが0になる。","effect":"skill_113_1","timing":"after-damage"},
"113_2":{"name":"すてみタックル","cost":["normal","normal","normal","normal"],"damage":"80","description":"自分にも80ダメージ。","effect":"skill_113_2","timing":"after-damage"},
"114_1":{"name":"しめつける","cost":["leaf","normal"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_114_1","timing":"after-damage"},
"114_2":{"name":"どくのこな","cost":["leaf","leaf","leaf"],"damage":"20","description":"相手を「どく」状態にする。","effect":"skill_114_2","timing":"after-damage"},
// "115_1":{"name":"こどものおつかい","cost":["normal"],"damage":"","description":"自分の山札の上からカードを1枚ひいて、手札に加える。","effect":"skill_115_1","timing":"after-damage"},
// "115_2":{"name":"れんぞくパンチ","cost":["normal","normal","normal","normal"],"damage":"20","damageCaption":"20×","description":"コインを4枚投げて「おもて」の数×20のダメージ。","effect":"skill_115_2","timing":"calc-damage"},
// "116_1":{"name":"えんまく","cost":["aqua"],"damage":"10","description":"「えんまく」を受けた相手は、次の相手の番に「ワザ」を使うときにコインを投げ、「うら」ならワザは失敗する。","effect":"skill_116_1","timing":"after-damage"},
// "117_1":{"name":"みずでっぽう","cost":["aqua","normal"],"damage":"20","damageCaption":"20＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_117_1","timing":"calc-damage"},
// "117_2":{"name":"こうそくいどう","cost":["aqua","normal","normal"],"damage":"20","description":コインを投げて「おもて」なら、次の相手の番の「ワザ」をうけない。","effect":"skill_117_2","timing":"after-damage"},
"118_1":{"name":"つのでつく","cost":["aqua"],"damage":"10","description":""},
"119_1":{"name":"つのでつく","cost":["aqua"],"damage":"10","description":""},
"119_2":{"name":"たきのぼり","cost":["aqua","normal"],"damage":"30","description":""},
"120_1":{"name":"ひらてうち","cost":["aqua"],"damage":"20","description":""},
"121_1":{"name":"じこさいせい","cost":["aqua","aqua"],"damage":"","description":"自分の「水」エネルギーカードを1枚トラッシュすることによってダメージカウンターを全てとりのぞく。","effect":"skill_121_1","timing":"after-damage"},
"121_2":{"name":"スターフリーズ","cost":["aqua","normal","normal"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_121_2","timing":"after-damage"},
// "122_1":{"name":"ヨガのポーズ","cost":["esper","normal"],"damage":"10","damageCaption":"10+","description":"相手のポケモンにのっているダメージカウンター×10のダメージを追加する。","effect":"skill_122_1","timing":"calc-damage"},
// "123_1":{"name":"つるぎのまい","cost":["leaf"],"damage":"","description":"次の自分の番だけ、このカードが使う「きりさく」のダメージは2倍になる。","effect":"skill_123_1","timing":"after-damage"},
// "123_2":{"name":"きりさく","cost":["normal","normal","normal"],"damage":"30","description":""},
"124_1":{"name":"おうふくびんた","cost":["esper"],"damage":"10","damageCaption":"10×","description":"コインを2枚投げて「おもて」の数×10のダメージ。","effect":"skill_124_1","timing":"calc-damage"},
"124_2":{"name":"ヨガのポーズ","cost":["esper","esper","normal"],"damage":"20","damageCaption":"20+","description":"相手のポケモンにのっているダメージカウンター×10のダメージを追加する。","effect":"skill_124_2","timing":"calc-damage"},
"125_1":{"name":"でんきショック","cost":["thunder"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_125_1","timing":"after-damage"},
"125_2":{"name":"かみなりパンチ","cost":["thunder","normal"],"damage":"30","damageCaption":"30+","description":"コインを投げて「おもて」なら、相手に10ダメージを追加する。「うら」なら自分にも10ダメージ。","effect":"skill_125_2","timing":"calc-damage"},
"126_1":{"name":"ほのおパンチ","cost":["fire","fire"],"damage":"30","description":""},
"126_2":{"name":"かえんほうしゃ","cost":["fire","fire","normal"],"damage":"50","description":"自分の「炎」エネルギーカードを1枚トラッシュする。","effect":"skill_126_2","timing":"before-damage"},
"127_1":{"name":"まんりきばさみ","cost":["leaf","leaf"],"damage":"20","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_127_1","timing":"after-damage"},
"127_2":{"name":"ハサミギロチン","cost":["leaf","leaf","normal","normal"],"damage":"50","description":""},
// "128_1":{"name":"ふみつけ","cost":["normal","normal"],"damage":"20","damageCaption":"20＋","description":"コインを投げて「おもて」なら、10ダメージ追加する。","effect":"skill_128_1","timing":"calc-damage"},
// "128_2":{"name":"いかりくるう","cost":["normal","normal","normal"],"damage":"20","damageCaption":"20＋","description":"自分にのっているダメージカウンター×10のダメージを追加する。その後、コインを投げて「うら」なら、自分は「こんらん」状態になる。","effect":"skill_128_2","timing":"calc-damage"},
"129_1":{"name":"じたばた","cost":["aqua"],"damage":"10","damageCaption":"10×","description":"自分のダメージカウンターの数×10のダメージをあたえる。","effect":"skill_129_1","timing":"calc-damage"},
"130_1":{"name":"りゅうのいかり","cost":["aqua","aqua","aqua"],"damage":"50","description":""},
"130_2":{"name":"バブルこうせん","cost":["aqua","aqua","aqua","aqua"],"damage":"40","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_130_2","timing":"after-damage"},
"131_1":{"name":"みずでっぽう","cost":["aqua"],"damage":"10","damageCaption":"10＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_131_1","timing":"calc-damage"},
"131_2":{"name":"あやしいひかり","cost":["aqua","aqua"],"damage":"10","description":"コインを投げて「おもて」なら、相手を「こんらん」状態にする。","effect":"skill_131_2","timing":"after-damage"},
// "133_1":{"name":"しっぽをふる","cost":["normal"],"damage":"","description":"コインを投げて「おもて」なら「しっぽをふる」を受けた相手の対戦ポケモンは、次の相手の番にワザをつかえない。","effect":"skill_133_1","timing":"after-damage"},
// "133_2":{"name":"でんこうせっか","cost":["normal","normal"],"damage":"10","damageCaption":"10＋","description":"コインを投げて「おもて」なら、20ダメージ追加する。","effect":"skill_133_2","timing":"calc-damage"},
// "134_1":{"name":"でんこうせっか","cost":["normal","normal"],"damage":"10","damageCaption":"10＋","description":"コインを投げて「おもて」なら、20ダメージ追加する。","effect":"skill_134_1","timing":"calc-damage"},
// "134_2":{"name":"みずでっぽう","cost":["aqua","aqua","normal"],"damage":"30","damageCaption":"30＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_134_1","timing":"calc-damage"},
// "135_1":{"name":"でんこうせっか","cost":["normal","normal"],"damage":"10","damageCaption":"10＋","description":"コインを投げて「おもて」なら、20ダメージ追加する。","effect":"skill_135_1","timing":"calc-damage"},
// "135_2":{"name":"ミサイルばり","cost":["thunder","thunder","normal"],"damage":"20","damageCaption":"20×","description":"コインを4枚投げて「おもて」の数×20のダメージを相手にあたえる。","effect":"skill_135_1","timing":"calc-damage"},
// "136_1":{"name":"でんこうせっか","cost":["normal","normal"],"damage":"10","damageCaption":"10＋","description":"コインを投げて「おもて」なら、20ダメージ追加する。","effect":"skill_136_1","timing":"calc-damage"},
// "136_2":{"name":"かえんほうしゃ","cost":["fire","fire","normal","normal"],"damage":"60","description":"自分の「炎」エネルギーカードを1枚トラッシュする。","effect":"skill_136_2","timing":"before-damage"},
// "137_1":{"name":"テクスチャー1","cost":["normal"],"damage":"","description":"相手の対戦ポケモンの弱点を好きな「タイプ」にかえる。ただし「無色」にはできない。相手がベンチに戻った時にその効果は消える。","effect":"skill_137_1","timing":"after-damage"},
// "137_2":{"name":"テクスチャー2","cost":["normal","normal"],"damage":"","description":"自分の抵抗力を好きな「タイプ」にかえる。ただし「無色」にはできない。自分がベンチに戻った時にその効果は消える。","effect":"skill_137_2","timing":"after-damage"},
// "138_1":{"name":"みずでっぽう","cost":["aqua"],"damage":"10","damageCaption":"10＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_138_1","timing":"calc-damage"},
// "139_1":{"name":"みずでっぽう","cost":["aqua","normal"],"damage":"20","damageCaption":"20＋","description":"このワザに必要な分よりも多く「水」エネルギーがついている時、多いエネルギー1つにつき10ダメージを追加する。(ダメージ追加は2つぶんまで)","effect":"skill_139_1","timing":"calc-damage"},
// "139_2":{"name":"とげキャノン","cost":["aqua","aqua"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の数×30のダメージ。","effect":"skill_139_2","timing":"calc-damage"},
// "140_1":{"name":"ひっかく","cost":["normal"],"damage":"10","description":""},
// "141_1":{"name":"するどいかま","cost":["fight","fight"],"damage":"30","description":""},
// "141_2":{"name":"すいとる","cost":["fight","fight","fight","fight"],"damage":"40","description":"相手に与えたダメージの半分(切り上げ)のダメージカウンターを自分からとりのぞく。","effect":"skill_141_2","timing":"after-damage"},
// "142_1":{"name":"つばさでうつ","cost":["normal","normal","normal"],"damage":"30","description":""},
// "143_1":{"name":"のしかかり","cost":["normal","normal","normal","normal"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_143_1","timing":"after-damage"},
// "144_1":{"name":"フリーズドライ","cost":["aqua","aqua","aqua"],"damage":"30","description":"コインを投げて「おもて」なら、相手を「マヒ」状態にする。","effect":"skill_144_1","timing":"after-damage"},
// "144_2":{"name":"ふぶき","cost":["aqua","aqua","aqua","aqua"],"damage":"50","description":"コインを投げて「おもて」なら相手の控えポケモン全員に、「うら」なら自分の控えポケモン全員に、それぞれ10ダメージ。","effect":"skill_144_2","timing":"after-damage"},
"145_1":{"name":"かみなり","cost":["thunder","thunder","thunder","normal"],"damage":"60","description":"コインを投げて「うら」なら、自分にも30ダメージ。","effect":"skill_145_1","timing":"after-damage"},
"145_2":{"name":"10まんボルト","cost":["thunder","thunder","thunder","thunder"],"damage":"100","description":"自分のエネルギーカードを全てトラッシュする。","effect":"skill_145_2","timing":"after-damage"},
// "146_1":{"name":"やまやき","cost":["fire"],"damage":"","description":"自分の「炎」エネルギーカードを好きなだけトラッシュする。その後、トラッシュしたのと同じ枚数のカードを相手の山札の上から取り、トラッシュする。","effect":"skill_146_1","timing":"after-damage"},
// "146_2":{"name":"ゴッドバード","cost":["fire","fire","fire","fire"],"damage":"","description":"コインを投げて「うら」なら、このワザは失敗する。","effect":"skill_146_2","timing":"calc-damage"},
"147_1":{"name":"はたく","cost":["normal"],"damage":"10","description":"","effect":""},
"148_1":{"name":"たたきつける","cost":["normal","normal","normal"],"damage":"30","damageCaption":"30×","description":"コインを2枚投げて「おもて」の数×30のダメージを相手にあたえる。","effect":"skill_148_1","timing":"calc-damage"},
"148_2":{"name":"はかいこうせん","cost":["normal","normal","normal","normal"],"damage":"20","description":"相手の対戦ポケモンについているエネルギーカードを1枚選びトラッシュする。","effect":"skill_148_2","timing":"after-damage"},
// "149_1":{"name":"たたきつける","cost":["normal","normal","normal","normal"],"damage":"40","damageCaption":"40×","description":"コインを2枚投げて「おもて」の数×40のダメージを相手にあたえる。","effect":"skill_149_1","timing":"calc-damage"},
"150_1":{"name":"サイコキネシス","cost":["esper","normal"],"damage":"10","damageCaption":"10＋","description":"相手についているエネルギーカード×10の追加ダメージをあたえる。","effect":"skill_150_1","timing":"calc-damage"},
"150_2":{"name":"バリアー","cost":["esper","esper"],"damage":"","description":"自分についている「超」エネルギーカードを1枚はがしてすてることによって、次の相手の番の「ワザ」をうけない。","effect":"skill_150_2","timing":"after-damage"},
// "151_1":{"name":"サイコウェーブ","cost":["esper"],"damage":"10","damageCaption":"10×","description":"相手についているエネルギーカード×10のダメージ。","effect":"skill_151_1","timing":"calc-damage"},
// "151_2":{"name":"たいかビーム","cost":["esper","esper"],"damage":"","description":"自分または相手の場にいるポケモンの中から「進化カード」のついているもの1匹を選び、その「進化カード」を上から1枚はがして持ち主の手札に戻す。","effect":"skill_151_2","timing":"after-damage"}
};