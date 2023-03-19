 <template>
    <div class="mini-nav">
        <div class="center">
            <div class="categories" v-for="category in categoriesA"
            :key = "category.id"
            @click="handleClick">
            {{ category }} 
        </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, onMounted, defineEmits} from "vue";
import { ref } from "vue";

//Register or defineProps
const props = defineProps({
    data: Array
})

//Register emit
const emit = defineEmits(['fetchCategory'])

//set State for Categories
const categoriesA = ref([])


onMounted(() => {
    //Filter the array to get unique category
    const categories = props.data.map(each => each.category);
    const uniqueCategories = [...new Set(categories)];
    uniqueCategories.unshift("all");
    categoriesA.value = uniqueCategories;
})

//function to handleclick
const handleClick = (e) => {
    emit("fetchCategory", e.target.innerText)
}

</script>
<style>
.mini-nav{
    height: 40px;
    width: 100%;
    background-color: rgb(78, 75, 75); 
    gap: 3px;
    display: flex;
    align-items: center;
}

.center{
    height: inherit;
    display: flex;
    align-items: center; 
    justify-content:flex-start;
    gap: 5px;
}

.categories{
    color: white;
    width:auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    height:35px;
    padding:6px;
    text-transform: capitalize;
}

.categories:hover{
    border: 1px solid white;
}

</style> 