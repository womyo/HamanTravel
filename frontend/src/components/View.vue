<template>
	<div>
		<div class="addWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>제목</th>
						<td>{{title}}</td>
					</tr>
					<tr>
						<th>내용</th>
						<td class="txt_cont" v-html="contents"></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
            <button @click="fnList" class="btn btn-secondary">목록</button>
            <button @click="fnMod" class="btn btn-info">수정</button>
            <button @click="fnDeleteProc" class="btn btn-danger">삭제</button>
		</div>	
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			body:this.$route.query,
            title: '',
            contents: '',
            createdAt: '',
            updatedAt: ''
		}
	}
	,mounted() {
		this.fnGetView();
	}
	,methods:{
		fnGetView() {
			axios.get('/api/board/'+this.body.id)
			.then((res)=>{
				this.title = res.data.title;
				this.contents = res.data.contents.replace(/(\n)/g,'<br/>');
                this.createdAt = res.data.createdAt;
                this.updatedAt = res.data.updatedAt;
			})
			.catch((err)=>{
				console.log(err);
			})
		},
		fnList(){
			delete this.body.id;
			this.$router.push({path:'./list',query:this.body});
		},
        fnMod() {
			this.$router.push({path:'./write',query:this.body});
		},
        fnDeleteProc() {
			if(confirm("삭제하시겠습니까?")) {
				axios.delete('/api/board', {params:this.body})
				.then((res)=>{
					if(res.data.result) {
						alert("삭제되었습니다.");
						this.fnList();
					} else {
						alert("실행중 실패했습니다.\n다시 이용해 주세요.");
					}
				})
				.catch((err)=>{
					console.log(err);
				})
			}
		}
	}
}
</script>

<style>
	.tbAdd{
        border-top:1px solid #888;
    }
	.tbAdd th, .tbAdd td{
        border-bottom:1px solid #eee; 
        padding:5px 0; 
    }
	.tbAdd td{
        padding:10px 10px; 
        box-sizing:border-box; 
        text-align:left;
    }
	.tbAdd td.txt_cont{
        height:300px; 
        vertical-align:top;
    }
	.btnWrap{
        text-align:center; 
        margin:20px 0 0 0;
    }
	.btnWrap a{
        margin:0 10px;
    }
</style>