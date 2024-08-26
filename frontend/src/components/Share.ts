export class Share {
  private url: string;
  private title: string;
  private text: string;

  constructor(url: string, title: string, text: string) {
    this.url = url;
    this.title = title;
    this.text = text;
  }

  shareTwitter(): void {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      this.url
    )}&text=${encodeURIComponent(this.text)}`;
    window.open(twitterUrl, "_blank");
  }

  async copyLink(): Promise<boolean> {
    try{
      await navigator.clipboard.writeText(this.url);
      return true;
    } catch(err) {
      console.error("Error copying link", err)
      return false
    }
  }
}
