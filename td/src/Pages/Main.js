import React from 'react'
import { Link } from 'react-router-dom';



function Main() {


    return (
        <>
            <main className="main">


                <section id="hero" className="hero section">
                    <div className="hero-bg">
                        <img src="hero-bg-light.webp" alt="carosole" />
                    </div>
                    <div className="container text-center ">
                        <div className='row '>
                            <div className='col-6 column1'>
                                <div className="d-flex flex-column content1 justify-content-center align-items-center" >
                                    <h1 data-aos="fade-up">Welcome to<span>TextileDiwanji</span></h1>
                                    <p data-aos="fade-up" data-aos-delay="100">One stop solution for weaving operations<br /></p>
                                    <div className="d-flex" data-aos="fade-up" data-aos-delay="200">
                                        <a href="#about" className="btn-get-started">Get Started</a>
                                        <a href="https://www.youtube.com/watch?v=LXb3EKWsInQ" className="glightbox btn-watch-video d-flex align-items-center"><i className="bi bi-play-circle"></i><span>Watch Video</span></a>
                                    </div>

                                </div>
                            </div>
                            <div className='col-6 column2'>
                                <img src="omee.png" className="img-fluid hero-img" alt="" data-aos="zoom-out" data-aos-delay="300" />
                            </div>
                        </div>

                    </div>

                </section>

                <section id="featured-services" className="featured-services section">

                    <div className="container">

                        <div className="row gy-4">

                            <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                <div className="service-item d-flex">
                                    <div className="icon flex-shrink-0">
                                        <i className="bi bi-briefcase"></i>
                                        {/* <img src="loom.png" className="img-fluid hero-img"  /> */}

                                    </div>
                                    <div>
                                        <h4 className="title">Integrated Management Solutions</h4>
                                        <p className="description">Explore TextileDiwanji for comprehensive services including beam inward, packing slip management, reconciliation, and billing.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="200">
                                <div className="service-item d-flex">
                                    <div className="icon flex-shrink-0"><i className="bi bi-card-checklist"></i></div>
                                    <div>
                                        <h4 className="title">Enhance Textile Production</h4>
                                        <p className="description">Monitor production seamlessly through our interactive dashboard, Our comprehensive dashboard provides actionable production insights alongside</p>
                                    </div>
                                </div>
                            </div>                    <div className="col-xl-4 col-lg-6" data-aos="fade-up" data-aos-delay="300">
                                <div className="service-item d-flex">
                                    <div className="icon flex-shrink-0"><i className="bi bi-bar-chart"></i></div>
                                    <div>
                                        <h4 className="title">Efficiency Redefined</h4>
                                        <p className="description">a versatile count conversion calculator and up-to-date yarn market prices, ensuring efficiency and accuracy in every process.</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                </section>

                <section id="about" className="about section">

                    <div className="container">

                        <div className="row gy-4">

                            <div className="col-lg-6 content" data-aos="fade-up" data-aos-delay="100">
                                <p className="who-we-are">Who We Are</p>
                                <h3>Unleashing Potential with Creative Strategy</h3>
                                <p className="fst-italic">
                                    We have the best team in web development and textile industry to give the end to end solution for textile industry

                                </p>
                                <ul>
                                    <li><i className="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
                                    <li><i className="bi bi-check-circle"></i> <span>Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
                                    <li><i className="bi bi-check-circle"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate trideta storacalaperda mastiro dolore eu fugiat nulla pariatur.</span></li>
                                </ul>
                                <a href="#" className="read-more"><span>Read More</span><i className="bi bi-arrow-right"></i></a>
                            </div>

                            <div className="col-lg-6 about-images" data-aos="fade-up" data-aos-delay="200">
                                <div className="row gy-4">
                                    <div className="col-lg-6">
                                        <img src="about-company-1.jpg" className="img-fluid" alt="" />
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="row gy-4">
                                            <div className="col-lg-12">
                                                <img src="about-company-2.jpg" className="img-fluid" alt="" />
                                            </div>
                                            <div className="col-lg-12">
                                                <img src="about-company-3.jpg" className="img-fluid" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>
                </section>            <section id="clients" className="clients section">

                    <div className="container" data-aos="fade-up">

                        <div className="row gy-4">

                            <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="clients/client-1.png" className="img-fluid" alt="" />
                            </div>                   <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="clients/client-2.png" className="img-fluid" alt="" />
                            </div>                   <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="clients/client-3.png" className="img-fluid" alt="" />
                            </div>                   <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="clients/client-4.png" className="img-fluid" alt="" />
                            </div>                   <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="clients/client-5.png" className="img-fluid" alt="" />
                            </div>                   <div className="col-xl-2 col-md-3 col-6 client-logo">
                                <img src="clients/client-6.png" className="img-fluid" alt="" />
                            </div>               </div>

                    </div>

                </section>               <section id="features" className="features section">

                    <div className="container section-title" data-aos="fade-up">
                        <h2>Features</h2>
                        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
                    </div>             <div className="container">
                        <div className="row justify-content-between">

                            <div className="col-lg-5 d-flex align-items-center">

                                <ul className="nav nav-tabs" data-aos="fade-up" data-aos-delay="100">
                                    <li className="nav-item">
                                        <a className="nav-link active show" data-bs-toggle="tab" data-bs-target="#features-tab-1">
                                            <i className="bi bi-binoculars"></i>
                                            <div>
                                                <h4 className="d-none d-lg-block">Beam Inward</h4>
                                                <p>
                                                    The app allows you to add beam inward details with reed, pick, sizing name, sizing meter warp count, weft count
                                                    and this app gives you unique identy beaminward number
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-2">
                                            <i className="bi bi-box-seam"></i>
                                            <div>
                                                <h4 className="d-none d-lg-block">Reconsilation</h4>
                                                <p>
                                                    App gives you Reconsilation of every beam inward quality on one click.
                                                    there are four sections beaminward, yarn inward, packing slip report, billing and reconsilation section
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-bs-toggle="tab" data-bs-target="#features-tab-3">
                                            <i className="bi bi-brightness-high"></i>
                                            <div>
                                                <h4 className="d-none d-lg-block">Packing slip</h4>
                                                <p>
                                                    This allows you to create packing slip of inwarded beam with unique packing slip number.
                                                    Packing slip can be send throught the mail on one click.
                                                </p>
                                            </div>
                                        </a>
                                    </li>
                                </ul>               </div>

                            <div className="col-lg-6">

                                <div className="tab-content" data-aos="fade-up" data-aos-delay="200">

                                    <div className="tab-pane fade active show" id="features-tab-1">
                                        <img src="tabs-1.jpg" alt="" className="img-fluid" />
                                    </div>                                <div className="tab-pane fade" id="features-tab-2">
                                        <img src="tabs-2.jpg" alt="" className="img-fluid" />
                                    </div>                                <div className="tab-pane fade" id="features-tab-3">
                                        <img src="tabs-3.jpg" alt="" className="img-fluid" />
                                    </div>                           </div>

                            </div>

                        </div>

                    </div>

                </section>                        <section id="features-details" className="features-details section">

                    <div className="container">

                        <div className="row gy-4 justify-content-between features-item">

                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                <img src="yarn.jpeg" className="img-fluid" alt="" />
                            </div>

                            <div className="col-lg-5 d-flex align-items-center" data-aos="fade-up" data-aos-delay="200">
                                <div className="content">
                                    <h3>Yarn count conversion</h3>
                                    <p>
                                        Textile yarn are of different types. to convert any yarn count to Englsih cotton count (Ne),
                                        Textile count converter calculator converts Denier, Tex, Decitex, Linen and wool to English cotton count.
                                    </p>
                                    {/* <a href="#" className="btn more-btn">Learn More</a> */}
                                    <Link to="https://www.textilediwanji.com/countconverter" className='btn more-btn'>Learn More</Link>
                                </div>
                            </div>

                        </div>
                        {/* <div className="row gy-4 justify-content-between features-item">

                            <div className="col-lg-5 d-flex align-items-center order-2 order-lg-1" data-aos="fade-up" data-aos-delay="100">

                                <div className="content">
                                    <h3>Neque ipsum omnis sapiente quod quia dicta</h3>
                                    <p>
                                        Quidem qui dolore incidunt aut. In assumenda harum id iusto lorena plasico mares
                                    </p>
                                    <ul>
                                        <li><i className="bi bi-easel flex-shrink-0"></i> Et corporis ea eveniet ducimus.</li>
                                        <li><i className="bi bi-patch-check flex-shrink-0"></i> Exercitationem dolorem sapiente.</li>
                                        <li><i className="bi bi-brightness-high flex-shrink-0"></i> Veniam quia modi magnam.</li>
                                    </ul>
                                    <p></p>
                                    <a href="#" className="btn more-btn">Learn More</a>
                                </div>

                            </div>

                            <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-up" data-aos-delay="200">
                                <img src="yarn.jpeg" className="img-fluid" alt="" />
                            </div>

                        </div> */}

                    </div>

                </section>
                <section id="services" className="services section">

                    <div className="container section-title" data-aos="fade-up">
                        <h2>Services</h2>
                        <p>Our textile services are one stop solution fo weavers to live up to date</p>
                    </div>             <div className="container">

                        <div className="row g-5">

                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
                                <div className="service-item item-cyan position-relative">
                                  
                                     <img src="loom.png" className="img-fluid hero-img bi bi-activity icon"    />
                                    <div>
                                        <h3>Weaving Operations</h3>
                                        <p>Provident nihil minus qui consequatur non omnis maiores. Eos accusantium minus dolores iure perferendis tempore et consequatur.</p>
                                        <a href="service-details.html" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>                    
                            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="200">
                                <div className="service-item item-orange position-relative">
                                    {/* <i className="bi bi-broadcast icon"></i> */}
                                    <img src="fabrictrading.png" className="img-fluid hero-img bi bi-activity icon bi bi-broadcast icon"    />
                                    <div>
                                        <h3>Fabric Trading</h3>
                                        <p>Ut autem aut autem non a. Sint sint sit facilis nam iusto sint. Libero corrupti neque eum hic non ut nesciunt dolorem.</p>
                                        <a href="service-details.html" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>                   
                             <div className="col-lg-6" data-aos="fade-up" data-aos-delay="300">
                                <div className="service-item item-teal position-relative">
                                    {/* <i className="bi bi-easel icon"></i> */}
                                    <img src="yarnicon.png" className="bi bi-easel icon"    />

                                    <div>
                                        <h3>Yarn market</h3>
                                        <p>Ut excepturi voluptatem nisi sed. Quidem fuga consequatur. Minus ea aut. Vel qui id voluptas adipisci eos earum corrupti.</p>
                                        <a href="service-details.html" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="400">
                                <div className="service-item item-red position-relative">
                                    {/* <i className="bi bi-bounding-box-circles icon"></i> */}
                                    <img src="yarnconversion.jpg" className="bi bi-easel icon"    />
                                    <div>
                                        <h3>Yarn count conversion</h3>
                                        <p>Non et temporibus minus omnis sed dolor esse consequatur. Cupiditate sed error ea fuga sit provident adipisci neque.</p>
                                        <a href="service-details.html" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="500">
                                <div className="service-item item-indigo position-relative">
                                    {/* <i className="bi bi-calendar4-week icon"></i> */}
                                    <img src="contract.jpg" className="bi bi-easel icon"    />
                                    <div>
                                        <h3>Fabric Program lead</h3>
                                        <p>Cumque et suscipit saepe. Est maiores autem enim facilis ut aut ipsam corporis aut. Sed animi at autem alias eius labore.</p>
                                        <a href="service-details.html" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>                    <div className="col-lg-6" data-aos="fade-up" data-aos-delay="600">
                                <div className="service-item item-pink position-relative">
                                    {/* <i className="bi bi-chat-square-text icon"></i> */}
                                    <img src="sizingcontract.png" className="bi bi-easel icon"    />
                                    <div>
                                        <h3>Sizing program lead</h3>
                                        <p>Hic molestias ea quibusdam eos. Fugiat enim doloremque aut neque non et debitis iure. Corrupti recusandae ducimus enim.</p>
                                        <a href="service-details.html" className="read-more stretched-link">Learn More <i className="bi bi-arrow-right"></i></a>
                                    </div>
                                </div>
                            </div>                </div>

                    </div>

                </section>




            </main>


        </>
    )
}

export default Main
