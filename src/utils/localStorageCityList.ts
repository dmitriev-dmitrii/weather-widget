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
        return this.get()
    }

};
