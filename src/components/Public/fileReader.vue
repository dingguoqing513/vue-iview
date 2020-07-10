<template>
    <section>
        <input type="file" ref="txtRef" @change="fileReade">
    </section>
</template>

<script>
export default {
    methods: {
        fileReade(e) {
            console.log(e.target.files)
            let reader = new FileReader()
            reader.readAsText(e.target.files[0], 'gb2312')
            reader.onload = () => {
                console.log(reader.result)
                this.$emit('showTxtDetail', reader.result)
            }
        }
    }
}
</script>

<style>
    input[type=file] {
        display: none;
    }
</style>
