<template>
  <h1>Profile</h1>
  <h2>Skill Sets</h2>

  <h3>Basic Skills</h3>
  <p>Git/GitHub: ++</p>
  <p>Linux/Ubuntu: ++</p>
  <p>Network: ++</p>
  <h3>Frontend Skills</h3>
  <p>HTML/CSS: +++</p>
  <p>JS/TS: +++</p>
  <p>Vue/Nuxt: +++</p>
  <p>React/Next: ++</p>
  <p>XD/Figma: +</p>
  <h3>Backend Skills</h3>
  <p>Node/Express: ++</p>
  <p>Ruby/Ruby on Rails: ++</p>
  <p>Rust: +</p>
  <p>C++: +</p>
  <h3>Infrastructure Skills</h3>
  <p>AWS: ++</p>
  <p>Nginx: ++</p>
  <p>Postfix/Dovecot: ++</p>
  <h3>Machine Learning</h3>
  <p>Python: ++</p>
  <p>NLP: +</p>

  <h3>Description</h3>
  <p>
    +++++: <br />
    ソースコードを読み込み、関連ライブラリも把握している。「とりあえずやりたいことを決めましょう」
  </p>
  <p>
    ++++:<br />
    大規模な制作物をつくった。必要があればソースコードレベルまで調査できる。「わからないところあったら聞いてください。」
  </p>
  <p>
    +++:<br />
    中規模の制作物をつくった。主要な関連ライブラリの概要などは把握している。言語の特性を活かした使い方ができる。「結構ちゃんと使ってます。できると思います！」
  </p>
  <p>
    ++:<br />
    一定量があるチュートリアルなどを終わらせた。小さな制作物をつくった。「使用したことはあります、なんとなく書き方わかります」
  </p>
  <p>
    +:<br />
    触ったことがある。書き捨てのコードを書いたことがある。「使うんですか…？はい、今から勉強頑張ります！」
  </p>
</template>
<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { blogName } from "../utils/constant";

useHead({
  title: `Profile | ${blogName}`,
});
</script>
