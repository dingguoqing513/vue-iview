<template>
    <div class="block-container" :style='{ flex:   `${span} 1 auto`, width: `${width}%` }'>
        <Icon type="md-bulb" size="20" class="block-icon" color="rgba(0, 213, 255, 0.87)"/>
        <span class="block-name">{{ name }}</span>
        <slot/>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        span: {
            type: String,
            default: '0'
        },
        width: {
            type: String,
            default: ''
        }
    }
}
</script>

<style>
    .block-container {
        min-width: 280px;
        height: 260px;
        border: 1px solid #fff;
        box-shadow: 0 0 10px #d8dde2;
        border-radius: 1px;
        padding: 20px 15px;
        transition: all .3s;
    }

    .block-container:not(:first-of-type) {
        margin-left: 20px;
        margin-bottom: 20px;
    }

    .block-container:hover {
        box-shadow: 0 0 20px #bdcbf0;
        transition: all .3s;
    }

    .block-icon {
        vertical-align: top;
    }

    .block-name {
        font-weight: 500;
        vertical-align: bottom;
    }
</style>


