<template>
  <div class="weather-widget__spinner__wrapper">
    <slot name="prepend"></slot>
    <div
        class="weather-widget__spinner"
    >

    </div>
    <slot name="append"></slot>
  </div>

</template>

<script>
export default {
  name: "AppSpinner"
}
</script>

<style lang="scss" scoped>
.weather-widget__spinner__wrapper {
  display: flex;
  align-items: center;
}
.weather-widget__spinner {
  border-radius: 50%;
  border:0.15rem $accentColor solid;
  margin: 0.25rem;
  border-top-color:$transparent;
  animation: rotate 2s linear infinite;
  height: 1em;
  width: 1em;
  display: inline-block;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
