import CityItem from "@/types/CityItem";

const storageKey = 'CityList';


 export default {

    get: function ( ) :[] {

        let data :any = localStorage.getItem(storageKey) ;
        if (!data){
         return this.save([])
        }
        return JSON.parse(data)
    },

    save: function ( data = [] ) :[] {

        localStorage.setItem( storageKey, JSON.stringify(data) );

        if ( data.length > 1) {
            data.sort( ( a:CityItem , b:CityItem  )=>{
                return a.order - b.order
            }).map((item :CityItem,index:number)=>{
                item.order = index
                return item
            })
        }

        return this.get()
    }

};
