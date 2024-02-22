import React from 'react'

export default function Carousel() {
  return (
<>
<div className="row justify-content-evenly mt-3">
    <div className='col-md-6 offset-md-3'>
        <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active" data-bs-interval="3000">
                <img src="https://img.freepik.com/free-photo/autumn-leaf-falling-revealing-intricate-leaf-vein-generated-by-ai_188544-9869.jpg?w=1380&t=st=1707672426~exp=1707673026~hmac=616302279412abd153b552007f86a15ebad554763c20e361f70d99e2e5f1666c" class="d-block w-50 rounded-3"/>
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                <img src="https://img.freepik.com/free-photo/majestic-mountain-peak-tranquil-winter-landscape-generated-by-ai_188544-15662.jpg?size=626&ext=jpg&ga=GA1.1.87170709.1707609600&semt=ais" class="d-block w-50 rounded-3" />
                </div>
                <div class="carousel-item" data-bs-interval="3000">
                <img src="https://img.freepik.com/free-photo/nature-beauty-captured-tranquil-scene-mountain-peak-reflection-generative-ai_188544-12745.jpg?w=1380&t=st=1707672460~exp=1707673060~hmac=1c668351639c8a11122b02befc904fb5c66e6743447b7972d3fd973a29440471" class="d-block w-50 rounded-3"/>
                </div>
            </div>
        </div>
    </div>

    <div className='col-6'>


    </div>
</div>

</>




  )
}
