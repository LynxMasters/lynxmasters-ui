<template>
<loading-progress
                  :progress="progress"
                  :indeterminate="indeterminate"
                  :counter-clockwise="counterClockwise"
                  :hide-background="hideBackground"
                  size="64"
                  rotate
                  fillDuration="2"
                  rotationDuration="1"
              />
</template>
<script>
export default{
	data() {
      return {
        indeterminate: true,
        progress: 0,
        counterClockwise: false,
        hideBackground: false,
      }
    },
}
</script>