<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useDisplay } from 'vuetify';

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


const isUserInteracting = ref(false);
let autoplayInterval: ReturnType<typeof setInterval> | null = null;

const nextSlide = () => {
  if (!isUserInteracting.value) {  // Csak akkor léptet, ha NEM húzod
    if (activeIndex.value < helyek.length - 1) {
      activeIndex.value++;
    } else {
      setTimeout(() => {
        activeIndex.value = 0;
      }, 2000);
    }
  }
};

const startAutoplay = () => {
  stopAutoplay(); // Biztos ami biztos, előbb leállítjuk, hogy ne induljon többször
  autoplayInterval = setInterval(nextSlide, 10000);
};

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval);
    autoplayInterval = null;
  }
};


onMounted(() => {
  startAutoplay(); // Induláskor elindítjuk az autoplay-t
});

onUnmounted(() => {
  stopAutoplay(); // Ha az oldal elhagyódik, leállítjuk az autoplay-t
});

const { mobile } = useDisplay();
const loading = ref(false)
const transitionState = ref(""); // Az animáció iránya

const window = ref(0)

// Állapotkezelés
const displayedPlaces = ref(18); // Kezdetben 18 hely jelenik meg
const totalPlaces = helyek.length; // Helyek összes száma

// Függvény a további helyek betöltéséhez
const loadMore = () => {
  displayedPlaces.value += 18; // Még 18 helyet betöltünk
}

// Az aktuális slide indexét tároljuk
const activeIndex = ref(0)
// Drag eseményekhez szükséges változók
const dragStart = ref(0)
const dragOffset = ref(0)
const dragging = ref(false)

const sliderStyle = computed(() => ({
  transform: `translateX(calc(-${activeIndex.value * 100}% + ${dragOffset.value}px))`,
  transition: dragging.value ? 'none' : 'transform 0.3s ease'
}))

// Mouse move event
function onMouseMove(e: MouseEvent) {
  if (!dragging.value) return
  dragOffset.value = e.clientX - dragStart.value
}

// A mouse down event
function onMouseDown(e: MouseEvent) {
  dragging.value = true;
  isUserInteracting.value = true; // Felhasználó húz, állítsuk le az autoplay-t
  stopAutoplay();
  dragStart.value = e.clientX;
}

// Mouse up event
function onMouseUp() {
  if (!dragging.value) return;
  dragging.value = false;
  isUserInteracting.value = false; // Vége a húzásnak, indítsuk újra az autoplay-t
  startAutoplay();
  const threshold = 50;
  if (dragOffset.value < -threshold && activeIndex.value < helyek.length - 1) {
    activeIndex.value++;
  } else if (dragOffset.value > threshold && activeIndex.value > 0) {
    activeIndex.value--;
  }
  dragOffset.value = 0;
}

// Mouse leave event
function onMouseLeave() {
  if (dragging.value) {
    onMouseUp();
  }
}

// Touchstart event (mobil)
function onTouchStart(e: TouchEvent) {
  const touchStart = e.touches[0].clientX;
  onMouseDown({ clientX: touchStart } as MouseEvent);  // Itt átalakítjuk MouseEventté
}

// Touchmove event (mobil)
function onTouchMove(e: TouchEvent) {
  const touchMove = e.touches[0].clientX;
  onMouseMove({ clientX: touchMove } as MouseEvent);  // Itt is átalakítjuk MouseEventté
}

// Touchend event (mobil)
function onTouchEnd(e: TouchEvent) {
  if (!dragging.value) return;
  dragging.value = false;
  isUserInteracting.value = false;
  startAutoplay();
  const threshold = 50;
  if (dragOffset.value < -threshold && activeIndex.value < helyek.length - 1) {
    activeIndex.value++;
  } else if (dragOffset.value > threshold && activeIndex.value > 0) {
    activeIndex.value--;
  }
  dragOffset.value = 0;
}


onMounted(() => {
  startAutoplay(); // Induláskor elindítjuk az autoplay-t
});

onUnmounted(() => {
  stopAutoplay(); // Ha az oldal elhagyódik, leállítjuk az autoplay-t
});

const goToSlide = (index:number) => {
  activeIndex.value = index;  // Az aktív index módosítása
};

</script>

<template>
  <v-container fluid style="padding: 0px;">
    <v-window v-model="window" :show-arrows="$vuetify.display.mdAndUp">
      <v-window-item v-for="hely in helyek" :key="hely.id">
        <div class="homepage-container" :style="{ backgroundImage: `url(${hely.url})` }">
          <div class="content" :class="transitionState">
            <div class="text-section">
              <h1>{{ hely.title }}</h1>
              <div class="description-container">
                <p>{{ hely.description }}</p>
              </div>
              <v-card-text style="text-align: left;">
                <v-rating v-if="!mobile"
                  readonly
                  :model-value="hely.rating"
                  :length="10"
                  size="large"
                  active-color="elevated text-surface"
                ></v-rating>
                <v-rating v-if="mobile"
                  readonly
                  :model-value="hely.rating"
                  :length="10"
                  :size="40"
                  active-color="elevated text-surface"
                ></v-rating>
              </v-card-text>
              <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface"> Adatlap </v-btn>
            </div>
            <div class="image-section">
              <img :src="hely.url" alt="Hely képe" />
            </div>
          </div>
        </div>
      </v-window-item>
    </v-window>

    <h1 style="padding: 0px  40px; max-width: 2300px; margin: auto;">Legújabb helyek</h1>
    <v-row style="max-width: 2300px; margin: auto; padding: 0px 40px 0px 40px">
      <v-col
        v-for="hely in helyek.slice(0, displayedPlaces)" 
        :key="hely.title" 
        cols="12" sm="6" md="4" lg="3" xl="2">
        <v-card
          rounded="xl"
          :disabled="loading"
          :loading="loading"
          class="mx-auto">

          <v-img
            height="250"
            :src="hely.url"
            cover
          ></v-img>

          <v-card-item>
            <v-card-title>{{ hely.title }}</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-rating
              readonly
              :model-value="hely.rating"
              :length="10"
              size=""
              active-color="primary"
            ></v-rating>
          </v-card-text>
          <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface" style="margin: 15px;"> Adatlap </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <!-- Továbbiak betöltése gomb -->
    <v-btn
      v-if="displayedPlaces < totalPlaces" 
      @click="loadMore"
      color="primary"
      class="text-surface"
      style="display: block; margin: auto; margin-bottom: 12px;"
    >
      Továbbiak betöltése
    </v-btn>
    <div class="slider-container"
     @mousedown="onMouseDown"
     @mousemove="onMouseMove"
     @mouseup="onMouseUp"
     @mouseleave="onMouseLeave"
     @touchstart="onTouchStart"   
     @touchmove="onTouchMove"    
     @touchend="onTouchEnd">
      <div class="slider-track" :style="sliderStyle">
        <div v-for="hely in helyek" :key="hely.id" class="slide">
          <div class="homepage-container" :style="{ backgroundImage: `url(${hely.url})` }">
            <div class="content" :class="transitionState">
              <div class="text-section">
                <h1>{{ hely.title }}</h1>
                <div class="description-container">
                  <p>{{ hely.description }}</p>
                </div>
                <v-card-text style="text-align: left;">
                  <v-rating v-if="!mobile"
                    readonly
                    :model-value="hely.rating"
                    :length="10"
                    size="large"
                    active-color="elevated text-surface"
                  ></v-rating>
                  <v-rating v-if="mobile"
                    readonly
                    :model-value="hely.rating"
                    :length="10"
                    :size="25"
                    active-color="elevated text-surface"
                  ></v-rating>
                </v-card-text>
                <v-btn :to="`/place/${hely.id}`" color="primary" class="text-surface"> Adatlap </v-btn>
              </div>
              <div class="image-section">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bars-container">
        <div
          v-for="(hely, index) in helyek"
          :key="hely.id"
          class="bar"
          :class="{ active: activeIndex === index }"
          @click="goToSlide(index)"
        ></div>
      </div>
    </div>
  </v-container>
  <br>
  <br>
</template>

<style scoped>

.text-section h1{
  font-size: 40px;
  padding-bottom: 40px;
  text-align: left;
}

.text-section p{
  font-size: 20px;
  text-align: left;
}

.content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 2300px;
  padding: 40px;
  border-radius: 10px;
  flex-wrap: wrap; /* Engedélyezi a sorok törését */
  z-index: 2;
  box-sizing: border-box;
  margin: 0 60px;
  min-height: fit-content;
}

.homepage-container {
  width: 100%;
  min-height: 100%; /* A tartalom magasságához igazodik */
  height: 94vh;
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding-bottom: 20px; /* Alsó padding a biztonság kedvéért */
  z-index: 0;
}

.homepage-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
  pointer-events: none; /* Így nem akadályozza a kattintásokat */
}

/* Szöveges rész */
.text-section {
  flex: 1;
  color: white;
  text-align: left;
  margin: 0 20px;
}

.image-section {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.image-section img {
  width: 90%;
  border-radius: 10px;
}

@media (max-width: 1300px) {
  .content {
    flex-direction: column; /* Oszlopos elrendezés */
    align-items: center; /* Középre igazítás */
    min-height: fit-content; /* Dinamikus magasság a tartalom alapján */
  }

  .image-section {
    order: -1; /* A kép kerül előre */
    justify-content: center;
    width: 100%; /* Kép teljes szélességet kitölt */
  }

  .image-section img {
    margin-bottom: 20px; /* Hézag a kép alján */
    width: 100%; /* Kép méretének csökkentése kisebb képernyőn */
  }

  .text-section {
    margin: 0; /* Margók eltávolítása */
    width: 100%; /* Szöveg a teljes szélességhez igazodik */
  }

  .homepage-container
  {
    height: 100%;
  }
}

.content .v-card-text
{
  padding: 0px !important;
}

div .v-card-text
{
  padding: 0px !important;
  padding-left: 16px !important;
}

.description-container {
  max-height: 250px;
  overflow-y: auto;
  padding: 10px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  color: white;
}

/* Slider konténer */
.slider-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  user-select: none;
  max-width: 2300px;
  margin: auto;

}

/* A slider-track flexbox elrendezéssel egymás mellé helyezi a slide-okat */
.slider-track {
  display: flex;
  width: 100%;
}

/* Minden slide 100% szélességet kap */
.slide {
  flex: 0 0 100%;
  padding: 0px 40px;
}
@media (max-width: 870px) {
  /* Slide szélesség automatikusan 100%-ra állítva */
  .slide {
    flex: 0 0 100%;  /* Minden slide 100%-os szélességet kap */
    max-width: 100%; /* Biztosítjuk, hogy a szélesség nem haladja meg a szülő szélességét */
  }

  /* A slide tartalma is igazodik a slide szélességéhez */
  .slide .content {
    flex-direction: column; /* Oszlopos elrendezés, ha kisebb a képernyő */
    align-items: center; /* Középre igazítjuk a tartalmat */
    width: 100%; /* A tartalom szélessége 100% */
    padding: 20px; /* Hézag a tartalom körül */
  }

  .slide .text-section {
    width: 100%; /* A szöveges rész szélessége 100% */
    padding: 10px; /* Hézag hozzáadása */
  }

  .slide .image-section {
    width: 100%; /* Kép szélessége 100% */
    display: flex;
    justify-content: center; /* Kép középre igazítása */
  }

  .slide .image-section img {
    width: 100%; /* Kép automatikusan kitölti a szülő szélességét */
    max-width: 300px; /* Kép ne legyen túl nagy */
    margin-bottom: 20px; /* Hézag a kép alján */
  }

  .slide .description-container {
    max-height: 200px; /* A leírás dobozának maximális magassága */
    overflow-y: auto; /* Ha túl hosszú, görgethető lesz */
    padding: 10px;
  }
}

/* Fogó kurzor, amikor lenyomod az egeret */
.slider-container:active {
  cursor: grab;  /* Amikor megfogod */
}

.bars-container {
  position: absolute;
  bottom: 20px; /* A slider alján */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  justify-content: center;
}

/* Csíkok (bars) alap stílusai */
.bar {
  width: 30px; /* A csíkok szélessége */
  height: 5px; /* A csíkok magassága */
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Aktív csík kiemelése */
.bar.active {
  background-color: white;
}


</style>