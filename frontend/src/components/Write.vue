<template>
	<div>
		<div class="AddWrap">
			<form>
				<table class="tbAdd">
					<colgroup>
						<col width="15%" />
						<col width="*" />
					</colgroup>
					<tr>
						<th>
							<b-form-select size="sm" v-model="code" ref="code" :options="options">
							</b-form-select>
						</th>
						<td><input type="text" v-model="title" placeholder="제목을 입력해주세요" ref="title" /></td>
					</tr>
					<tr>
						<th></th>
						<td><textarea v-model="contents" ref="contents"></textarea></td>
					</tr>
				</table>
			</form>
		</div>

		<div class="btnWrap">
            <button @click="fnList" class="btn btn-secondary">목록</button>
            <button @click="fnAddProc" class="btn btn-success">등록</button>
		</div>	
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() { 
		return{
			code:null,
			title:'',
			contents:'',
			userId:'admin',
			form:'',
			options: [
			{ value: "null", text: "말머리", disabled: true},
			{ value: "질문", text: "질문" },
			{ value: "공지", text: "공지" },
			{ value: "잡담", text: "잡담" },
			]
		}
	}
	,methods:{
		fnList(){ 
			this.$router.push({path:'./list',query:this.body});
			
		}
		,fnAddProc() { 
			if(!this.code) { 
				alert("말머리를 선택해 주세요");
				return;
			}

			if(!this.title) { 
				alert("제목을 입력해 주세요");
				this.$refs.title.focus(); 
				return;
			}

			this.form = { 
				code: this.code,
				userId: this.userId,
				title: this.title,
				contents: this.contents,
			} 
			
			axios.post('http://localhost:3000/api/board', this.form)
			.then((res)=>{
				if(res.data.success) {
					alert('등록되었습니다.');
					this.fnList();
				} else {
					alert("실행중 실패했습니다.\n다시 이용해 주세요");
				}
			})
			.catch((err)=>{
				console.log(err);
			})
			
		}
	}	
}
</script>

<style>
    table{
        width:90%; 
        border-collapse:collapse;
        margin-top: 10%;
        margin-left:auto; 
        margin-right:auto;
    }
	.tbAdd{
        border-top:1px solid #888;
    }
	.tbAdd th, .tbAdd td{
        border-bottom:1px solid #eee; 
        padding:5px 0;
        color: black;
    }
	.tbAdd td{
        padding:10px 10px; 
        box-sizing:border-box;
    }
	.tbAdd td input{
        width:100%; 
        min-height:30px; 
        box-sizing:border-box; 
        padding:0 10px;
    }
	.tbAdd td textarea{
        width:100%; 
        min-height:300px; 
        padding:10px; 
        box-sizing:border-box;
    }
	.btnWrap{
        text-align:center; 
        margin:20px 0 0 0;
    }
	.btnWrap button{
        margin:0 10px;
    }
</style>