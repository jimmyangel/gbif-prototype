<template>
  <div>
    <b-navbar :fixed-top="true">
      <template slot="brand">
        <b-navbar-item class="has-text-centered">
          <b>PROTOTIPO<br>GBIF</b>
        </b-navbar-item>
      </template>
    </b-navbar>
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <slot name="banner" />
        </div>
      </div>
    </section>
    <transition name="fade" appear>
      <section class="layout">
        <slot />
      </section>
    </transition>
  </div>
</template>

<static-query>


</static-query>

<style lang="scss" scoped>

  @import "~/assets/style/_variables";

  .hero {
    background-color: rgba(85,107,47, 0.1)
  }

  .hero-body {
    margin: auto;
  }

  .layout {
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
  }

</style>
