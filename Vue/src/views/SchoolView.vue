<script lang="ts" setup>
import { ref } from 'vue';


const helyek = [
    {
      id:1,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:1,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:1,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:1,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:1,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:1,
      url:"https://ceg-kozgazdasagi.cms.intezmeny.edir.hu/uploads/background_eb15905baa.jpg",
      title:"Hely1",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:2,
      url:"https://villany.hu/wp-content/gallery/vinatus-pince-es-fogado/vinatus-fogado-kivulrol.jpg",
      title:"Hely2",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:3,
      url:"https://kakas.hu/wp-content/uploads/2015/08/kakas_etterem.jpg",
      title:"Hely3",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:4,
      url:"https://upload.wikimedia.org/wikipedia/commons/6/63/Dr_Nagy_L%C3%A1szl%C3%B3_Gy%C3%B3gyped_Int_K%C5%91szeg.JPG",
      title:"Hely4",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:5,
      url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMQXakdFgzJOpdxmf4ClbgANdmzb9pNvTXww&s",
      title:"Hely5",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    },
    {
      id:6,
      url:"https://mosthir.hu/wp-content/uploads/2023/08/spar-magyarorszag-bolt-860x459.jpg",
      title:"Hely7",
      rating:4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id mauris tempor, vehicula nunc ut, vehicula metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis rhoncus arcu a maximus consequat. Vivamus convallis neque sit amet volutpat lobortis. Etiam sodales aliquet elit. Suspendisse mattis egestas nunc, in mollis felis porta vel. Mauris laoreet, ex nec feugiat blandit, ligula ligula lobortis diam, hendrerit lacinia nulla tortor nec diam."
    }
  ]
  const loading = ref(false)
const displayedPlaces = ref(18);
const totalPlaces = helyek.length;
const loadMore = () => {
  displayedPlaces.value += 18;
}

const tagItems = ["Gimnázium", "Egyetem", "Általános Iskola", "Technikum", "Gyakorló Gimnázium", "+Kollégium", "Gyakorló Általános Iskola", "Kísérleti Gimnázium", "Kísérleti Általános Iskola"];

// Új reaktív változók a szortírozáshoz
const sortDateAsc = ref(true);
const sortViewsAsc = ref(true);
const sortAlphaAsc = ref(true);

// Függvények a gombok állapotának váltásához
const toggleSortDate = () => {
  sortDateAsc.value = !sortDateAsc.value;
};

const toggleSortViews = () => {
  sortViewsAsc.value = !sortViewsAsc.value;
};

const toggleSortAlpha = () => {
  sortAlphaAsc.value = !sortAlphaAsc.value;
};
</script>
<template>
<div class="layout-wrapper">
  <v-container class="custom-drawer">
    <v-card class="drawer-content">
      <v-card-title class="text-h6">Szűrj tagek alapján:</v-card-title>
      <v-divider></v-divider>
        <v-checkbox
            v-for="tag in tagItems"
            :key="tag"
            :label="tag"
            :value="tag"
            hide-details
            variant="elevated" color="primary"
        />
    </v-card>
  </v-container>

  <!-- Eredeti container -->
  <v-container>
    <v-card max-width="1700px" style="margin-left: auto; margin-right: auto;">
      <v-card-title class="text-h4">Magyarország iskolái (2025)</v-card-title>
      <v-card-text class="text-h6">Itt külön kategóriák szerint szűrhet:</v-card-text>
      <v-card-actions>
          <v-btn @click="toggleSortDate" color="primary" class="text-surface">
            Dátum 
            <v-icon>{{ sortDateAsc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-btn @click="toggleSortViews" color="primary" class="text-surface">
            Megtekintések 
            <v-icon>{{ sortViewsAsc ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
          </v-btn>
          <v-btn @click="toggleSortAlpha" color="primary" class="text-surface">
            {{ sortAlphaAsc ? 'A-Z' : 'Z-A' }}
          </v-btn>
          <v-btn color="primary" class="text-surface">
            Az embereknek legjobban tetszett
          </v-btn>
        </v-card-actions>
    </v-card>
    <v-row style="max-width: 1700px; margin: auto;">
      <v-col
        v-for="hely in helyek.slice(0, displayedPlaces)" 
        :key="hely.title" 
        cols="12" sm="6" md="4" lg="3" xl="2"
      >
        <v-card rounded="xl" :disabled="loading" :loading="loading" class="md-10">
          <v-img height="250" :src="hely.url" cover></v-img>
          <v-card-item>
            <v-card-title>{{ hely.title }}</v-card-title>
          </v-card-item>
          <v-card-text>
            <v-rating readonly :model-value="hely.rating" :length="10" size="" active-color="primary"></v-rating>
          </v-card-text>
          <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface" style="margin: 15px;"> Adatlap </v-btn>
        </v-card>
      </v-col>
    </v-row>
    <v-btn
      v-if="displayedPlaces < totalPlaces" 
      @click="loadMore"
      color="primary"
      class="text-surface"
      style="display: block; margin: auto; margin-bottom: 12px;"
    >
      Továbbiak betöltése
    </v-btn>
    <br>
  </v-container>
</div>

</template>

<style scoped>

.custom-drawer {
  flex: 0;
}

.drawer-content {
  background-color: rgb(253,216,53);
  padding: 20px;
  height: 100%;
}

.layout-wrapper {
  display: flex;
  padding: 20px;
}

</style>