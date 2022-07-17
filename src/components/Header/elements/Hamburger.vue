<template>
    <input type="checkbox" id="hamburger" :checked="isOpen"
        @click="$emit('update:isOpen', ($event.target as HTMLInputElement).checked)" />
    <label class="burger" for="hamburger">
        <button>
            <div class="container top">
                <div class="line top"></div>
            </div>
            <div class="container bottom">
                <div class="line bottom"></div>
            </div>
        </button>
    </label>
</template>

<script setup lang="ts">
defineProps<{
    isOpen: boolean
}>()
defineEmits<{
    (e: 'update:isOpen', value: boolean): void
}>()
</script>

<style scoped lang="scss">
.container.top {
    transform: translateY(-3px) scaleX(.88235);
}

.container.bottom {
    transform: translateY(3px) scaleX(.88235);
}

input:checked+label .container .line.bottom {
    transform: rotateZ(45deg);
}

input:checked+label .container .line.top {
    transform: rotateZ(-45deg);
}

input:checked+label .container.bottom {
    transform: none;
}

input:checked+label .container.top {
    transform: none;
}

input:checked+label .line.bottom {
    transform: none;
    transition-delay: 0.1s;
}

input:checked+label .line.top {
    transform: none;
    transition-delay: 0.1s;
}

.container {
    transition: transform 0.2s ease-in-out 0.1s;
}

input:checked+label .container {
    transition-delay: 0s;
}

.line {
    transition: transform 0.2s ease-in-out;
}

/* The boilerplate stuff */
button {
    all: unset;
    cursor: pointer;
    display: block;
}

button * {
    pointer-events: none;
}

.burger {
    height: 31px;
    width: 31px;
    display: block;
    position: relative;
}

.container {
    position: absolute;
    left: 7px;
    top: 15px;
}

.line {
    height: 1px;
    border-radius: 3px;
    background: gray;
    width: 17px;
}

input {
    display: none;
}
</style>