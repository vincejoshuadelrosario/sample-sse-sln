import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs";
import { SseService } from "./SseService";

@Injectable({
    providedIn: 'root'
})
export class ConversionsService {

    private readonly url: string = 'https://localhost:7076/api/conversions';

    constructor (private zone: NgZone, private sseService: SseService) {}

    toBase64Stream(input: string): Observable<string> {
        return new Observable<string>(observer => {
            const eventSource = this.sseService.getEventSource(`${this.url}/base64stream/${input}`);

            eventSource.onopen = event => {
                // DO SOMETHING
            };

            eventSource.onmessage = event => {
                this.zone.run(() => {
                    observer.next(event.data as string)
                });
            };

            eventSource.onerror = error => {
                this.zone.run(() => {
                    eventSource.close();
                    observer.complete();
                });
            };

            return () => {
                eventSource.close();
                observer.complete();
            };
        });
    }
}