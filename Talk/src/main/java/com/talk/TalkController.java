package com.talk;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.talk.beans.Question;
import com.talk.beans.Talk;
import com.talk.service.TalkService;

@RestController
public class TalkController {
	@Autowired
	TalkService service;
	
	@GetMapping("/getAll")
	public ResponseEntity<List<Talk>> getAll(){
		return new ResponseEntity<List<Talk>>(service.getAll(), HttpStatus.OK);
	}
	@GetMapping("/getTalk/{id}")
	public ResponseEntity<Talk> details (@PathVariable("id")String id) {
		Talk t = service.getTalk(id);
		
		return new ResponseEntity<Talk>(t, HttpStatus.OK);
	}
	
	@PostMapping("/updateTalk")
	public ResponseEntity<Talk> review(@RequestBody Talk t){
		t = service.saveTalk(t);
		return new ResponseEntity<Talk>(t, HttpStatus.OK);
		
	}
	@PostMapping("/newQuestion/{talk}")
	public ResponseEntity<Boolean> newQuestion(@PathVariable("talk")String talkId, @RequestBody Question q){
		
		return new ResponseEntity<Boolean>(service.newQuestion(talkId, q), HttpStatus.OK);
	}
	
	@PostMapping("/upvote/{talkId}")
	public ResponseEntity<Boolean> upVote(@PathVariable("talkId")String talkId, @RequestBody Question q){
		return new ResponseEntity<Boolean>(service.upVote(talkId, q), HttpStatus.OK);
	}
	
	@PostMapping("/delete/{talkId}")
	public ResponseEntity<Boolean> deleteQuestion(@RequestBody String s, @PathVariable("talkId") String id){
		return new ResponseEntity<Boolean>(service.deleteQuestion(id, s), HttpStatus.OK);
	}
}


