<template>
<div>
<SideBar />
<b-container fluid>
<b-row>
<b-col cols="12">
  <router-view></router-view>
</b-col>
</b-row>
</b-container>
</div>
</template>

<style scoped>
#noteslist{
padding-top:2px;
left: 0px;
}
</style>

<script>
import SideBar from './SideBar/SideBar';
export default{
    components: {
      SideBar,
    }
}
</script>