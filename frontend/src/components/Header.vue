<template>
    <div>
        <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
            <div class="container container-fluid">
                <a class="navbar-brand" href="/">App</a>
                <b-col sm="3" class="ms-auto">
                    <b-form-input size="sm" class="mr-sm-2" placeholder="Keyword"></b-form-input>
                </b-col>
                <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                <div>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navContent" aria-controls="navContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div class="collapse navbar-collapse" id="navContent">
                    <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="/haman">Map</a>
                        </li>
                        <li class="nav-item float-end ms-md-auto">
                            <a class="nav-link active">LogIn</a>                     
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
  name: "Header",
};
</script>