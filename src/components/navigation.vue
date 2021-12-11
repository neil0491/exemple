<template>
  <!-- Debug, real template is burger & its menu -->
  <button @click="isOpenMenu = !isOpenMenu" class="burger-container">
    <div class="burger" :class="{ active: isOpenMenu }"></div>
  </button>
  <transition name="blur-bg">
    <div class="blur" v-show="isOpenMenu"></div>
  </transition>
  <transition @enter="enterMenu" @leave="leaveMenu">
    <div v-show="isOpenMenu" class="wrapper-menu">
      <ul class="menu">
        <li
          @click="isOpenMenu = false"
          v-for="(link, index) in menuWithRoute"
          :key="index"
        >
          <div :data-index="index" class="menu__item">
            <router-link
              class="menu__link"
              :to="
                $i18nRoute({
                  name: link.name,
                })
              "
            >
              {{ $t(`main.routes.${link.name}`) }}
              <div class="border-bottom"></div>
            </router-link>
            <div class="choices">
              <router-link
                :to="
                  $i18nRoute({
                    name: `${link.name}Choice`,
                    params: {
                      choice: choice,
                    },
                  })
                "
                class="choices__link"
                v-for="(choice, index) in link?.meta?.choices"
                :key="index"
              >
                <animation-text :ref="animations">
                  <text-stroke>{{ $t(`main.meta.${choice}`) }} </text-stroke>
                </animation-text>
              </router-link>
            </div>
          </div>
        </li>
      </ul>
      <div class="lang">
        <div
          class="lang__choice"
          :class="{ active: i18n.global.locale._value === lang }"
          @click="switchLanguage(lang)"
          v-for="(lang, index) in SUPPORT_LOCALES"
          :key="index"
        >
          <animation-text :ref="animations">
            <text-stroke ref="lang" :durationEnter="4" :delayEnter="2">
              {{ $t(`main.short_lang.${lang}`) }}
            </text-stroke>
          </animation-text>
        </div>
      </div>
    </div>
  </transition>
  <div class="next" @click="goNext">Go Next</div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { useLanguage } from '@/utils/language';
import { keyframes, SUPPORT_LOCALES } from '@/utils/constants';
import { onBeforeUnmount, onUpdated, ref } from 'vue';
import { useStore } from 'vuex';
import { childRoutes } from '@/router';
import { gsap } from 'gsap';
import TextStroke from './TextStroke.vue';
import AnimationText from '@/components/AnimationText.vue';
import { usePageAnimation } from '@/utils/pageAnimation';

export default {
  components: { TextStroke, AnimationText },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { i18nRoute } = useLanguage();
    const store = useStore();

    let currentRoute = 0;

    //     Menu Animation
    const lang = ref(false);
    const isOpenMenu = ref(false);
    let animationsList = [];

    const animations = (el) => {
      if (el) {
        animationsList.push(el);
      }
    };

    onUpdated(() => {
      if (isOpenMenu.value) {
        lang.value.show();
        for (const anim of animationsList) {
          anim.show();
        }
      } else {
        lang.value.hide();
        for (const anim of animationsList) {

          anim.hide();
        }
      }
    });

    const animationEnterText = (el, done = () => {}) => {
      if (el) {
        gsap.fromTo(
          el,
          {
            x: '-100vw',
          },
          {
            x: '0',
            duration: 1,
            stagger: {
              amount: 1,
            },
            onComplete: done,
          }
        );
      }
    };
    const animationEnterBorder = (el, done = () => {}, delay = 2) => {
      if (el) {
        gsap.to(el, {
          opacity: 1,
          delay: delay,
          duration: 1,
          width: '100vw',
          onComplete: done,
        });
      }
    };

    const animationLeaveText = (el, done = () => {}) => {
      if (el) {
        gsap.to(el, {
          x: '-100vw',
          duration: 2,
          delay: 2,
          stagger: {
            amount: 0.5,
          },
          onComplete: done,
        });
      }
    };
    const animationLeaveBorder = (el, done = () => {}) => {
      gsap.to(el, {
        opacity: 0,
        duration: 2,
        width: '0%',
        stagger: {
          amount: 1,
        },
        onComplete: done,
      });
    };

    const enterMenu = (el, done) => {
      if (el) {
        const text = el.querySelectorAll('.menu__link');
        const border = el.querySelector('.router-link-active .border-bottom');
        animationEnterBorder(border);
        animationEnterText(text, done);
      }
    };

    const hoverEnterMenu = (el) => {
      if (el) {
        const border = el.target.querySelector('.border-bottom');
        animationEnterBorder(border, () => {}, 0.5);
      }
    };

    const hoverOutMenu = (el) => {
      const border = el.target.querySelector('.border-bottom');
      animationLeaveBorder(border);
    };

    const leaveMenu = (el, done) => {
      const text = el.querySelectorAll('.menu__link');
      const border = el.querySelectorAll('.border-bottom');
      animationLeaveBorder(border);
      animationLeaveText(text, done);
    };

    //    Ends Menu Animation

    /*************** Route List Menu ******************/

    const menuWithRoute = [];

    const menu = [
      'Welcome',
      // 'FiveDays',
      'Pictures',
      'News',
      'World',
      'History',
      'Contacts',
      'Program',
    ];
    const recursiveChildren = (arr, routes) => {
      if (!routes || routes.length === 0) {
        return;
      }
      const recChildren = [];
      routes.forEach((route, index) => {
        if (arr.includes(route.name)) {
          menuWithRoute.push({
            name: route.name,
            meta: routes[index + 1]?.meta,
          });
        }
        recChildren.push({
          ...route,
          name: route.name,
          children: recursiveChildren(arr, route.children),
        });
      });
      return recChildren;
    };

    recursiveChildren(menu, childRoutes);

    /*************** End Route List Menu ******************/

    const goNext = () => {
      const routes = Object.keys(keyframes);
      currentRoute = routes.indexOf(route.name.split('_')[1]);
      if (currentRoute + 1 >= routes.length) {
        currentRoute = 0;
      } else {
        currentRoute++;
      }
      store.commit('overlays/setScreen', routes[currentRoute]);

      router.push(
        i18nRoute({
          name: routes[currentRoute],
          params: {
            slug: 'slug',
            choice: 'choice',
            year: 'year',
          },
        })
      );
    };

    const goPrev = () => {
      const routes = Object.keys(keyframes);
      currentRoute = routes.indexOf(route.name.split('_')[1]);
      if (currentRoute - 1 < 0) {
        currentRoute = routes.length - 1;
      } else {
        currentRoute--;
      }
      router.push(
        i18nRoute({
          name: routes[currentRoute],
          params: {
            slug: 'slug',
            choice: 'choice',
            year: 'year',
          },
        })
      );
    };
    const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

    function preventDefault(e) {
      e.preventDefault();
      if (e.deltaY < 0) {
        console.log('up');
      } else if (e.deltaY > 0) {
        console.log('down');
      }
    }

    function preventDefaultForScrollKeys(e) {
      if (keys[e.keyCode]) {
        preventDefault(e);
        if (e.keyCode === 38) {
          console.log('up');
        } else if (e.keyCode === 40) {
          console.log('down');
        }
        console.log(e.keyCode);
        return false;
      }
    }
    // modern Chrome requires { passive: false } when adding event
    let supportsPassive = false;

    if (typeof window !== 'undefined') {
      try {
        window.addEventListener(
          'test',
          null,
          Object.defineProperty({}, 'passive', {
            /* eslint-disable */
            get: function() {
              supportsPassive = true;
            },
            /* eslint-enable */
          })
        );
        /* eslint-disable no-empty */
      } catch (e) {}
      /* eslint-enable no-empty */
    }

    let wheelOpt = supportsPassive ? { passive: false } : false;
    let wheelEvent =
      'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    if (typeof window !== 'undefined') {
      window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
      window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
      window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
      window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    const enableScroll = () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener(
          'keydown',
          preventDefaultForScrollKeys,
          false
        );
      }
    };

    onBeforeUnmount(() => {
      enableScroll();
    });

    return {
      isOpenMenu,
      menu,
      menuWithRoute,
      lang,
      hoverOutMenu,
      hoverEnterMenu,
      enterMenu,
      leaveMenu,
      goNext,
      goPrev,
      SUPPORT_LOCALES,
      ...useLanguage(),
      ...usePageAnimation(),
      animations,
    };
  },
};
</script>

<style lang="scss">
.next {
  position: fixed;
  bottom: 2em;
  right: 0;
  padding: 0.7em 0.8em;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  font-size: 24px;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.4s;

  &:hover {
    background: #fff;
    color: #000;
  }
}
/*******************  Burger  **************************/
.burger {
  position: relative;
  width: 100%;
  height: 100%;
  transition: all 0.8s;
  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: #fff;
    transition: all 0.8s;
  }
  &::after {
    clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 50%);
    transform: translateY(80%);
  }
  &::before {
    clip-path: polygon(0 0, 100% 50%, 100% 100%, 0 100%);
    transform: translateY(-80%);
  }
  &.active {
    &::after {
      transform: translateY(0%);
      clip-path: polygon(0 0, 100% 0%, 100% 100%, 0 50%);
    }
    &::before {
      transform: translateY(0%);

      clip-path: polygon(0 0, 100% 50%, 100% 100%, 0 100%);
    }
  }
}
.burger-container {
  position: fixed;
  right: 70px;
  top: 55px;
  width: 120px;
  height: 13px;
  cursor: pointer;
  background: transparent;
  outline: none;
  z-index: 50;
}

/********************  MENU  *************************/
@supports not ((-webkit-backdrop-filter: none) or (backdrop-filter: none)) {
  .blur {
    background-color: rgba(var(--primary-bg), 0.8);
  }
}
.blur {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100vh;
  filter: blur(8px);
  backdrop-filter: blur(5px);
}

.wrapper-menu {
  width: 100%;
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  z-index: 15;
  // padding-top: 6rem;
  .menu {
    margin-top: 6rem;
    width: 75%;
    margin-left: auto;
    position: relative;
    .router-link-active {
      color: #fff;
    }
    .border-bottom {
      position: absolute;
      width: 0%;
      height: 2px;
      background: #fff;
      bottom: 2px;
      left: 0;
      transition: all 1s;
    }
    &__item {
      margin-bottom: 2.5rem;
      position: relative;
      display: flex;
      &::after {
        content: '';
      }
    }
    &__link {
      text-transform: uppercase;
      font-family: Moniqa;
      font-weight: bold;
      font-size: 3.125em;
      line-height: 1;
      color: rgba(var(--secondary-bg), 0.6);
      &:hover {
        .border-bottom {
          width: 100vw;
        }
      }
    }
  }
}

.choices {
  display: flex;
  align-items: flex-end;
  margin-left: 4rem;
  opacity: 1;
  &__link {
    font-family: Montserrat;
    font-style: italic;
    font-weight: 600;
    font-size: 1em;
    line-height: 1.8;

    letter-spacing: 0.005em;

    color: rgba(255, 255, 255, 0.6);
    margin-right: 4rem;
  }
}

/********************  End MENU  *************************/

/********************  Lang  *************************/

.lang {
  margin-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: space-around;

  &__choice {
    font-family: Montserrat;
    font-style: italic;
    font-weight: 600;
    font-size: 1em;
    line-height: 1.2;
    /* identical to box height */

    letter-spacing: 0.005em;

    color: rgba(var(--secondary-bg), 0.6);
    &.active {
      color: var(--primary-color);
    }
  }
}
/********************  End Lang  *************************/

.blur-bg-enter-active {
  transition: all 0.5s;
}

.blur-bg-leave-active {
  // transition-delay: 5s;
  transition: all 1s;
  transition-delay: 4s;
}

.blur-bg-enter-from,
.blur-bg-leave-to {
  filter: blur(0);
  backdrop-filter: blur(0);
}

@keyframes blur-bg {
  0% {
    filter: blur(0);
    backdrop-filter: blur(0);
  }

  100% {
    filter: blur(10px);
    backdrop-filter: blur(10px);
  }
}
</style>
