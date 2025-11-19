<script setup lang="ts">
const { resetSidebar } = useSidebar();

const handleResize = () => {
    if (window.innerWidth > 768) {
        resetSidebar();
    }
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});
onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});
</script>

<template>
    <div class="content-wrapper">
        <div class="content-container">
            <NuxtLayout>
                <NuxtPage />
            </NuxtLayout>
        </div>
    </div>
</template>

<style lang="sass">
@import "./assets/css/tailwind.css"
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');
*
  box-sizing: border-box
  font-family: 'Roboto', sans-serif

html, body
  margin: 0
  padding: 0
  height: 100%

html
  box-sizing: border-box

*::before,
*::after
  box-sizing: border-box

.content-wrapper
  display: flex
  justify-content: center
  align-items: center
  height: 100vh
  color: var(--color-slate-50)
  background-color: var(--color-brand-800)
  position: relative
  overflow: hidden
  z-index: 1
  @media (max-width: 768px)
    padding: 0 0 100px 0
    height: 100dvh
  &::before
    content: ''
    position: absolute
    width: 600px
    height: 600px
    top: 10%
    left: 10%
    transform: translate(-50%, -50%)
    border: 20px solid transparent
    border-radius: 50%
    background: linear-gradient(40deg, var(--color-brand-600), var(--color-brand-700) 70%)
    background-size: 110% 110%
    mask: radial-gradient(circle at center, transparent 35%, black 36%)
    -webkit-mask: radial-gradient(circle at center, transparent 35%, black 36%)
    z-index: -1

  &::after
    content: ''
    position: absolute
    width: 400px
    height: 400px
    bottom: 10%
    right: 10%
    transform: translate(50%, 50%)
    border: 20px solid transparent
    border-radius: 50%
    background-color: var(--color-brand-500)
    z-index: -1
    overflow: hidden

.content-container
  width: 100%
  max-width: 1536px
  min-width: 320px
  height: 100%
  padding: 32px
  @media (max-width: 768px)
    padding: 0

::-webkit-scrollbar
  width: 8px
  height: 8px

::-webkit-scrollbar-thumb
  background: var(--color-brand-800)
  border-radius: 4px
.sidebar-item-triangle
  // height: 40px
  // border-top: 24px solid transparent
  // border-bottom: 24px solid transparent
  // border-left: 12px solid var(--color-brand-400)
</style>
