<template>
    <div>
        <slot />
        <footer-bar />
    </div>
</template>

<script>

import FooterBar from '@/components/FooterBar';

export default {
    components: {
        FooterBar
    }
}
</script>
