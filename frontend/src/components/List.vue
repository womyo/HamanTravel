<template>
	<div>
		<h2>함 말해봐!</h2>

		<div class="searchWrap">
			<b-form-select size="sm" style="width: 20%; height: 36px" class="selectBox" v-model="code" ref="code" :options="options" @change="getListByPage"></b-form-select>
			<input type="text" v-model="title" @keyup.enter="getListByPage" /><button @click="getListByPage" class="btn btn-secondary">검색</button>
		</div>
        <div class="wrap">
            <div class="listWrap">
                <table class="tbList">
                    <!-- <colgroup>
                        <col width="6%" />
                        <col width="*" />
                        <col width="10%" />
                        <col width="15%" />
                    </colgroup> -->
                    <tr>
                        <!-- <th>no</th> -->
                        <th>제목</th>
                        <th>아이디</th>
                        <th>날짜</th>
                    </tr>
                    <tr v-for="(row, idx) in list" :key="idx">
                        <td>{{(idx+1) + (currentPage-1)*10}}</td>
                        <!-- <td>{{(rows/2-10*(currentPage-1))-idx}}</td> -->
                        <td class="txt_left"><a href="javascript:;">{{row.title}}</a></td>
                        <td>{{row.userId}}</td>
                    </tr>
                    <tr v-if="list.length == 0">
                        <td colspan="4">데이터가 없습니다.</td>
                    </tr>
                </table>
            </div>

            <b-pagination v-model="currentPage" :total-rows="rows" align="center" @page-click="showList" size="sm"></b-pagination>

            <div class="btnRightWrap">
                <button @click="fnAdd" class="btn btn-primary">등록</button>
            </div>
        </div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() { 
		return{
			currentPage: 1,
			rows: null,
			board_code:'',
			list:'',
			title:this.$route.query.title,
			code: null,
			url: '',
			options: [
			{ value: "null", text: "말머리", disabled: true},
			{ value: "질문", text: "질문" },
			{ value: "공지", text: "공지" },
			{ value: "잡담", text: "잡담" },
			]
		}
	}
	,mounted() { 
		this.getAllRows();
		this.getListByPage(this.currentPage);
	},
	methods:{
		showList(button, page){
			this.currentPage = page;
			this.getListByPage(page);
		},
		getListByPage(page) {
                this.loading = true;
				
				this.$nextTick(()=>{
					let c = this.code ? `code=${this.code}&` : null;
					console.log(c)
					let t = this.title ? `title=${this.title}` : null;
					this.url = `/api/board?` + c + t + `&page=${page}`;
					// if (this.code) {
					// 	this.url = `/api/board?${null}&page=${page}`;
					// }
					// else {
					// 	this.url = `/api/board?page=${page}`;
					// }
					axios.get(this.url)
						.then(res => {
							this.list = res.data;
						})
						.catch(error => {
							console.log(error);
						})
						.finally(() => this.loading = false);
				})
		},
		async getAllRows() { 
			this.body = { 
				board_code:this.board_code
				,keyword:this.keyword
				,page:this.page
			}
            const url = `/api/board`;
			await axios.get(url)
			.then((res)=>{
				this.rows = res.data.length*2;
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnAdd() {
			this.$router.push("./write");
		}
	}
}
</script>

<style>
    .wrap {
        background-color: rgba(255,255,255,0.5);
    }
	.searchWrap{display: flex; justify-content: center; border:1px solid #888; border-radius:5px; text-align:center; padding:10px 0; margin-bottom:40px;}
	.searchWrap input{width:60%; height:36px; border-radius:3px; padding:0 10px; border:1px solid #888;}
	.searchWrap .btnSearch{display:inline-block; margin-left:10px;}
	/* .tbList th{border-top:1px solid #888;} */
	.tbList th, .tbList td{border-bottom:1px solid #eee; padding:5px 0;}
	.tbList td.txt_left{text-align:left;}
	.btnRightWrap{text-align:right; margin:10px 0 0 0;}
</style>