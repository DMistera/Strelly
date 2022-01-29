import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Link } from '@app/models';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LinksService{
  private linksSubject = new BehaviorSubject<any>([]);
  private links: any = [];

  constructor(private http: HttpClient) { }

  public addLink(type: number, fromTaskId: number, toTaskId: number){
    this.http.post<any>('/api/links', {type, fromTaskId, toTaskId}).subscribe(result => {
      const link = new Link(result);
      this.links.push(link);
      this.linksSubject.next(this.links);
      console.log(this.links);
      return link;
    });
  }

  public editLink(type: number, fromTaskId: number, toTaskId: number){
    this.http.put<any>('/api/links/'+fromTaskId, {type, fromTaskId, toTaskId}).subscribe(result => {
      const link = new Link(result);
      return link;
    });
  }

  public deleteLink(linkId: number) {
    this.http.delete<any>('/api/links/'+linkId).subscribe(result => {
      for(let t in this.links){
        this.links[t].filter((x:Link) => linkId != x.id)
      }
      this.linksSubject.next(this.links);
    })
  }

  public getLinks(taskId?: number): Observable<any> {
    if(taskId != null){
      return this.http.get<Link[]>('/api/links?taskId='+taskId).pipe(map(result => {
        // console.log(result);
        let links = result.map((c: any) => {
          return new Link(c);
        })
        // this.linksSubject.next(this.links);
        return links;
      }));
    }
    else{
      return this.http.get<Link[]>('/api/links').pipe(map(result => {
        // console.log(result);
        let links = [] as any;
        result.forEach((link: any)=>{
          links.push(new Link(link));
        })
        // this.linksSubject.next(this.links);
        return links;
      }));
    }
  }

  public getLink(linkId?: number): Observable<any> {
    return this.http.get<Link[]>('/api/links/'+linkId).pipe(map(result => {
      // console.log(result);
      // result.forEach((link: any)=>{
      //   this.links[link.column.id].push(new Link(link));
      // })
      // this.linksSubject.next(this.links);
      return new Link(result);
    }));
  }
}
